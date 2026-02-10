// Temporarily disable federation plugin to isolate SSR rendering issues.
// Re-enable once SSR/federation transform is debugged.
export default {
    compatibilityDate: '2026-02-10',
    app: { baseURL: '/' },
    server: {
        host: 'localhost',
        port: 3000,
    },
    vite: {
        // Keep an empty plugins array for now to avoid transform errors.
        plugins: [],
    },
}
