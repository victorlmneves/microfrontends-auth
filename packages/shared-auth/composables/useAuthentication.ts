import { ref } from 'vue';

export function useAuthentication() {
    const user = ref(null);

    function login(username: string) {
        user.value = { name: username };
    }

    function logout() {
        user.value = null;
    }

    return { user, login, logout };
}
