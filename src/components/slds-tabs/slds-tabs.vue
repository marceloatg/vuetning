<template>
    <div :class="tabsClassNames">

        <!-- Tabs -->
        <ul class="slds-tabs_default__nav" role="tablist">
            <slot name="tabs">

                <!--  Automatically generated tabs -->
                <slds-tab
                    v-for="tab in tabs"
                    :key="tab.name"
                    :label="tab.label"
                    :name="tab.name"
                    :icon-name="tab.iconName"
                    :has-error="tab.hasError"
                    :is-active="active === tab.name"
                    @click.stop.prevent="handleClickTab(tab.name)"
                />

                <!-- Overflow -->
                <!-- TODO: Implement overflow -->

            </slot>
        </ul>

        <!-- Content -->
        <template v-if="!noContent">
            <slot name="content">
                <slds-tab-content
                    v-for="tab in tabs"
                    :key="tab.name"
                    :name="tab.name"
                    :is-active="active === tab.name"
                >
                    <slot :name="tab.name"/>
                </slds-tab-content>
            </slot>
        </template>

    </div>
</template>

<script lang="ts">
import SldsTab from "./slds-tab.vue"
import SldsTabContent from "./slds-tab-content.vue"
import { EVENTS } from "../../constants"
import { defineComponent, type PropType } from "vue"
import type { Tab } from "./tab"

export default defineComponent({
    name: "SldsTabs",

    components: {
        SldsTab,
        SldsTabContent,
    },

    props: {
        /**
         * Active tab name.
         */
        active: String,

        tabs: { type: Array as PropType<Tab[]>, default: () => [] as Tab[] },

        large: Boolean,

        medium: Boolean,

        noContent: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the tabs.
         */
        tabsClassNames(): string {
            let classNames = "slds-tabs_default"

            if (this.large) classNames += " slds-tabs_large"
            else if (this.medium) classNames += " slds-tabs_medium"

            return classNames
        },
    },

    methods: {
        handleClickTab(tabName: string) {
            this.$emit(EVENTS.CLICK_TAB, tabName)
        },
    },
})
</script>

<style scoped lang="scss">

li {
    cursor: pointer;
}

</style>
