<template>
    <div class="documents layout__main">
        <div class="list"
             v-if="loaded">
            <div class="document"
                 v-for="document in documents"
                 :key="document.id">
                 <input type="checkbox" style="width: 16px; height: 16px;"/>
                 <div class="document__type">
                    <img src="@/assets/icons/documentType.png" />
                 </div>
                 <div class="document__content">
                    <span class="text__body-bold">{{ document.nom }}</span>
                    <p class="text__body">Reçu le {{ document.dateDepot }}</p>
                 </div>
                <div class="document__show"
                    @click="showDocument(document.id)">
                    <img src="@/assets/icons/documentShow.png" />
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
    name: "Documents",
    data() {
        return {
            api: null,
            loaded: false,
            documents: [
                {
                 id: 7475885,
                nom: "Livret de sécurité UNDLN 2022.pdf",
                dateDepot: "08/03/2022",
                lu: true,
                signaturePossible: true,
                signatureExpected: false,
                validationExpected: false,
                status: 1,
                subStatus: 0,
                destinataire: "Amiot Julie",
                etatPartenaire: 1,
                etatProprietaire: 2,
                nomPartenaire: "Amiot Julie",
                nomProprietaire: "Maison SVRO",
                typologieId: 329,
                typologieLabel: "Note d'information",
                isAr: false,
                isLrar: false,
                chorus: 0
            }]
        }
    },
    methods: {
        showDocument(id) {
            router.push(`/document/${id}`)
        }
    },
    mounted() {
        this.api = axios.create({
            baseURL : 'https://demo.legalyspace.com/LYSLogique/api/',
            withCredentials : true,
            headers : {        
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        this.api.post(`https://demo.legalyspace.com/LYSLogique/api/document/list`,  {
                    page: 1,
                    search: "",
                    size: 25,
                    sort: null
            },{
            headers: {
                'Authorization': JSON.parse(localStorage.getItem('NavigSession'))
            }
        }).then(() => {
            this.loaded = true;
        })
    }
}
</script>

<style>
.document {
    border: 1px solid var(--grayscale-input);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
}

.document__content .text__body {
    padding-bottom: 0;
}

.document__content .text__body,
.document__content .text__body-bold {
    font-size: 14px;
}


</style>