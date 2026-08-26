import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 5173,
        strictPort: true,
        // Hosts servidos a través del túnel cloudflared.
        allowedHosts: [
            'dev-project-front.bakano.ec',
            '.trycloudflare.com',
            'testing-storybrand-frontend.bakano.ec',
        ],
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/index.scss" as *;`,
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        target: 'esnext',
    },
});
