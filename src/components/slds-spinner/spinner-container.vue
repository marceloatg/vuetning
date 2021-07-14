<template>
    <div class="slds-spinner_container" :class="containerClass">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "SldsSpinnerContainer",

    props: {
        fixed: Boolean
    },

    computed: {
        containerClass() {
            if (this.fixed) return ' slds-is-fixed'
            return ''
        }
    }
}
</script>
