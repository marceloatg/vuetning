<template>
    <div class="slds-checkbox">

        <!-- Checked icon -->
        <slds-icon
            v-if="value"
            class="slds-align-middle"
            x-small
            icon-name="utility:check"
        />

        <!-- Unchecked icon -->
        <slds-icon
            v-else
            class="slds-align-middle"
            x-small
            icon-name="utility:steps"
        />

        <label class="slds-checkbox__label">

            <span class="slds-m-right--x-small"/>

            <span class="slds-form-element__label">
                {{ label }}
            </span>

        </label>

    </div>
</template>

<script lang="ts">
import SldsIcon from "../slds-icon/slds-icon.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsCheckboxOutputGroupOption",

    components: { SldsIcon },

    props: {
        borderless: Boolean,

        /**
         * Input label.
         */
        label: String,

        /**
         * Indicates whether the input is stacked among other inputs.
         */
        stacked: Boolean,

        /**
         * Input value.
         */
        value: null,
    },
})
</script>


