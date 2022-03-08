<template>
	<div class="layout__main">
     <div class="layout__column">
         <Step :step="4"/>
            <div class="title__breadcrumbs">
                <h1 class="title__primary">Inscription</h1>
                <div class="title__icon">
                    <img class="header__breadcrumbs"
                        src="@/assets/breadcrumbs.png"
                        alt="Logo LegalySpace" />
                </div>
                <div class="title__secondary">Convention de preuves</div>
            </div>
        <p class="text__body">Pour créer votre compte sur l’espace légale LegalySpace, vous devez accepter et signer la convention de preuves.</p>
        <p class="text__body">Il s’agit d’un document qui permet de sécurisé l’accès à votre compte et aux documents profesionnels s’y trouvant.</p>
        <div class="layout__column">
            <div class="register-sign__document">{{ content }}</div>
        </div>
        <div v-if="actions == 'REQUEST_SIGN'"
                     class="form__buttons form__buttons-double layout__fixed">
                    <button class="button button-prev"
                            type="button"
                            @click="previous">Refuser</button>
                    <button class="button button-submit"
                            type="button"
                            @click.stop.prevent="sign()">Signer</button>
                </div>
                <div v-else-if="actions == 'REQUEST_CODE'"
                     class="form__buttons form__buttons-double layout__fixed">
                    <button class="button button-prev"
                            type="button"
                            @click="previous">Refuser</button>
                    <button class="button button-submit"
                            type="button"
                            @click.stop.prevent="sign()">Signer</button>
                </div>
                <div v-else-if="actions == 'SUBMIT_CODE'"
                     class="form__buttons form__buttons-double layout__fixed">
                    <button class="button button-prev"
                            type="button"
                            @click="previous">Refuser</button>
                    <button class="button button-submit"
                            type="button"
                            @click.stop.prevent="sign()">Signer</button>
                </div>
                <div v-if="actions == 'READING'"
                     class="form__buttons form__buttons-double layout__fixed">
                    <button class="button button-prev"
                            type="button"
                            @click="previous">Précédent</button>
                    <button class="button button-prev"
                            type="button"
                            @click.stop.prevent="next(reading)">Lire la suite</button>
                </div>
    </div>
    </div>
</template>

<script>
import Step from '../components/common/Step.vue';
import axios from 'axios';

export default {
    name:'Sign',
    components: {
        Step
    },
    data() {
        return {
            content: '',
            api: null,
            reading: 0,
            actions: 'READING'
        }
    },
    methods: {
        sign() {
            this.api.post(`https://demo.legalyspace.com/LYSLogique/api/document/convention/sign`, {
            codeSMS: null,
            idSMS: null
        }).then((response) => {
            console.log(response)
        });
        },
        next(event) {
            event = event + 1;
            this.reading = event;

            if ((this.reading * window.innerHeight) > document.getElementsByTagName('body')[0].scrollHeight) {
                console.log('REQUEST_SIGN');
                this.actions = "REQUEST_SIGN"
            }
            window.scrollTo(0, this.reading * window.innerHeight);

        },
        previous() {
            this.$emit('form', {
                action: 'previous'
            })
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

         this.api.get(`https://demo.legalyspace.com/LYSLogique/api/document/convention`, {
            headers: {
                'Authorization': JSON.parse(localStorage.getItem('NavigSession'))
            }
        }).then((response) => {
            this.content = response.data.content;
        });
    }
}
</script>
