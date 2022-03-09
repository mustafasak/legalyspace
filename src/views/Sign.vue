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
        <div v-if="actions == 'SIGN_REQUEST'"
                     class="sign__form layout__fixed">
                    <div class="form__buttons form__buttons-double">
                        <button class="button button-prev"
                                type="button"
                                @click="previous">Refuser</button>
                        <button class="button button-submit"
                                type="button"
                                @click.stop.prevent="sign()">Signer</button>
                    </div>
                </div>
                <div v-else-if="actions == 'CODE_REQUEST'"
                     class="sign__form layout__fixed">

                    <CustomInput :options="{
                    type: 'tel',
                    name: 'tel',
                    id: 'tel',
                    autocomplete: 'tel',
                    label: 'Numéro de téléphone',
                    placeholder: 'Entrer votre numéro de téléphone',
                    action: [false],
                    typeable: false }"
                    @valueChange="getValue($event)"></CustomInput>
                      <div class="form__buttons form__buttons-double">
                    <button class="button button-prev"
                            type="button"
                            @click="previous">Refuser</button>
                    <button class="button button-submit"
                            type="button"
                            @click.stop.prevent="sign()">Signer</button>
                      </div>
                </div>
                <div v-else-if="actions == 'SUBMIT_CODE'"
                     class="sign__form layout__fixed">
                                         <CustomInput :options="{
                    type: 'tel',
                    name: 'tel',
                    id: 'tel',
                    autocomplete: 'tel',
                    label: 'Numéro de téléphone',
                    placeholder: 'Entrer votre numéro de téléphone',
                    action: [true, 'Renvoyer un code'],
                    typeable: false }"
                    @valueChange="getValue($event)"></CustomInput>
                                        <CustomInput :options="{
                    type: 'text',
                    name: 'code',
                    id: 'code',
                    autocomplete: 'code',
                    label: 'Code reçu par SMS',
                    placeholder: 'Entrer votre code',
                    action: [false],
                    typeable: false }"
                    @valueChange="getValue($event)"></CustomInput>
                      <div class="form__buttons form__buttons-double">
                    <button class="button button-prev"
                            type="button"
                            @click="previous">Refuser</button>
                    <button class="button button-submit"
                            type="button"
                            @click.stop.prevent="sign()">Signer</button>
                      </div>
                </div>
                <div v-if="actions == 'READING'"
                     class="sign__form layout__fixed">
                      <div class="form__buttons form__buttons-double">
                    <button class="button button-prev"
                            type="button"
                            @click="previous">Précédent</button>
                    <button class="button button-prev"
                            type="button"
                            @click.stop.prevent="next(reading)">Lire la suite</button>
                      </div>
                </div>
    </div>
    </div>
</template>

<script>
import Step from '../components/common/Step.vue';
import axios from 'axios';
import CustomInput from "../components/input.vue";
import router from '../router';

export default {
    name:'Sign',
    components: {
        Step,
        CustomInput
    },
    data() {
        return {
            content: '',
            api: null,
            reading: 0,
            actions: 'READING',
            tel: null,
            code: null
        }
    },
    methods: {
        sign() {
            if (localStorage.getItem('NavigSession') !== undefined && localStorage.getItem('NavigSession') !== null) {
                
                this.api.post(`https://demo.legalyspace.com/LYSLogique/api/document/convention/sign`, {
                        idSMS: this.idSMS,
                        codeSMS: this.code,
                        phoneNumber: this.tel,
                        phoneNumberExtension: "+33"
                    },{
                        headers: {
                            'Authorization': JSON.parse(localStorage.getItem('NavigSession')),
                        }
                }).then((response) => {
                    if(response.data.erreurCode) {
                        this.actions = response.data.erreurCode;
                    } else {
                        this.idSMS = response.data.idSMS;
                        if (this.actions == "SUBMIT_CODE") {
                            router.push({
                                path: '/documents'
                            });
                        } else {
                            this.actions = "SUBMIT_CODE"
                        }
                    }
                });
            }
        },
        next(event) {
            event = event + 1;
            this.reading = event;

            if ((this.reading * window.innerHeight) > document.getElementsByTagName('body')[0].scrollHeight) {
                console.log('SIGN_REQUEST');
                this.actions = "SIGN_REQUEST"
            }
            window.scrollTo(0, this.reading * window.innerHeight);

        },
        previous() {
            this.$emit('form', {
                action: 'previous'
            })
        },

        getValue(event) {
            if (event.name == 'tel') {
                this.tel = event.value;
            } else if (event.name == 'code') {
                this.code = event.value;
            }
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

<style>
.sign__form {
    padding: 1.5em 1.5em 2em 1.5em;
    left: 0;
    bottom: 0;
    background: white;
    box-shadow: 0 0px 14px 0 rgb(0 0 0 / 10%);
    border-radius: 12px 12px 0 0;
}
</style>