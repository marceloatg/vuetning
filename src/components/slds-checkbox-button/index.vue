<template>
    <label
        class="slds-checkbox-button"
        :class="[{'slds-checkbox-button_is-checked': value}, {'slds-checkbox-button_is-disabled': disabled}]">

        <input
            type="checkbox"
            class="slds-assistive-text"
            :value="value"
            v-bind="$attrs"
            @input="onClick"
            v-on="listeners">

        <slds-icon :icon="icon" current x-small/>

    </label>
</template>

<script>
    import SldsIcon from '../slds-icon/index.vue'

    export default {
        name: 'SldsCheckboxButton',
        components: {
            SldsIcon,
        },
        inheritAttrs: false,
        props: {
            checked: {
                type: Boolean,
            },
            disabled: {
                type: Boolean,
            },
            icon: {
                type: String,
                default: 'utility:add',
            },
        },
        data() {
            return {
                value: null,
            }
        },
        computed: {
            listeners() {
                const listeners = {...this.$listeners};
                delete listeners.input;
                return listeners
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
    .slds-checkbox-button {
        user-select: none;
        transition: all 140ms ease-in-out;

        &:after {
            transition: all 140ms ease-in-out;
        }
    }
</style>
