<template>
    <div class="slds-form-element" :class="{ 'slds-has-error': hasError }">

        <!-- Label -->
        <label v-if="label != null" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="required">*</abbr> {{ label }}
        </label>

        <!-- Input -->
        <div class="slds-form-element__control" :class="[iconClass, {'slds-input-has-fixed-addon': hasFixedText}]">

            <!-- Pre fixed text -->
            <span v-if="preFixedText" class="slds-form-element__addon">
                {{ preFixedText }}
            </span>

            <!-- Left icon -->
            <slds-svg
                v-if="leftIconName != null"
                :icon-name="leftIconName"
                class="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default"/>

            <!-- Right icon -->
            <slds-svg
                v-if="rightIconName != null && !hasClearButton"
                :icon-name="rightIconName"
                class="slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default"/>

            <!-- Input -->
            <input
                :type="type"
                :placeholder="placeholder"
                :value="value"
                :maxlength="maxlength"
                class="slds-input"
                v-bind="[disabledAttribute, readOnlyAttribute]"
                @blur="onBlur"
                @change="onChange($event)"
                @input="onInput($event)">

            <!-- Right group -->
            <div class="slds-input__icon-group slds-input__icon-group_right" :style="{right: rightGroupOffset}">

                <slds-spinner
                    v-if="spinnerActive"
                    variant="brand"
                    size="x-small"
                    class="slds-input__spinner"
                    :style="{right: spinnerRight}"/>

                <slds-button-icon
                    v-if="hasClearButton && value"
                    icon-name="utility:clear"
                    class="slds-input__icon slds-input__icon_right"
                    title="Clear"
                    @click.stop="onClear"/>
            </div>

            <!-- Post fixed text -->
            <span v-if="postFixedText" class="slds-form-element__addon post-fixed-text">
                {{ postFixedText }}
            </span>

        </div>

        <!-- Inline help -->
        <div v-if="!hasError && inlineHelp != null" class="slds-form-element__help">
            {{ inlineHelp }}
        </div>

        <!-- Error messages -->
        <div v-if="hasError" class="slds-form-element__help">
            <slot name="errors"/>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Input',
        props: {
            default: {
                default: null,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            hasClearButton: {
                type: Boolean,
                default: false,
            },
            hasError: {
                type: Boolean,
                default: false,
            },
            inlineHelp: {
                type: String,
            },
            label: {
                type: String,
            },
            leftIconName: {
                type: String,
            },
            maxlength: {
                type: Number,
            },
            placeholder: {
                type: String,
            },
            postFixedText: {
                type: String,
            },
            preFixedText: {
                type: String,
            },
            required: {
                type: Boolean,
                default: false,
            },
            rightIconName: {
                type: String,
            },
            readOnly: {
                type: Boolean,
                default: false,
            },
            spinnerActive: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
                default: 'text',
            },
        },
        data() {
            return {
                value: null,
                rightGroupOffset: '0px',
            }
        },
        computed: {
            disabledAttribute() {
                return this.disabled ? {['disabled']: 'disabled'} : {};
            },
            hasFixedText() {
                return (this.postFixedText != null || this.preFixedText != null);
            },
            hasIcon() {
                return (this.leftIconName != null || this.rightIconName != null || this.hasClearButton);
            },
            iconClass() {
                if (!this.hasIcon) return null;
                else if (this.leftIconName != null && (this.rightIconName == null && !this.hasClearButton)) return 'slds-input-has-icon slds-input-has-icon_left';
                else if ((this.rightIconName != null || this.hasClearButton) && this.leftIconName == null) return 'slds-input-has-icon slds-input-has-icon_right';
                else return 'slds-input-has-icon slds-input-has-icon_left-right';
            },
            readOnlyAttribute() {
                return this.readOnly ? {['readonly']: ''} : {};
            },
            spinnerRight() {
                if (this.rightIconName != null || (this.hasClearButton && this.value)) return '1.5rem';
                return '.2rem';
            },
        },
        mounted() {
            if (this.default != null) {
                this.value = this.default;
                this.$emit('input', this.value);
            }

            if (this.postFixedText == null) return;

            const postFixedText = this.$el.getElementsByClassName('post-fixed-text')[0];
            this.rightGroupOffset = `${postFixedText.offsetWidth + 16}px`;
        },
        methods: {
            onClear() {
                this.value = null;
                this.$emit('input', this.value);
            },
            onBlur() {
                this.$emit('blur');
            },
            onChange(event){
                this.$emit('change', event);
            },
            onClick(event) {
                this.value = event.target.value;
                this.$emit('input', this.value);
            },
            onInput(event) {
                this.value = event.target.value;
                this.$emit('input', this.value);
            },
        },
    }
</script>

<style scoped>

</style>
