<template>
	<div class="register">
    <Step :step="currentStep"/>
    <template v-if="currentStep == 1">
      <RegisterAccount @form="navigation"
                       :user="user"/>
    </template>
    <template v-else-if="currentStep == 2">
      <RegisterInformations @form="navigation"
                            :user="user"/>
    </template>
    <template v-else-if="currentStep == 3">
      <RegisterAdresse @form="navigation"/>
    </template>
    <template v-else-if="currentStep == 4">
      <RegisterSign @form="navigation"/>
    </template>
  </div>
</template>

<script>
import router from '../router';
import Step from '../components/common/Step.vue';
import RegisterAccount from '../components/register/RegisterAccount.vue';
import RegisterInformations from '../components/register/RegisterInformations.vue';
import RegisterAdresse from '../components/register/RegisterAdresse.vue';
import RegisterSign from '../components/register/RegisterSign.vue';
import axios from 'axios';


export default {
  name: 'Register',
  components: {
    Step,
    RegisterAccount,
    RegisterInformations,
    RegisterAdresse,
    RegisterSign
  },
  data() {
    return {
      step: Number,
      user: null
    }
  },
  computed: {
    currentStep: function() {
      return parseInt(this.$route.query['step']) || 1;
    },
    code: function() {
      return this.$route.query['code'];
    },
    nextStep: function() {
      return parseInt(this.$route.query['step']) + 1;
    },
    prevStep: function() {
      return parseInt(this.$route.query['step']) - 1;
    }
  },
  watch: {
    currentStep: function () {},
    user: function () {}
  },
  methods: {
    navigation: function(value) {
      if (value == "prev") {
        if (this.code !== undefined) {
          router.push({
            path: '/register',
            query: {
              step: this.prevStep,
              code: this.code
            }
          })
        } else {
          router.push({
            path: '/register',
            query: { step: this.prevStep }
          })
        }
      } else {
        if (this.code !== undefined) {
          router.push({
            path: '/register',
            query: {
              step: this.nextStep,
              code: this.code
            }
          })
        } else {
          router.push({
            path: '/register',
            query: {
              step: this.nextStep
            }
          })
        }
      }
    }
  },
  created() {
    console.log(this.currentStep);
    if (this.currentStep === undefined) {
      router.push({
          path: '/register',
          query: { step: 1 }
        })
    }
    if (this.code !== undefined) {
      this.api = axios.create({
          baseURL : 'https://demo.legalyspace.com/LYSLogique/api/',
          withCredentials : true,
          headers : {        
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      });
      this.api.post(
          `https://demo.legalyspace.com/LYSLogique/api/inscription/getUserFromCodePartenaire`, {
              codePartenaire: this.code 
          }
      ).then(response => {
        localStorage.setItem('user', JSON.stringify(response.data))
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
      })
      .catch(e => {
          this.errors.push(e)
      })
    }
  }
}
</script>

<style>

</style>