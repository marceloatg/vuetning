<template>
    <div class="slds-checkbox_add-button" @click.stop="onClick">

        <input
            type="checkbox"
            :checked="value"
            :value="value"
            class="slds-assistive-text"
            v-bind="[disabledAttribute]">

        <label class="slds-checkbox_faux"/>

    </div>
</template>

<script>
    export default {
        props: {
            checked: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                value: null,
            }
        },
        computed: {
            disabledAttribute() {
                return this.disabled ? {['disabled']: 'disabled'} : {};
            },
        },
        watch: {
            checked: function (newValue) {
                this.value = newValue;
            }
        },
        mounted() {
            this.value = this.checked;
        },
        methods: {
            onClick() {
                if (this.disabled) return;
                
                this.value = !this.value;
                this.$emit('input', this.value);
            },
        },
    }
</script>

<style scoped lang="scss">
    .slds-checkbox_faux {
        transition: all 250ms ease-in-out;

        &:after {
            transition: all 250ms ease-in-out;
        }
    }
</style>
