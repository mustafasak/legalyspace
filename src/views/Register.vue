<template>
	<div class="register">
    <Step :step="currentStep"/>
    <template v-if="currentStep == 1">
      <RegisterAccount @form="navigation"/>
    </template>
    <template v-else-if="currentStep == 2">
      <RegisterInformations @form="navigation"/>
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
      step: Number
    }
  },
  computed: {
    currentStep: function() {
      return parseInt(this.$route.query['step']) || 1;
    },
    nextStep: function() {
      return parseInt(this.$route.query['step']) + 1;
    },
    prevStep: function() {
      return parseInt(this.$route.query['step']) - 1;
    }
  },
  watch: {
    currentStep: function () {}
  },
  methods: {
    navigation: function(value) {
      if (value == "prev") {
          router.push({
            path: '/register',
            query: { step: this.prevStep }
          })
      } else {
        router.push({
          path: '/register',
          query: { step: this.nextStep }
        })
      }
    }
  },
  mounted() {
    if (this.$route.query.step === undefined) {
      router.push({
          path: '/register',
          query: { step: 1 }
        })
    }
  }
}
</script>

<style>

</style>