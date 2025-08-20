<template>
    <div class="slds-vertical-tabs">

        <!-- Vertical tabs -->
        <ul class="slds-vertical-tabs__nav" role="tablist" aria-orientation="vertical">
            <slds-vertical-tab
                v-for="tab in tabs"
                :key="tab.name"
                :label="tab.label"
                :description="tab.description"
                :name="tab.name"
                :left-icon-name="tab.leftIcon"
                :right-icon-name="tab.rightIcon"
                :is-active="active === tab.name"
                @click.stop.prevent="handleClickTab(tab.name)"
            />
        </ul>

        <!-- Tab content -->
        <slot v-if="!noContent" name="tabContent">
            <slds-vertical-tab-content
                v-for="tab in tabs"
                :key="tab.name"
                :is-active="active === tab.name"
                :name="tab.name"
            >
                <slot :name="tab.name"/>
            </slds-vertical-tab-content>
        </slot>

        <!-- Content -->
        <slot v-else name="content"/>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import SldsVerticalTab from "./slds-vertical-tab.vue"
import VerticalTab from "./vertical-tab"
import { EVENTS } from "../../constants"
import SldsVerticalTabContent from "./slds-vertical-tab-content.vue"

export default defineComponent({
    name: "slds-vertical-tabs",

    components: { SldsVerticalTabContent, SldsVerticalTab },

    props: {
        /**
         * Active tab name.
         */
        active: String,

        /**
         * Indicates when the tabs have no content.
         */
        noContent: Boolean,

        /**
         * Vertical tabs.
         */
        tabs: { type: Array as PropType<VerticalTab[]>, default: () => [] as VerticalTab[] },
    },

    methods: {
        /**
         * Handle click tab.
         * @param tabName Tab name.
         */
        handleClickTab(tabName: string) {
            this.$emit(EVENTS.CLICK_TAB, tabName)
        },
    },
})
</script>

<style scoped lang="scss">


</style>

