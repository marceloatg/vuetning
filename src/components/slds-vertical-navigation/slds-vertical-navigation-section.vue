<template>
    <div class="slds-nav-vertical__section">

        <!-- Title -->
        <h2 v-if="title" class="slds-nav-vertical__title">
            {{ title }}
        </h2>

        <!-- Items -->
        <ul>
            <slot/>
        </ul>

    </div>
</template>

<script>
export default {
    name: 'SldsVerticalNavigationSection',

    props: {
        title: String,
    },

    computed: {
        selectedItem() {
            return this.$parent.selectedItem
        }
    },
}
</script>
