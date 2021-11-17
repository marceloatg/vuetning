<template>
    <div
        :id="`tab-default-${id}`"
        class="slds-tabs_default__content slds-show"
        :class="contentClass"
        role="tabpanel"
        :aria-labelledby="`${id}__item`"
    >
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'SldsTabContent',

    props: {
        id: {type: String, required: true},
        isActive: Boolean
    },

    computed: {
        contentClass() {
            return {
                'slds-show': this.isSelected,
                'slds-hide': !this.isActive
            }
        }
    }
}
</script>
