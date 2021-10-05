<template>
    <li class="slds-dropdown__item" role="presentation">
        <a role="menuitem" tabindex="0" @click="onClick">
            <span class="slds-truncate" :title="label">
                {{ label }}
            </span>
        </a>
    </li>
</template>

<script>
export default {
    name: 'SldsOverflowedBreadcrumb',

    props: {
        href: String,
        label: {type: String, required: true},
        name: String
    },

    methods: {
        onClick() {
            this.$parent.hideDropdown()
            if (this.href) window.location.assign(this.href)
            else this.$emit('click', this.name)
        }
    }
}
</script>
