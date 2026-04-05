#!/usr/bin/env node
/**
 * generate-pdf.mjs
 *
 * Generates a native PDF from the CV using headless Chrome's print engine.
 * All text is genuine vector text — fully selectable, copyable, and 100% ATS-compatible.
 * Links are preserved automatically by Chrome.
 *
 * The web layout (1440px) is scaled to fit A4 via CSS zoom,
 * reproducing the exact same proportions as the original screenshot approach.
 *
 * Usage:
 *   pnpm pdf            # default → ./public/Stephen_Cheng_CV.pdf
 *   pnpm pdf out.pdf    # custom output path
 */

import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const OUTPUT = process.argv[2] || resolve(projectRoot, 'public/Stephen_Cheng_CV.pdf');
const DEV_PORT = 3001;
const DEV_URL = `http://localhost:${DEV_PORT}`;

// ── Layout Constants ─────────────────────────────────────────────────────
// Match the original web design viewport
const VIEWPORT_WIDTH = 1440;

// A4 width in CSS px at 96dpi: 595.28pt × (96/72) ≈ 793.7px
// Zoom to fit 1440px content into 793.7px paper width
// This makes Chrome lay out content at 793.7/0.551 ≈ 1440px effective width
const A4_CSS_WIDTH = 793.7;
const PDF_ZOOM = A4_CSS_WIDTH / VIEWPORT_WIDTH; // ≈ 0.551

/**
 * Start the Vite dev server in the background.
 */
function startDevServer() {
    return new Promise((resolvePromise, reject) => {
        const server = spawn(
            'sh',
            ['-c', `npx vite --port ${DEV_PORT}`],
            {
                cwd: projectRoot,
                stdio: ['ignore', 'pipe', 'pipe'],
                env: { ...process.env, FORCE_COLOR: '0' },
            },
        );

        let started = false;
        let allOutput = '';

        const onData = (chunk) => {
            const text = chunk.toString();
            allOutput += text;
            if (!started && (text.includes('ready in') || text.includes('Local:'))) {
                started = true;
                resolvePromise(() => {
                    server.kill('SIGTERM');
                    try {
                        process.kill(-server.pid, 'SIGTERM');
                    }
                    catch {
                        // ignore
                    }
                });
            }
        };

        server.stdout.on('data', onData);
        server.stderr.on('data', onData);
        server.on('error', (err) => {
            if (!started)
                reject(err);
        });
        server.on('exit', (code) => {
            if (!started)
                reject(new Error(`Vite exited with code ${code}.\n${allOutput}`));
        });
        setTimeout(() => {
            if (!started) {
                server.kill('SIGTERM');
                reject(new Error(`Vite timeout.\n${allOutput}`));
            }
        }, 30000);
    });
}

async function generatePdf() {
    console.log('🚀 Starting Vite dev server…');
    const stopServer = await startDevServer();

    try {
        console.log('🌐 Launching headless Chrome…');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        // Match original viewport for initial page load
        await page.setViewport({
            width: VIEWPORT_WIDTH,
            height: 800,
            deviceScaleFactor: 2, // High DPI for crisp image assets
        });

        // Use screen media so all screen CSS applies (not print CSS)
        await page.emulateMediaType('screen');

        console.log(`📄 Navigating to ${DEV_URL}…`);
        await page.goto(DEV_URL, { waitUntil: 'networkidle0', timeout: 30000 });

        // Wait for fonts + images
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 2000));

        // Hide the header (Resume title + DOWNLOAD PDF button)
        // Can't rely on print:hidden since we emulate screen media
        await page.evaluate(() => {
            const header = document.querySelector('header');
            if (header)
                header.style.display = 'none';
        });

        // ── Inject PDF-specific CSS ──
        // Chrome's print engine resolves media queries against paper width BEFORE
        // applying CSS zoom, so lg:/md: breakpoints won't fire on A4 (~794px).
        // We must force all responsive layouts (grid columns, flex directions,
        // text sizes, widths) explicitly.
        console.log(`📐 Injecting PDF layout CSS (zoom: ${PDF_ZOOM.toFixed(4)})…`);
        await page.evaluate((zoom) => {
            const style = document.createElement('style');
            style.textContent = `
        /* ── Scale entire page to fit A4 ────────────────────────────── */
        body {
          zoom: ${zoom} !important;
        }

        /* ── Disable all transitions/animations ────────────────────── */
        * {
          transition: none !important;
          animation: none !important;
          transform: none !important;
        }

        /* ── Container padding ─────────────────────────────────────── */
        /* Restore root padding missing from the PDF since Tailwind's lg:p-8
           wasn't triggering. We target the min-h-screen wrapper. */
        #root > div.min-h-screen {
          padding: 2.5rem !important;
        }
        
        #root > div.min-h-screen > div.max-w-7xl {
          max-width: 100% !important;
        }

        /* ── Force Two-Column Layout (Overrides mobile defaults) ───── */

        /* Main Grid */
        #cv-grid {
          display: grid !important;
          grid-template-columns: 1fr 2.2fr !important;
          gap: 1.5rem 3rem !important;
        }

        /* Sidebar Profile */
        aside > div:first-child > div.flex {
          align-items: center !important;
        }
        /* Avatar size (md:w-28 md:h-28) */
        aside > div:first-child > div.flex > div.relative {
          width: 7rem !important;
          height: 7rem !important;
        }
        /* Profile name (md:text-3xl) */
        aside > div:first-child > div.flex h1 {
          font-size: 1.875rem !important;
          line-height: 2.25rem !important;
        }

        /* ── Experience Items (Force Row Layout) ────────────────────── */
        .relative.space-y-12 > div {
          display: flex !important;
          flex-direction: row !important;
          gap: 1.5rem !important;
        }

        /* Left Column (Date & Location) */
        .relative.space-y-12 > div > div:nth-child(1) {
          width: 25% !important;
          text-align: right !important;
          flex-shrink: 0 !important;
        }
        /* Location align right inside Left Column */
        .relative.space-y-12 > div > div:nth-child(1) > div.flex {
          justify-content: flex-end !important;
        }

        /* Timeline Divider (show it) */
        .relative.space-y-12 > div > div:nth-child(2) {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          width: 1.5rem !important;
          flex-shrink: 0 !important;
          position: relative !important;
        }

        /* Right Column (Company, Role, Bullets) */
        .relative.space-y-12 > div > div:nth-child(3) {
          width: calc(75% - 3rem) !important;
          padding-left: 0.5rem !important;
        }

        /* Header layout (force row if it was collapsed) */
        header {
          flex-direction: row !important;
          align-items: center !important;
        }

        /* ── PDF-only compact spacing (same as original script) ─────── */

        /* Main content: tighten space between major sections */
        main.space-y-16 > * + * { margin-top: 2rem !important; }

        /* Experience timeline: tighter gaps between roles */
        .relative.space-y-12 > * + * { margin-top: 1.5rem !important; }

        /* Section headers: less bottom margin */
        .border-b.pb-4.mb-8 { margin-bottom: 1rem !important; padding-bottom: 0.5rem !important; }
        .border-b.pb-4.mb-6 { margin-bottom: 0.75rem !important; padding-bottom: 0.25rem !important; }

        /* Sidebar sections: tighter vertical rhythm */
        aside.space-y-12 > * + * { margin-top: 1.5rem !important; }

        /* Skill groups: reduce gap between categories */
        .space-y-10 > * + * { margin-top: 1.25rem !important; }

        /* Skill grid: tighter card spacing */
        .grid.gap-2 { gap: 0.35rem !important; }

        /* Experience bullet lists */
        .space-y-3 > * + * { margin-top: 0.35rem !important; }
        .space-y-4 > * + * { margin-top: 0.35rem !important; }

        /* Credentials section */
        .space-y-8 > * + * { margin-top: 1rem !important; }

        /* Experience item internal spacing */
        /* Handle gap-6 in normal rendering vs the manual 1.5rem gap we set above */

        /* Reduce font size slightly for bullets to save vertical space */
        ul.space-y-3 li, ul.space-y-4 li, .space-y-4 li {
          font-size: 13px !important;
          line-height: 1.45 !important;
        }

        /* Tighten profile section */
        .space-y-6 > * + * { margin-top: 0.75rem !important; }

        /* ── Page break control ────────────────────────────────────── */
        /* Don't break inside experience items */
        .relative.space-y-12 > div {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        /* Don't break inside credential blocks */
        section .space-y-8 > div {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        /* Don't break inside skill groups */
        aside .space-y-10 > div {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      `;
            document.head.appendChild(style);
        }, PDF_ZOOM);

        // ── Generate Native PDF ──
        console.log('🖨️  Generating PDF via native Chrome print engine…');
        await page.pdf({
            path: OUTPUT,
            format: 'A4',
            printBackground: true, // Preserve dark theme backgrounds
            preferCSSPageSize: false, // Force A4 regardless of CSS @page
            margin: {
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
            },
        });

        await browser.close();
        console.log(`✅ PDF saved → ${OUTPUT}`);
    }
    finally {
        stopServer();
    }
}

generatePdf().catch((err) => {
    console.error('❌ PDF generation failed:', err);
    process.exit(1);
});
