<template>
    <nav class="slds-nav-vertical" :class="verticalNavigationClass">

        <!-- Quickfind -->
        <div v-if="hasQuickfind" class="slds-form-element slds-p-horizontal_large slds-p-top_large">
            <slds-input v-model="$data.$_search" icon="utility:search" placeholder="Quick Find"/>
        </div>

        <!-- Sections/Items -->
        <slot/>

    </nav>
</template>

<script>
export default {
    name: 'SldsVerticalNavigation',

    props: {
        compact: Boolean,
        hasQuickfind: Boolean,
        selectedItem: String,
        shaded: Boolean,
    },

    data() {
        return {
            $_search: null,
        }
    },

    computed: {
        verticalNavigationClass() {
            return {
                'slds-nav-vertical_shade': this.shaded,
                'slds-nav-vertical_compact': this.compact,
            }
        }
    },
}
</script>
