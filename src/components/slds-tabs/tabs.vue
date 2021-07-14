<template>
    <div class="slds-tabs_default" :class="tabsClass">

        <!-- Tabs -->
        <ul class="slds-tabs_default__nav" role="tablist">
            <slot name="tabs">

                <!--  Automatically generated tabs -->
                <slds-tab
                    v-for="tab in $data.$_tabs"
                    :id="tab.key"
                    :key="tab.key"
                    :label="tab.label"
                    :icon="tab.icon"
                    :error="tab.error"
                    :is-active="$data.$_activeTab === tab.name"
                    @click="onClickTab(tab.name)"
                />

                <!-- Overflow -->
                <!-- TODO: Implement overflow -->

            </slot>
        </ul>

        <!-- Content -->
        <template v-if="!noContent">
            <slot name="content">
                <slds-tab-content
                    v-for="tab in $data.$_tabs"
                    :id="tab.key"
                    :key="tab.key"
                    :is-active="$data.$_activeTab === tab.name"
                >
                    <slot :name="tab.name"/>
                </slds-tab-content>
            </slot>
        </template>

    </div>
</template>

<script>
import SldsTabContent from "@/components/slds-tabs/tab-content";
import Tab from './tab-class'
import SldsTab from "@/components/slds-tabs/tab";
import {kebabCase} from "@/utils/string-utils";

export default {
    name: 'SldsTabs',

    components: {
        SldsTab,
        SldsTabContent
    },

    props: {
        activeTab: String,
        tabs: {type: Array, required: true},
        large: Boolean,
        medium: Boolean,
        noContent: Boolean,
    },

    data() {
        return {
            $_activeTab: null,
            $_tabs: []
        }
    },

    computed: {
        tabsClass() {
            if (this.large) return 'slds-tabs_large'
            if (this.medium) return 'slds-tabs_medium'
            return null
        }
    },

    watch: {
        activeTab() {
            this.parseActiveTab()
        },

        tabs: {
            deep: true,
            handler() {
                this.parseTabs()
                this.parseActiveTab()
            }
        }
    },

    created() {
        this.parseTabs()
        this.parseActiveTab()
    },

    methods: {
        onClickTab(tabKey) {
            this.parseActiveTab(tabKey)
            this.$emit('click', this.$data.$_activeTab)
        },

        parseActiveTab(activeTab = null) {
            if (activeTab == null) {
                if (this.activeTab && this.$data.$_tabs.find(tab => tab.name === this.activeTab)) {
                    activeTab = this.activeTab
                }
                else if (this.$data.$_activeTab && this.$data.$_tabs.find(tab => tab.name === this.$data.$_activeTab)) {
                    activeTab = this.$data.$_activeTab
                }
                else {
                    activeTab = this.$data.$_tabs[0].name
                }
            }

            this.$data.$_activeTab = kebabCase(activeTab)
        },

        parseTabs() {
            this.$data.$_tabs.splice(0, this.$data.$_tabs.length)
            if (this.tabs == null || this.tabs.length === 0) return

            for (const tab of this.tabs) {
                if (typeof tab === 'string') {
                    this.$data.$_tabs.push(new Tab(tab))
                }
                else if (typeof tab === 'object') {
                    const newTab = new Tab(tab.label, tab.name)
                    newTab.icon = tab.icon
                    newTab.error = tab.error || false

                    this.$data.$_tabs.push(newTab)
                }
                else {
                    throw`[slds-tabs] tabs must be of type string or a valid tab object.`
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
li {
    cursor: pointer;
}
</style>
