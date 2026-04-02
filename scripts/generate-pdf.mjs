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
import { PDFDocument, PDFName, PDFArray, PDFNumber, PDFString, PDFDict, rgb } from 'pdf-lib';
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

    // Create pages and draw image slices
    const pdfPages = [];
    for (let i = 0; i < totalPages; i++) {
      const pdfPage = pdfDoc.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);

      // Fill entire page with dark background first
      pdfPage.drawRectangle({
        x: 0,
        y: 0,
        width: A4_WIDTH_PT,
        height: A4_HEIGHT_PT,
        color: bgColor,
      });

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
