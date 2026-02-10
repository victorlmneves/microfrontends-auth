import federation from '@originjs/vite-plugin-federation'

export default {
    compatibilityDate: '2026-02-10',
    app: { baseURL: '/' },
    server: {
        host: 'localhost',
        port: 3001
    },
    vite: {
        plugins: [
            federation({
                name: 'remote1',
                filename: 'remoteEntry.js',
                exposes: {
                    './RemoteRoot': './components/RemoteRoot.vue'
                },
                shared: {
                    vue: {
                        singleton: true,
                        eager: true
                    }
                },
                dev: {
                    enabled: true
                }
            })
        ]
    }
}
