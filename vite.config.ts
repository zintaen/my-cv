import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

/**
 * Vite config — lean, no env-file gymnastics.
 * `base: './'` so the built index.html references assets by relative path,
 * which lets Puppeteer load from `dist/` over `file://` OR over http://.
 */
export default defineConfig({
    base: './',
    plugins: [react(), tailwindcss(), svgr()],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        host: '127.0.0.1',
        port: 3000,
        strictPort: false,
    },
    build: {
        target: 'es2022',
        outDir: 'dist',
        assetsInlineLimit: 0, // never inline — keeps PDF asset URLs stable
        cssCodeSplit: false,
        sourcemap: false,
    },
});
