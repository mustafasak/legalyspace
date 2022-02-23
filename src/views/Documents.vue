<template>
    <div class="documents">
        <p>Vous êtes bien connecté ! <a class="link" @click="logout()">Me déconnecter</a></p>
    </div>
</template>

<script>
import router from '../router';
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export default {
    name: "Documents",
    methods: {
        logout() {
            signOut(auth).then(() => {
                router.push({
                    path: '/login'
                })
            }).catch((error) => {
                console.error(error);
            });
        }
    }
}
</script>
