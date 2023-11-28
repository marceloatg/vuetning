<template>
    <span class="slds-button slds-checkbox_button slds-has-animation" @click="handleClick">

        <!-- Input -->
        <input :checked="checked" type="checkbox">

        <!-- Faux -->
        <label :class="labelClassNames">
            <span class="slds-checkbox_faux">
                {{ label }}
            </span>
        </label>

    </span>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsCheckboxButtonOption",

    props: {
        checked: Boolean,

        disabled: Boolean,

        label: { type: String, required: true },
    },

    computed: {
        /**
         * The CSS class names for the label.
         */
        labelClassNames(): string {
            let classNames = "slds-checkbox_button__label slds-cursor_pointer"

            if (this.checked) classNames += " slds-checkbox-button_is-selected"
            if (this.disabled) classNames += " slds-checkbox-button_is-disabled"

            return classNames
        },
    },

    methods: {
        /**
         * Handles the click event on the checkbox button.
         * @param event The fired event.
         */
        handleClick(event: Event): void {
            if (this.disabled) event.preventDefault()
        },
    },
})
</script>

<style scoped lang="scss">

.slds-checkbox-button_is-disabled {
    cursor: default;

    .slds-checkbox_faux {
        cursor: default;
    }

    &.slds-checkbox-button_is-selected {
        background-color: #c9c7c5 !important;
        border-color: #c9c7c5 !important;
        color: #fff !important;
    }
}

.slds-cursor_pointer {
    cursor: pointer;
}

</style>
