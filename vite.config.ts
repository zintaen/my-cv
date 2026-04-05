import { loadEnvFile } from '@cyberskill/shared/config/env';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import { getEnv } from './src/shared/env/env.util.js';

export default defineConfig(() => {
    loadEnvFile();
    const env = getEnv();

    return {
        base: '/my-cv/',
        plugins: [react(), tailwindcss(), tsconfigPaths(), svgr()],
        server: {
            host: '0.0.0.0',
            port: Number(env.VITE_PORT),
        },
    };
});
