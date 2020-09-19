<template>
    <div id="app" ref="viewport" class="slds-viewport">

        <!-- Trial bar -->
        <slds-trial-bar v-if="showTrialBar" :days-left="30"/>

        <!-- Alert -->
        <slds-alert
            v-if="showAlertBar"
            :theme="alert.theme"
            :icon-category="alert.iconCategory"
            :icon-name="alert.iconName"
            :message="alert.message"/>

        <slds-modal v-if="modal" @close="modal = false">

            <template #header>
                <h2 class="slds-text-heading_medium slds-hyphenate">
                    Vuetning
                </h2>
            </template>

            <template #content>
                Lorem ipsum dolor sit amet.
                <slds-input v-model="input" label="Foo"/>
            </template>

            <template #footer>

                <!-- Cancel button -->
                <slds-button label="Cancel" neutral @click="modal = false"/>

                <!-- Save button -->
                <slds-button label="Delete" brand/>

            </template>

        </slds-modal>

        <!-- Global header -->
        <slds-global-header name="Blue Bear"/>

        <!-- Global navigation -->
        <slds-global-navigation app-name="Dashboard" :tabs="[]" :sub-tabs="[]"/>

        <!-- Brand band -->
        <slds-brand-band/>

        <!-- Global content -->
        <div class="slds-global-content">
            <slds-view @modal="modal = true"/>
        </div>

    </div>
</template>

<script>
import SldsView from './views/Input'

export default {
    name: 'App',
    components: {
        SldsView,
    },
    data() {
        return {
            modal: false,
            input: null,
            trial: {
                showBar: false,
            },
            alert: {
                show: false,
                theme: 'offline',
                iconCategory: "utility",
                iconName: "offline",
                message: 'Oops, it looks like you\'re offline. Check your internet connection and try again.'
            },
            showDockedComposer: true,
            isOverflowed: null,
            hasSubTas: null,
            tabIcon: null,
            tabTitle: null,
            tabs: [{
                id: '1',
                icon: 'utility:add',
                title: 'Foo',
                isActive: false,
                subTabs: [],
            }, {
                id: '2',
                icon: 'utility:settings',
                title: 'General Settings',
                isActive: true,
                subTabs: [
                    {id: 'a', icon: 'utility:settings', title: 'General Settings', isActive: true},
                    {id: 'b', icon: 'utility:user', title: 'User Settings', isActive: false},
                ],
            }],
            showAlertBar: false,
            showTrialBar: false,
            subTabsByTabId: [],
            overflowedSubTabsByTabId: [],
            overflowedTabs: [],
        }
    },
    computed: {
        subTabs() {
            if (this.tabs.length === 0) return [];
            const activeTab = this.tabs.find(tab => tab.isActive)
            if (activeTab) return activeTab.subTabs;
            return [];
        },
        overflowedSubTabs() {
            if (this.tabs.length === 0) return [];

            let selectedTabSubTabs = this.overflowedSubTabsByTabId.find(element => {
                return element.tabId === this.tabs[this.tabs.length - 1].id
            });

            if (selectedTabSubTabs === undefined) return [];

            return selectedTabSubTabs.overflowedSubTabs;
        },
    },
    methods: {
        addTab() {
            for (const tab of this.tabs) tab.isActive = false;

            let subTabs = [];
            if (this.hasSubTas) {
                subTabs.push({
                    id: Date.now(),
                    title: this.tabTitle,
                    icon: this.tabIcon,
                    isActive: true,
                    isMain: true,
                });
            }

            if (this.isOverflowed && !this.hasSubTas) {
                this.overflowedTabs.push({
                    id: Date.now(),
                    title: this.tabTitle,
                    icon: this.tabIcon,
                    isActive: true,
                })
            }
            else {
                let tab = {
                    id: Date.now(),
                    title: this.tabTitle,
                    icon: this.tabIcon,
                    isActive: true,
                };

                this.tabs.push(tab);

                if (this.hasSubTas && !this.isOverflowed) {
                    this.subTabsByTabId.push({
                        tabId: tab.id,
                        subTabs: subTabs
                    });
                }
                else if (this.hasSubTas && this.isOverflowed) {
                    this.subTabsByTabId.push({
                        tabId: tab.id,
                        subTabs: subTabs
                    });
                    this.overflowedSubTabsByTabId.push({
                        tabId: tab.id,
                        overflowedSubTabs: subTabs
                    });
                }

            }

        },
        clearTabs() {
            this.tabs.splice(0, this.tabs.length);
        },
        onCloseTab(index) {
            this.tabs.splice(index, 1);
        },
        closeAlert() {
            this.alert.show = false;
        },
        closeDockedComposer() {
            this.showDockedComposer = false;
        },
    },
}
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.slds-viewport {
    --background-color: rgb(176, 196, 223);
    --global-padding: 12px;
    --trial-bar-height: 0px;
    --alert-height: 0px;
    --header-height: 40px;
    --navigation-height: 50px;

    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1;
    background-color: var(--background-color) !important;
}

.slds-notify_container {
    top: var(--trial-bar-height) - var(--alert-height) - var(--header-height) - var(--navigation-height);
}

.slds-global-content {
    position: relative;
    height: calc(100% - var(--trial-bar-height) - var(--alert-height) - var(--header-height) - var(--navigation-height));
    width: 100%;
    overflow: auto;

    main {
        padding: 12px;

        &.absolute {
            position: absolute;
            height: 100%;
            width: 100%;
            overflow: hidden;
        }
    }
}

</style>
