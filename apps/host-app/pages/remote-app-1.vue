<script setup lang="ts">
import { shallowRef, markRaw, onMounted, ref } from 'vue'
import { loadRemote } from '../utils/loadRemote'

const Remote1 = shallowRef<any | null>(null)
const importError = ref<string | null>(null)

if (process.client) {
    onMounted(async () => {
        try {
            // Runtime-only loader: import the remoteEntry and resolve the exposed module.
            const entryUrl = 'http://' + 'localhost:3001' + '/assets/remoteEntry.js'
            const comp = await loadRemote(entryUrl, './RemoteRoot')
            Remote1.value = markRaw(comp) as any
            importError.value = null
        } catch (err: any) {
            importError.value = String(err)
        }
    })
}
</script>

<template>
    <div>
        <h1>Remote App 1 (federated)</h1>
        <client-only>
            <div id="mf-debug-remote1" style="font-weight: 600; color: teal; margin-bottom: 8px">remote-app-1 client-only rendered</div>
            <div v-if="importError" style="color: crimson">Error loading remote: {{ importError }}</div>
            <component v-else-if="Remote1" :is="Remote1" />
            <div v-else>Loading remote...</div>
        </client-only>
    </div>
</template>
