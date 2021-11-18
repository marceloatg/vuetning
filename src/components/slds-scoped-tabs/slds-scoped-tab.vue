<template>
    <li
        :title="label"
        role="presentation"
        class="slds-tabs_scoped__item"
        :class="{'slds-is-active': isActive}"
    >
        <a
            :id="`tab-scoped-${id}__item`"
            class="slds-tabs_scoped__link"
            role="tab"
            tabindex="0"
            :aria-selected="isActive"
            :aria-controls="`tab-scoped-${id}`"
        >
            {{ label }}
        </a>
    </li>
</template>

<script>
export default {
    name: 'SldsScopedTab',

    props: {
        id: {type: String, required: true},
        isActive: Boolean,
        label: {type: String, required: true}
    },

    methods: {
        onClick() {
            this.$emit('click')
        }
    }
}
</script>
