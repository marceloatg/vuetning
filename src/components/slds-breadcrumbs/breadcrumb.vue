<template>
    <li class="slds-breadcrumb__item">
        <a :class="anchorClass" @click="onClick">
            {{ label }}
        </a>
    </li>
</template>

<script>
export default {
    name: "SldsBreadcrumb",

    props: {
        href: String,
        label: {type: String, required: true},
        neutral: Boolean,
        name: String
    },

    computed: {
        anchorClass() {
            return {
                'slds-text-color_weak': this.neutral
            }
        }
    },

    methods: {
        onClick() {
            if (this.href) window.location.assign(this.href)
            else this.$emit('click', this.name)
        }
    }
}
</script>
