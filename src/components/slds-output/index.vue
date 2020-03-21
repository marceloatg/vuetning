<template>
    <div class="slds-form-element slds-form-element_readonly" :class="{'slds-form-element_stacked': stacked}">

        <span class="slds-form-element__label">
            {{ label }}
        </span>

        <div class="slds-form-element__control">
            <div class="slds-form-element__static">
                {{ value }}
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'SldsOutput',
        props: {
            label: String,
            stacked: Boolean,
            value: String,
        },
    }
</script>
