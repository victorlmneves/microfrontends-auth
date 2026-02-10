<script setup lang="ts">
import { shallowRef, markRaw, onMounted, ref } from 'vue'
import { loadRemote } from '../utils/loadRemote'

const Remote2 = shallowRef<any | null>(null)
const importError = ref<string | null>(null)

if (process.client) {
    onMounted(async () => {
        try {
            const entryUrl = 'http://' + 'localhost:3002' + '/assets/remoteEntry.js'
            const comp = await loadRemote(entryUrl, './RemoteRoot')
            Remote2.value = markRaw(comp) as any
            importError.value = null
        } catch (err: any) {
            importError.value = String(err)
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
