<template>
	<div class="register">
    <Step :step="currentStep"/>
    <div v-if="currentStep == 1">
      <RegisterAccount @form="navigation"/>
    </div>
    <div v-else-if="currentStep == 2">
      <RegisterInformations @form="navigation"/>
    </div>
    <div v-else-if="currentStep == 3">
      <RegisterAdresse @form="navigation"/>
    </div>
    <div v-else-if="currentStep == 4">
      <RegisterSign @form="navigation"/>
    </div>
  </div>
</template>

<script>
import router from '../../router';
import Step from '../../components/common/Step.vue';
import RegisterAccount from './RegisterAccount.vue';
import RegisterInformations from './RegisterInformations.vue';
import RegisterAdresse from './RegisterAdresse.vue';
import RegisterSign from './RegisterSign.vue';


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