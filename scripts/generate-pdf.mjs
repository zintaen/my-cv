#!/usr/bin/env node
/**
 * generate-pdf.mjs
 *
 * Takes a full-page screenshot of the CV in headless Chrome (desktop layout)
 * and tiles it into a multi-page A4 PDF. Extracts all <a> link positions
 * from the DOM and overlays invisible clickable PDF link annotations.
 *
 * Usage:
 *   pnpm pdf            # default → ./Stephen_Cheng_CV.pdf
 *   pnpm pdf out.pdf    # custom output path
 */

import puppeteer from 'puppeteer';
import { PDFDocument, PDFName, PDFArray, PDFNumber, PDFString, PDFDict, rgb, StandardFonts } from 'pdf-lib';
import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const OUTPUT = process.argv[2] || resolve(projectRoot, 'public/Stephen_Cheng_CV.pdf');
const DEV_PORT = 3001;
const DEV_URL = `http://localhost:${DEV_PORT}`;

// A4 dimensions in points (72 dpi)
const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;

// Viewport width — user prefers 1440
const VIEWPORT_WIDTH = 1440;

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
      }
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
          try { process.kill(-server.pid, 'SIGTERM'); } catch { }
        });
      }
    };

    server.stdout.on('data', onData);
    server.stderr.on('data', onData);
    server.on('error', (err) => { if (!started) reject(err); });
    server.on('exit', (code) => {
      if (!started) reject(new Error(`Vite exited with code ${code}.\n${allOutput}`));
    });
    setTimeout(() => {
      if (!started) { server.kill('SIGTERM'); reject(new Error(`Vite timeout.\n${allOutput}`)); }
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

    // Use 2x device scale for crisp rendering
    await page.setViewport({
      width: VIEWPORT_WIDTH,
      height: 800,
      deviceScaleFactor: 2,
    });

    // Force screen media so print CSS never fires
    await page.emulateMediaType('screen');

    console.log(`📄 Navigating to ${DEV_URL}…`);
    await page.goto(DEV_URL, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for fonts + images
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 2000));

    // Hide the entire header (Resume title + DOWNLOAD PDF button)
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.display = 'none';
    });

    // Inject compact spacing for PDF (tighter than web version to fit 2 pages)
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = `
        /* PDF-only compact spacing — keeps web version untouched */

        /* Main grid: reduce vertical gap between sidebar and content rows */
        #cv-grid { gap: 1.5rem 3rem !important; }

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

        /* Credentials section */
        .space-y-8 > * + * { margin-top: 1rem !important; }

        /* Experience item internal spacing */
        .gap-6 { gap: 1rem !important; }

        /* Reduce font size slightly for bullets to save vertical space */
        ul.space-y-3 li { font-size: 13px !important; line-height: 1.45 !important; }

        /* Tighten profile section */
        .space-y-6 > * + * { margin-top: 0.75rem !important; }
      `;
      document.head.appendChild(style);
    });

    // ── Extract all link positions (CSS px) ──
    console.log('🔗 Extracting link positions…');
    const links = await page.evaluate(() => {
      const result = [];
      document.querySelectorAll('a[href]').forEach((a) => {
        const href = a.href;
        if (!href || href.startsWith('javascript:')) return;
        const rect = a.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        result.push({
          href,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        });
      });
      return result;
    });
    console.log(`   → Found ${links.length} link(s)`);

    // ── Extract structured text for ATS compatibility layer ──
    console.log('📝 Extracting structured text for ATS layer…');
    const atsText = await page.evaluate(() => {
      const lines = [];
      const aside = document.querySelector('aside');
      const main = document.querySelector('main');

      // 1. NAME & TITLE
      const h1 = aside?.querySelector('h1');
      if (h1) lines.push(h1.textContent.trim());
      const titleEl = aside?.querySelector('p');
      if (titleEl) lines.push(titleEl.textContent.trim());
      lines.push('');

      // 2. CONTACT INFO
      aside?.querySelectorAll('.space-y-3 a').forEach(a => {
        lines.push(a.textContent.trim());
      });
      lines.push('');

      // 3. PROFESSIONAL SUMMARY (now in aside, under contact info)
      const summaryP = aside?.querySelector('.space-y-3:not(.font-sans) + .space-y-3 p') 
        || aside?.querySelector('p.font-sans.text-xs');
      if (summaryP) {
        lines.push('PROFESSIONAL SUMMARY');
        lines.push(summaryP.textContent.trim());
        lines.push('');
      }

      // 4. PROFESSIONAL EXPERIENCE (logical order for ATS)
      const mainSections = main ? [...main.querySelectorAll(':scope > section')] : [];
      if (mainSections.length > 0) {
        lines.push('PROFESSIONAL EXPERIENCE');
        lines.push('');
        mainSections[0].querySelectorAll('.relative.space-y-12 > div').forEach(item => {
          const company = item.querySelector('h3');
          const role = item.querySelector('h4');
          const dateEl = item.querySelector('.font-bold.text-primary');
          const locationEl = item.querySelector('.text-on-surface-variant span');
          if (company) lines.push(company.textContent.trim());
          if (role) lines.push(role.textContent.trim());
          if (dateEl) lines.push(dateEl.textContent.trim());
          if (locationEl) lines.push(locationEl.textContent.trim());
          item.querySelectorAll('li').forEach(li => {
            lines.push('- ' + li.textContent.trim());
          });
          lines.push('');
        });
      }

      // 5. TECHNICAL SKILLS (flat comma-separated for ATS)
      lines.push('TECHNICAL SKILLS');
      aside?.querySelectorAll('.space-y-10 > div').forEach(group => {
        const groupTitle = group.querySelector('h3')?.textContent?.trim();
        const skillEls = group.querySelectorAll('.grid > div, .grid > a');
        const skillNames = [...skillEls].map(el => {
          const nameEl = el.querySelector('.font-sans.font-medium');
          return nameEl?.textContent?.trim() || '';
        }).filter(Boolean);
        if (groupTitle && skillNames.length) {
          lines.push(groupTitle + ': ' + skillNames.join(', '));
        }
      });
      lines.push('');

      // 6. EDUCATION & CERTIFICATIONS
      if (mainSections.length > 1) {
        const credSection = mainSections[1];
        lines.push('EDUCATION');
        credSection.querySelectorAll('.flex.gap-4 h3, .flex.gap-4 p').forEach(el => {
          lines.push(el.textContent.trim());
        });
        lines.push('');
        lines.push('CERTIFICATIONS');
        credSection.querySelectorAll('.grid a').forEach(cert => {
          const title = cert.querySelector('.font-sans.text-sm');
          const issuer = cert.querySelector('.font-mono');
          if (title) lines.push(title.textContent.trim() + (issuer ? ' - ' + issuer.textContent.trim() : ''));
        });
      }

      return lines.join('\n');
    });
    console.log(`   → Extracted ${atsText.split('\n').length} lines of ATS text`);

    // ── Screenshot ──
    console.log('📸 Taking full-page screenshot…');
    const screenshotBuffer = await page.screenshot({
      fullPage: true,
      type: 'png',
      encoding: 'binary',
    });

    await browser.close();

    // ── Build multi-page A4 PDF ──
    console.log('🖨️  Building PDF from screenshot…');

    const pdfDoc = await PDFDocument.create();
    const pngImage = await pdfDoc.embedPng(screenshotBuffer);
    const imgWidth = pngImage.width;
    const imgHeight = pngImage.height;

    // Scale: CSS px → PDF points
    // getBoundingClientRect returns CSS px; screenshot = VIEWPORT_WIDTH * DPR pixels
    const cssToPt = A4_WIDTH_PT / VIEWPORT_WIDTH;

    // Image scale: image pixels → PDF points
    const imgScale = A4_WIDTH_PT / imgWidth;
    const scaledHeight = imgHeight * imgScale;

    const totalPages = Math.ceil(scaledHeight / A4_HEIGHT_PT);
    console.log(`   → ${totalPages} page(s) at ${imgWidth}×${imgHeight}px`);

    // Surface background color: #131313
    const bgColor = rgb(0x13 / 255, 0x13 / 255, 0x13 / 255);

    // ── Prepare ATS text layer ──
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const ATS_FONT_SIZE = 7;
    const ATS_LINE_HEIGHT = ATS_FONT_SIZE * 1.4;
    const ATS_MARGIN = 10;
    const ATS_MAX_WIDTH = A4_WIDTH_PT - 2 * ATS_MARGIN;

    // Sanitize text for WinAnsi encoding (Helvetica only supports Latin-1)
    function sanitizeForPdf(text) {
      return text
        .replace(/[\u2013\u2014\u2212]/g, '-')  // en/em dash, minus
        .replace(/[\u2018\u2019\u02BC]/g, "'")  // smart single quotes
        .replace(/[\u201C\u201D]/g, '"')         // smart double quotes
        .replace(/[\u2022\u2023\u25E6]/g, '-')   // bullets
        .replace(/[\u2026]/g, '...')              // ellipsis
        .replace(/[^\x20-\x7E\xA0-\xFF]/g, ''); // strip remaining non-Latin1
    }

    // Wrap long lines to fit within max width
    function wrapLine(text, font, fontSize, maxWidth) {
      const sanitized = sanitizeForPdf(text);
      if (!sanitized.trim()) return [''];
      const words = sanitized.split(' ');
      const wrapped = [];
      let current = '';
      for (const word of words) {
        const test = current ? current + ' ' + word : word;
        try {
          if (font.widthOfTextAtSize(test, fontSize) > maxWidth && current) {
            wrapped.push(current);
            current = word;
          } else {
            current = test;
          }
        } catch {
          current = test; // skip width check for problematic chars
        }
      }
      if (current) wrapped.push(current);
      return wrapped;
    }

    // Pre-process all ATS text into wrapped lines
    const rawLines = atsText.split('\n');
    const wrappedLines = [];
    for (const line of rawLines) {
      wrappedLines.push(...wrapLine(line, helvetica, ATS_FONT_SIZE, ATS_MAX_WIDTH));
    }
    const maxLinesPerPage = Math.floor((A4_HEIGHT_PT - 2 * ATS_MARGIN) / ATS_LINE_HEIGHT);
    console.log(`   → ${wrappedLines.length} ATS text lines prepared (${maxLinesPerPage}/page capacity)`);

    // Create pages with: 1) background → 2) ATS text layer → 3) image on top
    const pdfPages = [];
    for (let i = 0; i < totalPages; i++) {
      const pdfPage = pdfDoc.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);

      // 1. Fill entire page with dark background
      pdfPage.drawRectangle({
        x: 0,
        y: 0,
        width: A4_WIDTH_PT,
        height: A4_HEIGHT_PT,
        color: bgColor,
      });

      // 2. Draw ATS text layer (same color as background = invisible to humans)
      //    ATS parsers read text from the PDF content stream regardless of visibility
      const lineStart = i * maxLinesPerPage;
      const lineEnd = Math.min(lineStart + maxLinesPerPage, wrappedLines.length);
      for (let j = lineStart; j < lineEnd; j++) {
        const line = wrappedLines[j];
        if (!line || !line.trim()) continue;
        const y = A4_HEIGHT_PT - ATS_MARGIN - ((j - lineStart) * ATS_LINE_HEIGHT);
        try {
          pdfPage.drawText(line, {
            x: ATS_MARGIN,
            y,
            size: ATS_FONT_SIZE,
            font: helvetica,
            color: bgColor, // Same as background — invisible but parseable
          });
        } catch {
          // Skip lines with encoding issues
        }
      }

      // 3. Draw screenshot image on top (covers the text visually)
      const yOffset = A4_HEIGHT_PT - scaledHeight + (i * A4_HEIGHT_PT);
      pdfPage.drawImage(pngImage, {
        x: 0,
        y: yOffset,
        width: A4_WIDTH_PT,
        height: scaledHeight,
      });
      pdfPages.push(pdfPage);
    }

    // ── Overlay link annotations ──
    console.log('🔗 Adding clickable link annotations…');
    let linkCount = 0;

    for (const link of links) {
      // Convert CSS coordinates to PDF coordinates
      const linkTopPt = link.y * cssToPt;     // distance from top of the entire page in pt
      const linkBottomPt = (link.y + link.height) * cssToPt;
      const linkLeftPt = link.x * cssToPt;
      const linkRightPt = (link.x + link.width) * cssToPt;

      // Determine which page(s) this link falls on
      const pageStart = Math.floor(linkTopPt / A4_HEIGHT_PT);
      const pageEnd = Math.floor(linkBottomPt / A4_HEIGHT_PT);

      for (let pi = pageStart; pi <= pageEnd && pi < totalPages; pi++) {
        const pdfPage = pdfPages[pi];
        const pageTopPt = pi * A4_HEIGHT_PT;

        // Clip link rect to this page
        const clippedTop = Math.max(linkTopPt, pageTopPt);
        const clippedBottom = Math.min(linkBottomPt, pageTopPt + A4_HEIGHT_PT);

        // Convert to PDF coordinate system (origin = bottom-left)
        const y1 = A4_HEIGHT_PT - (clippedBottom - pageTopPt); // bottom of link rect
        const y2 = A4_HEIGHT_PT - (clippedTop - pageTopPt);    // top of link rect
        const x1 = linkLeftPt;
        const x2 = linkRightPt;

        // Create a URI link annotation
        const linkAnnotation = pdfDoc.context.obj({
          Type: 'Annot',
          Subtype: 'Link',
          Rect: [x1, y1, x2, y2],
          Border: [0, 0, 0],
          A: {
            Type: 'Action',
            S: 'URI',
            URI: PDFString.of(link.href),
          },
        });

        // Add to page's Annots array
        const existingAnnots = pdfPage.node.get(PDFName.of('Annots'));
        if (existingAnnots instanceof PDFArray) {
          existingAnnots.push(pdfDoc.context.register(linkAnnotation));
        } else {
          pdfPage.node.set(
            PDFName.of('Annots'),
            pdfDoc.context.obj([pdfDoc.context.register(linkAnnotation)])
          );
        }
        linkCount++;
      }
    }
    console.log(`   → Added ${linkCount} link annotation(s)`);

    const pdfBytes = await pdfDoc.save();
    await writeFile(OUTPUT, pdfBytes);

    console.log(`✅ PDF saved → ${OUTPUT}`);
  } finally {
    stopServer();
  }
}

generatePdf().catch((err) => {
  console.error('❌ PDF generation failed:', err);
  process.exit(1);
});
