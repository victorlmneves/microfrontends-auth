<script setup lang="ts">
import { shallowRef, markRaw, onMounted } from 'vue'

const Remote2 = shallowRef<any | null>(null)
const importError = ref<string | null>(null)

if (process.client) {
    onMounted(async () => {
        try {
            // Try explicit dynamic import via federation-aware specifier
            const spec = 'remote' + '2/RemoteRoot'
            const mod = await import(/* @vite-ignore */ spec)
            Remote2.value = markRaw((mod && (mod.default || mod))) as any
        } catch (err: any) {
            importError.value = String(err)

            // Fallback: import remoteEntry directly and resolve exposed module
            try {
                const entryUrl = 'http://' + 'localhost:3002' + '/assets/remoteEntry.js'
                const entry = await import(/* @vite-ignore */ entryUrl)

                if (entry && typeof entry.get === 'function') {
                    const factory = await entry.get('./RemoteRoot')
                    const mod2 = factory && (await factory())
                    Remote2.value = markRaw((mod2 && (mod2.default || mod2))) as any
                    importError.value = null
                }
            } catch (err2: any) {
                importError.value = String(err2)
            }
        }
    })
}
</script>

<template>
    <div>
        <h1>Remote App 2 (federated)</h1>
        <client-only>
            <div id="mf-debug-remote2" style="font-weight: 600; color: teal; margin-bottom: 8px">remote-app-2 client-only rendered</div>
            <div v-if="importError" style="color: crimson">Error loading remote: {{ importError }}</div>
            <component v-else-if="Remote2" :is="Remote2" />
            <div v-else>Loading remote...</div>
        </client-only>
    </div>
</template>
