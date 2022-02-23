<template>
    <div class="step" :v-if="step > 1">
        <div class="step__text">Étape {{ valitedStep }} sur {{ totalSteps }}</div>
        <div class="step__group">
            <template v-for="step in totalSteps">
                <div :key="step"
                    :class="[stateStep(step) ? 'step__item step__item-completed' :'step__item']"></div>
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
                totalSteps: 4
            }
        },
        computed: {
            valitedStep: function () {
                return this.step;
            },
        },
        methods: {
            stateStep: function(step) {
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
    .step {
        margin-top: 0.5em;
    }

    .step__text {
        padding: 1em 0;
        font-weight: 400;
        font-size: 0.875em;
    }

    .step__group {
        display: flex;
    }

    .step__item {
        width: 23%;
        margin: 0 2% 0 0;
        border-radius: 20px;
        height: 4px;
        background: var(--grayscale-input);
    }
    
    .step__item-completed {
        background: var(--success-default);
    }
    
    @media screen and (min-width: 768px) {
        .step {
            width: 100%;
        }
    }
 </style>