<template>
    <div class="documents">
        <p>Vous êtes bien connecté ! <a class="link" @click="logout()">Me déconnecter</a></p>
    </div>
</template>

<script>
import router from '../router';

export default {
    name: "Documents",
    methods: {
        logout() {
            localStorage.removeItem('NavigSession');
            router.push({
                path: '/login'
            });
        }
    }
}
</script>
