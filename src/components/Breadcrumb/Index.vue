<template>
    <nav role="navigation">
        <ol class="slds-breadcrumb slds-list_horizontal slds-wrap">
            <li v-for="item in items" :key="item.id" class="slds-breadcrumb__item">
                <a class="slds-text-color_weak" @click="onClick(item)">
                    {{ item.label }}
                </a>
            </li>
        </ol>
    </nav>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
        methods: {
            onClick(item) {
                this.$emit('click', item.href);
            },
        },
    }
</script>

<style scoped lang="scss">
    .slds-breadcrumb .slds-list__item:before,
    .slds-breadcrumb__item:before {
        top: -.225rem;
    }

    a {
        line-height: 13px;
    }
</style>
