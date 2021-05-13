<template>
    <li role="separator" class="slds-listbox__item">
        <div role="presentation" class="slds-media slds-listbox__option slds-listbox__option_plain">
            <h3 role="presentation" class="slds-listbox__option-header">
                {{ heading }}
            </h3>
        </div>
    </li>
</template>

<script>
export default {
    name: 'SldsDropdownHeading',

    props: {
        heading: {type: String, required: true},
    },
}
</script>
