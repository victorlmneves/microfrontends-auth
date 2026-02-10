<script setup lang="ts">
const ports = {
    host: 3000,
    remote1: 3001,
    remote2: 3002,
};

const hostHref = `http://localhost:${ports.host}`;
const remote1Href = `http://localhost:${ports.remote1}`;
const remote2Href = `http://localhost:${ports.remote2}`;
</script>

<template>
    <div id="app">
        <header class="site-header">
            <nav>
                <ul>
                    <li><NuxtLink to="/">Host: {{ hostHref }}</NuxtLink></li>
                    <li><NuxtLink to="/remote-app-1">Remote App 1: {{ remote1Href }}</NuxtLink></li>
                    <li><NuxtLink to="/remote-app-2">Remote App 2: {{ remote2Href }}</NuxtLink></li>
                </ul>
            </nav>
        </header>

        <main>
            <NuxtPage />
        </main>

        <footer class="site-footer">
            <small>Microfrontends Auth — © {{ new Date().getFullYear() }}</small>
        </footer>
    </div>
</template>

<style scoped>
.site-header {
    padding: 12px 16px;
    background: #f5f5f7;
    border-bottom: 1px solid #e5e5e7;
}
.site-header ul {
    display: flex;
    gap: 12px;
    list-style: none;
    margin: 0;
    padding: 0;
}
.site-header a {
    color: #0f172a;
    text-decoration: none;
    font-weight: 600;
}
main {
    padding: 24px;
}
.site-footer {
    padding: 12px 16px;
    border-top: 1px solid #e5e5e7;
    text-align: center;
    color: #6b7280;
}
</style>
