<template>
    <div class="documents">
        <p>Vous êtes bien connecté ! <a class="link" @click="logout()">Me déconnecter</a></p>
    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export default {
    name: "Documents",
    methods: {
        logout() {
            signOut(auth).then(() => {
                localStorage.removeItem('NavigSession');
            }).catch((error) => {
                console.error(error);
            });
        }
    }
}
</script>
