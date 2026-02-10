export async function loadRemote(entryUrl: string, exposed: string) {
    // Load the remote entry as an ESM module at runtime. Use an indirect
    // dynamic import via the Function constructor to avoid Vite's static
    // analysis/transform of `import()` during SSR/dev transforms.
    // eslint-disable-next-line no-new-func
    const entry = await (new Function('u', 'return import(u)'))(entryUrl)

    if (!entry) {
        throw new Error(`Failed to import remote entry: ${entryUrl}`)
    }

    // The standalone Vite federation remote exposes a `get` function that returns
    // a factory for the requested module (matching webpack federation runtime).
    if (typeof entry.get !== 'function') {
        throw new Error(`Remote entry does not expose a 'get' function: ${entryUrl}`)
    }

    const factory = await entry.get(exposed)

    if (typeof factory !== 'function') {
        throw new Error(`Remote did not return a factory for '${exposed}' from ${entryUrl}`)
    }

    const mod = await factory()

    return mod && (mod.default || mod)
}
