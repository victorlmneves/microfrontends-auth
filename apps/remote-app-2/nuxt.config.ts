import federation from '@originjs/vite-plugin-federation'

export default {
    compatibilityDate: '2026-02-10',
    app: { baseURL: '/' },
    server: {
        host: 'localhost',
        port: 3002
    },
    vite: {
        plugins: [
            federation({
                name: 'remote2',
                filename: 'remoteEntry.js',
                exposes: {
                    './RemoteRoot': './components/RemoteRoot.vue'
                },
                shared: ['vue'],
            })
        ]
    }
}
