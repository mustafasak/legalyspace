<template>
    <div class="step">
        <div class="step__text">Étape {{ valitedStep }} sur {{ totalSteps }}</div>
        <div class="step__group">
            <template v-for="step in totalSteps">
                <div :v-if="step <= valitedStep"
                     :key="step"
                     class="step__item">{{state(step)}}</div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Step',
        props: [
            'step'
        ],
        data() {
            return {
                totalSteps: 5
            }
        },
        computed: {
            valitedStep: function () {
                return this.step;
            },
        },
        methods: {
            state: function(step) {
                if (step <= this.valitedStep) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style>
    .step__text {
        padding: 1em 0;
        font-weight: 400;
        font-size: 0.875em;
        text-align: center;
    }

    .step__group {
        display: flex;
    }

    .step__item {
        width: 18%;
        margin: 0 2% 0 0;
        border-radius: 20px;
        height: 4px;
        background: var(--grayscale-input);
    }
    
    .step__item-completed {
        background: var(--success-default);
    }
    
 </style>