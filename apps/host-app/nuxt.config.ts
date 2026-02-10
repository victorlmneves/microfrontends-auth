import federation from '@originjs/vite-plugin-federation'

export default {
    compatibilityDate: '2026-02-10',
    app: { baseURL: '/' },
    server: {
        host: 'localhost',
        port: 3000,
    },
    vite: {
        // Temporarily disable federation plugin while debugging SSR build errors
        plugins: [],
    },
}
