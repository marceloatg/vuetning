<template>
    <div class="slds-tabs_scoped">

        <!-- Tabs -->
        <ul class="slds-tabs_scoped__nav" role="tablist">
            <slot name="tabs">

                <!--  Automatically generated tabs -->
                <slds-scoped-tab
                    v-for="tab in $data.$_tabs"
                    :id="tab.key"
                    :key="tab.key"
                    :label="tab.label"
                    :is-active="$data.$_activeTab === tab.name"
                    @click="onClickTab(tab.name)"
                />

                <!-- Overflow -->
                <!-- TODO: Implement overflow -->

            </slot>
        </ul>

        <template v-if="!noContent">
            <slot name="content">
                <slds-scoped-tab-content
                    v-for="tab in $data.$_tabs"
                    :id="tab.key"
                    :key="tab.key"
                    :is-active="$data.$_activeTab === tab.name"
                >
                    <slot :name="tab.name"/>
                </slds-scoped-tab-content>
            </slot>
        </template>

    </div>
</template>

<script>
import SldsScopedTab from '@/components/slds-scoped-tabs/scoped-tab'
import SldsScopedTabContent from '@/components/slds-scoped-tabs/scoped-tab-content'
import ScopedTab from '@/components/slds-scoped-tabs/scoped-tab-class'

export default {
    name: 'SldsScopedTabs',

    components: {
        SldsScopedTabContent,
        SldsScopedTab,
    },

    props: {
        activeTab: String,
        noContent: Boolean,
        tabs: {type: Array, required: true},
    },

    data() {
        return {
            $_activeTab: null,
            $_tabs: []
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

            this.$data.$_activeTab = activeTab
        },

        parseTabs() {
            this.$data.$_tabs.splice(0, this.$data.$_tabs.length)
            if (this.tabs == null || this.tabs.length === 0) return

            for (const tab of this.tabs) {
                if (typeof tab === 'string') {
                    this.$data.$_tabs.push(new ScopedTab(tab))
                }
                else if (typeof tab === 'object') {
                    const newTab = new ScopedTab(tab.label, tab.name)
                    newTab.icon = tab.icon
                    newTab.error = tab.error || false

                    this.$data.$_tabs.push(newTab)
                }
                else {
                    throw'[slds-scoped-tabs] tabs must be of type string or a valid tab object.'
                }
            }
        }
    }
}
</script>
