<template>
    <div
        :id="`tab-scoped-${id}`"
        class="slds-tabs_scoped__content slds-show"
        :class="contentClass"
        role="tabpanel"
        :aria-labelledby="`tab-scoped-${id}__item`"
    >
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'SldsScopedTabContent',

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
