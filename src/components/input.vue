<template>
    <div class="customInput">
        <div class="customInput__labels">
            <label class="customInput__label"
                   :for="options.name">{{ options.label }}</label>
        </div>
        <div :class="this.addClass('group')">
            <span :class="this.addClass('placeholder')">{{ options.placeholder }}</span>
            <template v-if="isFocused">
                <img class="customInput__clear"
                     src="@/assets/icons/clear.png"
                     alt="clear value"
                     @click="clearValue"/>
            </template>
            <template v-if="this.options.typeable">
                    <img v-if="type"
                            class="customInput__type"
                            src="@/assets/icons/eye-outline.png"
                            alt="toggle type"
                            @click="toggleType(type)"/>
                    <img v-else
                            class="customInput__type"
                            src="@/assets/icons/eye-off-outline.png"
                            alt="toggle type"
                            @click="toggleType(type)"/>
            </template>
            <input class="customInput__input"
                    :type="options.type"
                    :placeholder="options.label"
                    :name="options.name"
                    v-model="input"
                    :autocomplete="options.autocomplete"
                    :id="options.id"
                    @change="handleChange"
                    @blur="handleBlur"
                    @focus="handleFocus" />
        </div>
        <p :class="this.addClass('message')"> {{ message }}</p>
        <a class="customInput__link link"
           v-if="this.options.action[0]">{{ options.action[1] }}</a>
    </div>
</template>

<script>
/* eslint-disable no-useless-escape */
/**
 * eslint disable for regex use
 */

export default {
    name: 'CustomInput',
    props: {
        options: Object
    },
    data() {
        return {
            type: false,
            input: null,
            success: false,
            error: false,
            filled: false,
            focused: false,
            message: '',
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        }
    },
    computed: {
        isFilled() {
            return this.filled;
        },
        isFocused() {
            return this.focused;
        },
        isSuccess() {
            return this.sucess;
        },
        isError() {
            return this.error;
        }
    },
    watch: {
        options(changed) {
            if (changed.value !== null && changed.value !== '' && changed.value !== undefined) {
                this.setValue(changed.value);
                this.handleChange();
            }
        }
    },
    methods: {

        setValue(value) {
            this.input = value;
        },

        /**
         * Input validation onChange event
         */
        handleChange() {
            this.success = false;
            this.error = false;

            this.$emit('valueChange', {
                name: this.options.name,
                value: this.input
            });

            if ( this.input !== null && this.input !== ''  && this.input !== undefined) {
                    this.filled = true;

                if ( this.options.type == 'username' || this.options.type == 'email' ) {
                    if ( this.regex.test(this.input )) {
                        this.successState();

                        return;

                    } else {
                        this.errorState();
                        this.message = 'L\'adresse email renseigné n\' est pas au bon format.';

                        return;
                    }
                } else if ( this.options.type == 'password' ) {
                    if ( this.input.length >= 6 ) {
                        this.successState();

                        return;
                    } else {
                        this.errorState();
                        this.message = 'Votre mot de passe doit avoir au moins 6 charactères.';
                    }
                } else if ( this.options.type == 'text' ) {
                    if ( this.input.length >= 1 ) {
                        this.successState();

                        return;
                    } 
                } else if ( this.options.type == 'date' ) {
                    if ( this.input.length >= 1 ) {
                        this.successState();

                        return;
                    } 
                } else if ( this.options.type == 'tel' ) {
                    if ( this.input.length >= 1 ) {
                        this.successState();

                        return;
                    } 
                }

            } else  {
                this.errorState();
                this.message = 'Nous avons besoin de cette information pour vous identifier.';
            }
        },

        /**
         * Define the sucess state
         */
        successState() {
            this.success = true;
            this.error = false;
            this.message = '';
        },

        /**
         * Define the error state
         */
        errorState() {
            this.success = false;
            this.error = true;
        },

        /**
         * Define usage onFocus event
         */
        handleFocus(event) {
            event.preventDefault();

            this.focused = true;
            this.filled = true;

            return false;
        },

        /**
         * Define usage onBlur event
         */
        handleBlur() {
            if ( this.input !== null && this.input !== '') {
                this.filled = true;
            } else {
                this.filled = false;
            }
            setTimeout(() => {
                this.focused = false;
                this.handleChange();
            }, 300);

            return false;
        },

        /**
         * Change input type
         */
        toggleType(type) {
            this.type = !type;

            if ( this.type ) {
                this.options.type = 'text';
            } else {
                this.options.type = 'password';
            }
        },

        /**
         *  Clear input value
         */
        clearValue() {
            this.input = '';
            this.focused = false;
            this.handleChange();

            return false;
        },

        /**
         *  Define style on component
         */
        addClass(element) {
            let style = '';
            if (element == 'group') {
                style = 'customInput__group';
                if (this.success) {
                    style = 'customInput__group customInput__group-sucess';
                } 
                if (this.error) {
                    style = 'customInput__group customInput__group-error';
                }
                if (this.focused) {
                    style = 'customInput__group customInput__group-focus';
                }

                return  style;
            } else if (element == 'placeholder') {
                let style = 'customInput__placeholder';
                if (this.filled) {
                    style = style + ' customInput__placeholder-filled'
                }

                return style;
            } else if (element == 'message') {
                let style = 'customInput__message';
                if (this.filled) {
                    style = style + ' customInput__message-filled'
                }

                return style;
            }

            return style;
        }
    }
}

</script>

<style>
/**
 * input 
 * Native input style */

input {
    font-family: Poppins, Helvetica, Arial, sans-serif;
    width: 100%;
    background: var(--grayscale-input);
    border: 0;
    border-radius: 1em;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    background: transparent;
    font-weight: 400;
    font-size: 0.875em;
    margin: 0;
    display: block;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 70px var(--success-light) inset !important;
}

input:focus {
    outline: 0;
}

input::placeholder{
  opacity: 0;
} 


/**
 * .customInput  
 * Custom input style */

.customInput {
    margin-bottom: 1.5rem;
    position: relative;
}

.customInput__input {
    position: relative;
    z-index: 2;
}

/**
 * .customInput__placeholder  
 * Custom placeholder input style */

.customInput__placeholder {
    color: var(--grayscale-placeholder);
    font-weight: 400;
    padding-top: 20px;
    padding-left: 1.5rem;
    position: absolute;
    z-index: 1;
    opacity: 1;
    top: 2px;
    left: 0;
    font-size: 1em;
    transition: all 0.3s ease-out
}

/**
 * .customInput__group  
 * Custom group input style */

.customInput__group {
    position: relative;
    margin: 0 0 10px 0;
    background: var(--grayscale-input);
    border-radius: 16px;
    border: 2px solid transparent;
}

/**
 * .customInput__labels  
 * Custom labels input style */

.customInput__labels {
    padding-bottom: 0.875em;
    display: flex;
    justify-content: space-between;
}

.customInput__label {
    font-weight: 600;
    font-size: 1em;
    color: var(--grayscale-ash);
    display: block;
    cursor: pointer;
}


.customInput__link {
    position: absolute;
    bottom: -41px;
    right: 0;
}

/**
 * .customInput__input  
 * Filled style */
.customInput__placeholder-filled {
    font-size: 12px;
    padding-top: 0.5rem;
    font-weight: 500;
    z-index: 3;
}

/**
 * .customInput__input  
 * Focus style */

.customInput__group-focus .customInput__placeholder {
    opacity: 1;
    transition: all 0.3s ease-in;
} 

.customInput__group-focus {
    background: white;
    border: 2px solid var(--grayscale-offblack);
}

.customInput__group-focus .customInput__input::placeholder {
    display: none;
} 

.customInput__group-focus .customInput__type {
    right: 48px;
}

/**
 * .customInput__input  
 * Action style */

.customInput__clear,
.customInput__type {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 18px;
    right: 16px;
    z-index: 3;
}

/**
 * .customInput__input  
 * Message style */

.customInput__message {
    display: none;
    font-size: 12px;
    font-weight: 500;
}

/**
 * .customInput__input  
 * Success style */

.customInput__group-sucess {
    border: 2px solid var(--success-default);
    background: var(--success-light);
}

.customInput__group-sucess + .customInput__message { 
    display: block;
    color: var(--success-default);
}

.customInput__group-sucess .customInput__placeholder-filled {
    color: var(--success-default);
}


/**
 * .customInput__input  
 * Error style */
.customInput__group-error {
    border: 2px solid var(--error-default);
    background: var(--error-light);
}

.customInput__group-error + .customInput__message { 
    display: block;
    color: var(--error-default);
}

.customInput__group-error .customInput__placeholder-filled {
    color: var(--error-default);
}

</style>