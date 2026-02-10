import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
    plugins: [
        vue(),
        federation({
            name: 'remote1',
            filename: 'remoteEntry.js',
            exposes: {
                './RemoteRoot': './src/RemoteRoot.vue',
            },
            shared: ['vue'],
        }),
    ],
    build: {
        target: 'esnext',
        minify: false,
    },
})
