<template>
    <nav :class="verticalNavigationClassNames">

        <!-- Quickfind -->
        <div v-if="hasQuickfind" class="slds-form-element slds-p-horizontal_large slds-p-top_large">
            <slds-input v-model="search" icon="utility:search" placeholder="Quick Find"/>
        </div>

        <!-- Sections/Items -->
        <div class="slds-scrollable_y">
            <slot/>
        </div>

    </nav>
</template>

<script lang="ts">
import SldsInput from "../slds-input/slds-input.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsVerticalNavigation",

    components: { SldsInput },

    props: {
        /**
         * Active item name.
         */
        active: String,

        compact: Boolean,

        hasQuickfind: Boolean,

        shaded: Boolean,
    },

    data() {
        return {
            search: null,
        }
    },

    computed: {
        /**
         * The CSS class names for the vertical navigation.
         */
        verticalNavigationClassNames(): string {
            let classNames = "slds-nav-vertical"

            if (this.shaded) classNames += " slds-nav-vertical_shade"
            if (this.compact) classNames += " slds-nav-vertical_compact"
            if (this.hasQuickfind) classNames += " slds-nav-vertical_has-quickfind"

            return classNames
        },
    },
})
</script>

<style scoped lang="scss">

.slds-nav-vertical {
    height: 100%;
}

.slds-nav-vertical_has-quickfind {
    .slds-scrollable_y {
        max-height: calc(100% - 3.5rem);
    }
}

</style>
