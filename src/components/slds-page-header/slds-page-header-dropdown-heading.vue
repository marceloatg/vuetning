<template>
    <li role="separator" class="slds-listbox__item">
        <div role="presentation" class="slds-media slds-listbox__option slds-listbox__option_plain">
            <h3 role="presentation" class="slds-listbox__option-header">
                {{ label }}
            </h3>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsPageHeaderDropdownHeading",

    props: {
        label: { type: String, required: true },
    },
})
</script>
