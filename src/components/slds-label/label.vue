<template>
    <label class="slds-form-element__label">
        <abbr v-if="required" class="slds-required" title="required">* </abbr>
        <slot/>
    </label>
</template>

<script>
export default {
    name: 'SldsLabel',

    props: {
        required: Boolean
    }
}
</script>
