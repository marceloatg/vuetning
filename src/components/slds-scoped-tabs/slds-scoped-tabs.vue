<template>
    <div :class="tabsClassNames">

        <!-- Tabs -->
        <ul class="slds-tabs_scoped__nav" role="tablist">
            <slot name="scoped-tabs">

                <!--  Automatically generated tabs -->
                <slds-scoped-tab
                    v-for="scopedTab in scopedTabs"
                    :key="scopedTab.id"
                    :is-active="active === scopedTab.name"
                    :label="scopedTab.label"
                    :name="scopedTab.name"
                    @click.stop.prevent="handleClickTab(scopedTab.name)"
                />

                <!-- Overflow -->
                <!-- TODO: Implement overflow -->

            </slot>
        </ul>

        <!-- Content -->
        <template v-if="!noContent">
            <slot name="content">
                <slds-scoped-tab-content
                    v-for="scopedTab in scopedTabs"
                    :key="scopedTab.id"
                    :is-active="active === scopedTab.name"
                    :name="scopedTab.name"
                >
                    <slot :name="scopedTab.name"/>
                </slds-scoped-tab-content>
            </slot>
        </template>

    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"
import SldsScopedTab from "../slds-scoped-tabs/slds-scoped-tab.vue"
import SldsScopedTabContent from "../slds-scoped-tabs/slds-scoped-tab-content.vue"
import type { ScopedTab } from "../slds-scoped-tabs/scoped-tab"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "SldsScopedTabs",

    components: {
        SldsScopedTab,
        SldsScopedTabContent,
    },

    props: {
        active: String,

        large: Boolean,

        medium: Boolean,

        noContent: Boolean,

        scopedTabs: { type: Array as PropType<ScopedTab[]>, default: () => [] as ScopedTab[] },

    },

    computed: {
        /**
         * The CSS class names for the tabs.
         */
        tabsClassNames(): string {
            let classNames = "slds-tabs_scoped"

            if (this.large) classNames += " slds-tabs_large"
            else if (this.medium) classNames += " slds-tabs_medium"

            return classNames
        },
    },

    methods: {
        handleClickTab(scopedTabName: string): void {
            this.$emit(EVENTS.CLICK_TAB, scopedTabName)
        },
    },
})
</script>

