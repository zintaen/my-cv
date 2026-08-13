#!/usr/bin/env node
/**
 * build-pdf.mjs
 * =============================================================================
 *   Stephen Cheng — CV → native A4 tagged PDF
 * =============================================================================
 *
 *  Design goals
 *  ------------
 *  1. ATS-first.   The text in the PDF is REAL text (not rasterized), emitted
 *                   at native A4 dimensions, with proper reading order that
 *                   parsers like Workday, Greenhouse, Lever, LinkedIn and
 *                   Jobscan/Enhancv recognize.
 *  2. Pixel visual parity with the previous "zoom 0.551" build — the layout,
 *     colors, fonts and component spacing are preserved.
 *  3. Tagged PDF.  Puppeteer's `tagged: true` option asks Chrome to emit a
 *                   PDF with a StructTreeRoot so assistive tech / ATS parsers
 *                   can traverse the document semantically.
 *  4. Metadata.    Title / Author / Keywords / Subject are embedded via
 *                  pdf-lib so résumé graders see clean document-level info.
 *
 *  How it works
 *  ------------
 *  (a)  Start Vite on port $PDF_PORT (default 4173) serving the production
 *       build if present, else the dev server.
 *  (b)  Launch headless Chrome at viewport 794 × 1123 (A4 @ 96 dpi).
 *  (c)  Add `pdf` class to <html> so our PDF-specific CSS kicks in (hides
 *       the web download button, disables animations, avoid-break hints).
 *  (d)  Inject a tiny PDF-layout stylesheet that forces the lg: breakpoints
 *       (two-column grid) that otherwise wouldn't trigger at 794px wide.
 *  (e)  Generate the PDF via `page.pdf({ tagged: true, format: 'A4', ... })`.
 *  (f)  Post-process with pdf-lib: set info dictionary + Language metadata.
 *
 *  Usage
 *  -----
 *    pnpm pdf                  → writes ./dist/Stephen_Cheng_CV.pdf
 *    pnpm pdf ./out/cv.pdf     → custom output path
 */

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import { dirname, extname, isAbsolute, join, relative, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { PDFDocument } from 'pdf-lib';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const OUTPUT = resolve(
    ROOT,
    process.argv[2] || 'dist/Stephen_Cheng_CV.pdf',
);
const PORT = Number(process.env.PDF_PORT || 4173);
const URL = `http://127.0.0.1:${PORT}/`;
/** Hard ceiling so CI never hangs the deploy job. */
const OVERALL_TIMEOUT_MS = Number(process.env.PDF_TIMEOUT_MS || 90_000);

// A4 @ 96dpi: 595.28pt × 841.89pt → 793.7px × 1122.5px
const PAGE_W = 794;
const PAGE_H = 1123;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.json': 'application/json',
};

// ─────────────────────────────────────────────────────────────────────────────
//  Local static server (preferred) or Vite fallback
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Serve a production `dist/` tree with Node's http module — no Vite subprocess,
 * no ANSI ready-line parsing, instant listen callback.
 */
function startStaticServer(distDir) {
    return new Promise((resolveStart, reject) => {
        console.log(`🚀 Serving static ${distDir} on :${PORT}…`);
        const server = http.createServer((req, res) => {
            try {
                const raw = decodeURIComponent((req.url || '/').split('?')[0]);
                let rel = raw === '/' ? '/index.html' : raw;
                // Prevent path traversal
                const filePath = resolve(distDir, `.${rel}`);
                const relativePath = relative(distDir, filePath);
                if (relativePath.startsWith('..') || isAbsolute(relativePath)) {
                    res.writeHead(403).end('Forbidden');
                    return;
                }
                let target = filePath;
                if (!fs.existsSync(target) || fs.statSync(target).isDirectory()) {
                    const asIndex = join(filePath, 'index.html');
                    if (fs.existsSync(asIndex)) target = asIndex;
                    else if (!fs.existsSync(target)) {
                        res.writeHead(404).end('Not found');
                        return;
                    }
                }
                const type = MIME[extname(target).toLowerCase()] || 'application/octet-stream';
                res.writeHead(200, { 'Content-Type': type });
                fs.createReadStream(target).pipe(res);
            } catch (err) {
                res.writeHead(500).end(String(err));
            }
        });
        server.once('error', reject);
        server.listen(PORT, '127.0.0.1', () => {
            resolveStart(() =>
                new Promise((r) => server.close(() => r())),
            );
        });
    });
}

function startVite() {
    return new Promise((resolveStart, reject) => {
        const hasBuild = fs.existsSync(resolve(ROOT, 'dist/index.html'));
        const cmd = hasBuild ? 'preview' : 'dev';
        console.log(`🚀 Starting Vite (${cmd}) on :${PORT}…`);

        const proc = spawn(
            process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
            ['exec', 'vite', cmd, '--port', String(PORT), '--host', '127.0.0.1', '--strictPort'],
            { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] },
        );

        let started = false;
        let log = '';

        const maybeResolve = (chunk) => {
            const text = chunk.toString();
            log += text;
            // Vite 8 colors "Local" and ":" separately (ANSI codes between them).
            if (
                !started &&
                /(Local|ready in|localhost:|127\.0\.0\.1:\d+)/i.test(text)
            ) {
                started = true;
                setTimeout(() => resolveStart(() => {
                    proc.kill('SIGTERM');
                }), 350);
            }
        };

        proc.stdout.on('data', maybeResolve);
        proc.stderr.on('data', maybeResolve);
        proc.on('error', (e) => !started && reject(e));
        proc.on('exit', (code) => {
            if (!started) reject(new Error(`Vite exited with code ${code}\n${log}`));
        });

        setTimeout(() => {
            if (!started) {
                proc.kill('SIGTERM');
                reject(new Error(`Vite start timeout after 20s\n${log}`));
            }
        }, 20_000);
    });
}

async function startServer() {
    const distDir = resolve(ROOT, 'dist');
    if (fs.existsSync(resolve(distDir, 'index.html'))) {
        return startStaticServer(distDir);
    }
    return startVite();
}

// ─────────────────────────────────────────────────────────────────────────────
//  PDF-only CSS (applied via addStyleTag)
// ─────────────────────────────────────────────────────────────────────────────

const PDF_STYLE = `
    /* ──────────────────────────────────────────────────────────────
     *  AGGRESSIVE 2-PAGE TIGHTENING
     *  Strategy: reduce font sizes, tighten leading, crunch spacing.
     *  NOT using CSS zoom (that's what broke ATS last time).
     *  Semantic HTML structure is untouched → parsers still read it.
     * ────────────────────────────────────────────────────────────── */

    /* Global base — drop page rhythm to ~83% without zoom. */
    html, body { font-size: 12px !important; }

    /* Force lg: two-column grid at A4 width. */
    #cv-grid {
        display: grid !important;
        grid-template-columns: 0.85fr 2fr !important;
        gap: 0.75rem 1.25rem !important;
    }

    /* Reduce outer padding from 2rem → 0.9rem. */
    #cv-root > div {
        max-width: 100% !important;
        padding: 0.9rem 1.1rem !important;
    }

    /* Sidebar avatar: smaller. */
    aside header .relative.rounded-full {
        width: 4.8rem !important;
        height: 4.8rem !important;
    }

    /* Name + role text tighter. */
    aside header h1 {
        font-size: 1.35rem !important;
        line-height: 1.55rem !important;
    }
    aside header p { font-size: 0.7rem !important; letter-spacing: 0.1em !important; }

    /* Experience layout: md:flex-row doesn't trigger at 794px — force it. */
    section > div > article {
        flex-direction: row !important;
        gap: 0.6rem !important;
    }
    section > div > article > div:first-child {
        width: 20% !important;
        text-align: right !important;
        flex-shrink: 0 !important;
    }
    section > div > article > div:first-child > div.flex {
        justify-content: flex-end !important;
    }
    section > div > article > div[aria-hidden='true'] {
        display: flex !important;
    }
    section > div > article > div:last-child {
        width: calc(80% - 0.6rem) !important;
        padding-left: 0.25rem !important;
    }

    /* Section-level spacing: crunch hard. */
    main.space-y-16 > * + * { margin-top: 0.9rem !important; }
    section > div.space-y-12 > * + * { margin-top: 0.7rem !important; }
    aside.space-y-12 > * + * { margin-top: 0.6rem !important; }
    .border-b.pb-4.mb-8 { margin-bottom: 0.5rem !important; padding-bottom: 0.3rem !important; }

    /* Section headings smaller. */
    section h2.font-serif,
    h2 span.font-serif { font-size: 1.55rem !important; line-height: 1.1 !important; }
    section h2.font-mono { font-size: 0.65rem !important; }

    /* Skill grids — this section was massive. Squash. */
    section[aria-label^='Skills:'] ul.grid,
    aside section ul.grid { gap: 0.2rem !important; }
    aside section h3 { font-size: 0.6rem !important; margin-bottom: 0.3rem !important; letter-spacing: 0.12em !important; }
    aside section > section + section,
    section[aria-label='Technical Skills'] > section + section { margin-top: 0.5rem !important; }

    /* Skill card internals — the biggest space waster. */
    aside section ul.grid li { padding: 0.25rem !important; min-height: auto !important; }
    aside section ul.grid li > a,
    aside section ul.grid li > div { padding: 0.15rem !important; gap: 0.2rem !important; }
    aside section ul.grid li svg,
    aside section ul.grid li img { width: 0.9rem !important; height: 0.9rem !important; }
    aside section ul.grid li .font-sans,
    aside section ul.grid li [class*='text-'] { font-size: 0.58rem !important; line-height: 1.1 !important; }

    /* Experience bullets: aggressive density. */
    article ul.space-y-3 > * + * { margin-top: 0.15rem !important; }
    article ul li { font-size: 10.5px !important; line-height: 1.28 !important; margin-bottom: 0 !important; }
    article h3 { font-size: 0.95rem !important; line-height: 1.2 !important; }
    article .font-mono,
    article time { font-size: 0.7rem !important; line-height: 1.1 !important; }

    /* Profile + contact + summary tighter. */
    aside > header.space-y-6 > * + * { margin-top: 0.4rem !important; }
    aside address.space-y-3 > * + * { margin-top: 0.2rem !important; }
    aside address a, aside address span { font-size: 0.72rem !important; }
    aside address svg { width: 0.85rem !important; height: 0.85rem !important; }

    /* Professional summary: compact body paragraph. */
    aside p.text-sm, aside [class*='text-on-surface-variant'] {
        font-size: 0.72rem !important; line-height: 1.35 !important;
    }
    aside h3.font-mono { font-size: 0.6rem !important; margin-bottom: 0.35rem !important; }

    /* Credentials compact — 3-column cert grid to fit on page 2. */
    #credentials-heading + p,
    section[aria-labelledby='credentials-heading'] .mb-8 { margin-bottom: 0.5rem !important; }
    section[aria-labelledby='certs-heading'] ul.grid {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 0.25rem 0.5rem !important;
    }
    section[aria-labelledby='certs-heading'] li a { padding: 0.15rem !important; gap: 0.3rem !important; }
    section[aria-labelledby='certs-heading'] li img { width: 1.4rem !important; height: 1.4rem !important; }
    section[aria-labelledby='certs-heading'] li .text-sm { font-size: 0.65rem !important; line-height: 1.15 !important; }
    section[aria-labelledby='certs-heading'] li .text-\\[10px\\] { font-size: 0.5rem !important; letter-spacing: 0.08em !important; margin-top: 0.1rem !important; }

    /* Academic row compact. */
    section[aria-labelledby='education-heading'] { margin-bottom: 0.5rem !important; }
    section[aria-labelledby='education-heading'] .w-12 { width: 2rem !important; height: 2rem !important; }
    section[aria-labelledby='education-heading'] p.text-lg { font-size: 0.85rem !important; line-height: 1.1 !important; }
    section[aria-labelledby='education-heading'] p.text-sm { font-size: 0.7rem !important; line-height: 1.25 !important; margin-top: 0.05rem !important; }

    /* Keep articles together — avoid an experience splitting across pages. */
    article { break-inside: avoid !important; page-break-inside: avoid !important; }
    section[aria-labelledby='credentials-heading'] { break-inside: avoid-page !important; }

    /* Hide visual scrollbars if any */
    ::-webkit-scrollbar { display: none !important; }
`;

// ─────────────────────────────────────────────────────────────────────────────
//  Puppeteer run
// ─────────────────────────────────────────────────────────────────────────────

async function renderPdf() {
    const stopServer = await startServer();
    let browser;

    try {
        console.log('🌐 Launching headless Chrome…');

        // Prefer Puppeteer's own Chrome (installed via `puppeteer browsers install
        // chrome` in CI). System `/usr/bin/chromium` often exists on runners but
        // fails to expose a WS endpoint without matching packages.
        let execPath = process.env.PUPPETEER_EXECUTABLE_PATH;
        if (!execPath) {
            try {
                const bundled = puppeteer.executablePath();
                if (bundled && fs.existsSync(bundled)) execPath = bundled;
            } catch {
                // ignore — fall through to system paths
            }
        }
        if (!execPath) {
            const fallbackChromes = [
                '/usr/bin/google-chrome',
                '/usr/bin/google-chrome-stable',
                '/usr/bin/chromium',
                '/usr/bin/chromium-browser',
                '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                '/Applications/Chromium.app/Contents/MacOS/Chromium',
            ];
            execPath = fallbackChromes.find((p) => fs.existsSync(p));
        }
        if (execPath) console.log(`   using chromium at ${execPath}`);

        const launchOpts = {
            headless: true,
            protocolTimeout: 60_000,
            timeout: 30_000,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--font-render-hinting=medium',
                '--disable-gpu',
                '--single-process',
                '--no-zygote',
            ],
        };
        if (execPath) launchOpts.executablePath = execPath;
        try {
            browser = await puppeteer.launch(launchOpts);
        } catch (err) {
            const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
            if (process.platform !== 'darwin' || execPath === macChrome || !fs.existsSync(macChrome)) {
                throw err;
            }
            console.warn('Bundled Chrome could not launch; retrying with installed Google Chrome.');
            browser = await puppeteer.launch({ ...launchOpts, executablePath: macChrome });
        }

        const page = await browser.newPage();

        await page.setViewport({
            width: PAGE_W,
            height: PAGE_H,
            deviceScaleFactor: 2,
        });

        await page.emulateMediaType('screen');

        console.log(`📄 Navigating to ${URL}…`);

        // networkidle0 can hang forever on CI if any long-poll/keepalive stays open.
        await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
        await page.waitForSelector('#cv-root', { timeout: 15_000 });

        // Tag <html> so our `html.pdf` CSS applies.
        await page.evaluate(() => document.documentElement.classList.add('pdf'));

        // Inject layout overrides that simulate the `lg:` breakpoints.
        await page.addStyleTag({ content: PDF_STYLE });

        // Wait for fonts (capped) and any remote images (capped).
        await Promise.race([
            page.evaluate(async () => {
                await document.fonts.ready;
                const imgs = Array.from(document.images).filter((i) => !i.complete);
                await Promise.all(
                    imgs.map(
                        (img) =>
                            new Promise((r) => {
                                img.addEventListener('load', () => r(null), { once: true });
                                img.addEventListener('error', () => r(null), { once: true });
                            }),
                    ),
                );
            }),
            new Promise((r) => setTimeout(r, 5_000)),
        ]);

        // Small settle — layout reflow after CSS injection + fonts.
        await new Promise((r) => setTimeout(r, 500));

        // Verify the page actually rendered content.
        const bodyLen = await page.evaluate(() => document.body?.innerText?.length || 0);
        if (bodyLen < 100) {
            throw new Error(`Page appears blank (only ${bodyLen} chars). Check server output.`);
        }

        console.log('🖨️  Emitting tagged A4 PDF…');
        const tmpPath = resolve(ROOT, '.tmp-cv.pdf');
        await page.pdf({
            path: tmpPath,
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: false,
            tagged: true,                   // StructTreeRoot → ATS reading order
            outline: false,
            timeout: 30_000,
            margin: { top: '0', bottom: '0', left: '0', right: '0' },
        });
        const buffer = fs.readFileSync(tmpPath);
        fs.unlinkSync(tmpPath);
        console.log(`📦 Raw PDF buffer: ${Math.round(buffer.length / 1024)} KB`);

        await browser.close();
        browser = undefined;

        // ─── Post-process: embed ATS-relevant metadata ───────────────────
        console.log('🔧 Embedding metadata via pdf-lib…');
        const pdfDoc = await PDFDocument.load(buffer);
        pdfDoc.setTitle('Stephen Cheng — Senior Dynamics 365 Business Central & AL Developer');
        pdfDoc.setAuthor('Stephen Cheng');
        pdfDoc.setSubject(
            'Curriculum Vitae — 10+ years building enterprise ERP systems, specializing in Dynamics 365 Business Central, AL programming, and Microsoft Power Platform integrations.',
        );
        pdfDoc.setKeywords([
            'Senior Dynamics 365 Business Central Developer',
            'AL Language',
            'Dynamics NAV',
            'C/AL',
            'Microsoft Power Platform',
            'Azure Cloud',
            'OData',
            'REST APIs',
            'ERP Implementation',
            'SQL Server',
            'TypeScript',
            'System Architecture',
        ]);
        pdfDoc.setProducer('build-pdf.mjs (puppeteer + pdf-lib)');
        pdfDoc.setCreator('Stephen Cheng CV Pipeline v2');
        pdfDoc.setLanguage('en-US');

        const out = await pdfDoc.save({ useObjectStreams: true });
        fs.mkdirSync(dirname(OUTPUT), { recursive: true });
        fs.writeFileSync(OUTPUT, out);

        const sizeKb = Math.round(out.length / 1024);
        console.log(`✅ PDF ready → ${OUTPUT} (${sizeKb} KB)`);
    } finally {
        if (browser) {
            try {
                await browser.close();
            } catch {
                // ignore close races
            }
        }
        await stopServer();
    }
}

function withTimeout(promise, ms, label) {
    return new Promise((resolve, reject) => {
        const t = setTimeout(
            () => reject(new Error(`${label} timed out after ${ms}ms`)),
            ms,
        );
        promise.then(
            (v) => {
                clearTimeout(t);
                resolve(v);
            },
            (e) => {
                clearTimeout(t);
                reject(e);
            },
        );
    });
}

withTimeout(renderPdf(), OVERALL_TIMEOUT_MS, 'PDF pipeline')
    .catch((err) => {
        console.error('❌ PDF generation failed:');
        console.error(err);
        process.exit(1);
    });
