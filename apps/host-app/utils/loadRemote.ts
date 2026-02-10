export async function loadRemote(entryUrl: string, exposed: string) {
    // Load the remote entry as an ESM module at runtime. Use @vite-ignore so Vite
    // doesn't try to statically analyze the string during dev/server transforms.
    const entry = await import(/* @vite-ignore */ entryUrl)

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
