<template>
    <li role="presentation" class="slds-listbox__item">
        <div role="presentation" class="slds-media slds-listbox__option slds-listbox__option_plain">
            <h3 role="presentation" class="slds-listbox__option-header">
                {{ group }}
            </h3>
        </div>
    </li>
</template>

<script>
    export default {
        name: "SldsPicklistHeading",
        props: {
            group: {
                type: String,
                required: true,
            },
        },
    }
</script>