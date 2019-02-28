<template>
    <div class="slds-form-element">
        <div class="slds-form-element__control">
            <div class="slds-checkbox">

                <input
                    type="checkbox"
                    :checked="value"
                    :value="value">

                <label class="slds-checkbox__label">

                    <span class="slds-checkbox_faux" @click.stop="onClick"/>

                    <span class="slds-form-element__label">
                        {{ label }}
                    </span>

                </label>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            checked: {
                type: Boolean,
                default: false,
            },
            label: {
                type: String,
            },
        },
        data() {
            return {
                value: null,
            }
        },
        mounted() {
            this.value = this.checked;
        },
        methods: {
            onClick() {
                this.value = !this.value;
                this.$emit('input', this.value);
            },
        },
    }
</script>

<style scoped>

</style>