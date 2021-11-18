<template>
    <slds-dropdown-heading :heading="heading"/>
</template>

<script>
import SldsDropdownHeading from '@/components/slds-options/slds-dropdown-heading'

export default {
    name: 'SldsMenuHeading',

    components: {
        SldsDropdownHeading
    },

    props: {
        heading: {type: String, required: true}
    }
}
</script>
