<template>
    <div id="app" :class="{'has-trial-bar': trial.showBar, 'has-alert': alert.show}">

        <!-- Trial bar -->
        <slds-trial-bar v-if="trial.showBar" :days-left="trial.daysLeft"/>

        <!-- Alert -->
        <slds-alert
            :theme="alert.theme"
            :icon-category="alert.iconCategory"
            :icon-name="alert.iconName"
            :message="alert.message"
            :class="[{'slds-hide': !alert.show}]"
            @close="closeAlert"/>

        <!-- Global header -->
        <slds-global-header name="Arcthos"/>

        <!-- Global navigation -->
        <slds-global-navigation
            app-name="Vuetning"
            :tabs="tabs"
            :sub-tabs="subTabs"
            :overflowed-tabs="overflowedTabs"
            :overflowed-sub-tabs="overflowedSubTabs"
            @close="onCloseTab"/>

        <!-- Brand band -->
        <slds-brand-band theme="default"/>

        <!-- Global content -->
        <div class="slds-global-content">
            <slds-view/>
        </div>
    </div>
</template>

<script>
    import SldsView from './views/Counter'

    export default {
        name: 'App',
        components: {
            SldsView,
        },
        data() {
            return {
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
                tabs: [],
                subTabsByTabId: [],
                overflowedSubTabsByTabId: [],
                overflowedTabs: [],
            }
        },
        computed: {
            subTabs() {
                if (this.tabs.length == 0) return [];

                let selectedTabSubTabs = this.subTabsByTabId.find(element => {
                    return element.tabId === this.tabs[this.tabs.length - 1].id
                });

                if (selectedTabSubTabs === undefined) return [];

                return selectedTabSubTabs.subTabs;
            },
            overflowedSubTabs() {
                if (this.tabs.length == 0) return [];

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
    $default_height: 90px;
    $trial_bar_height: 50px;
    $alert_height: 35px;
    $background-color: rgb(176, 196, 223);
    $global-padding: 12px;
    $table-view-footer: 48px;

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html {
        background-color: $background-color !important;
    }

    body {
        overflow: hidden;
    }

    .slds-notify_container,
    .slds-notification-container {
        margin-top: $default_height;
    }

    .slds-global-content {
        position: fixed;
        height: calc(100% - #{$default_height});
        width: 100%;
        top: $default_height;
        left: 0;
        padding: $global-padding;
        overflow: auto;

        main {

            &.absolute,
            &.table-view {
                position: fixed;
                width: calc(100% - (2 * #{$global-padding}));
                top: calc(#{$default_height} + #{$global-padding});
                left: $global-padding;
            }

            &.absolute {
                height: calc(100% - #{$default_height} - (2 * #{$global-padding}));
            }

            &.table-view {
                height: calc(100% - #{$default_height} - #{$global-padding});

                .table-view_body {
                    height: calc(100% - #{$default_height} - #{$global-padding} - #{$table-view-footer});
                }
            }
        }
    }

    .has-trial-bar {

        .slds-notify_container,
        .slds-notification-container {
            margin-top: calc(#{$default_height} + #{$trial_bar_height});
        }

        .slds-global-content {
            height: calc(100% - #{$default_height} - #{$trial_bar_height});
            top: calc(#{$default_height} + #{$trial_bar_height});

            main {
                &.absolute,
                &.table-view {
                    top: calc(#{$default_height} + #{$global-padding} + #{$trial_bar_height});
                }

                &.absolute {
                    height: calc(100% - #{$default_height} - (2 * #{$global-padding}) - #{$trial_bar_height});
                }

                &.table-view {
                    height: calc(100% - #{$default_height} - #{$global-padding} - #{$trial_bar_height});
                }
            }
        }
    }

    .has-alert {

        .slds-notify_container,
        .slds-notification-container {
            margin-top: calc(#{$default_height} + #{$alert_height});
        }

        .slds-global-content {
            height: calc(100% - #{$default_height} - #{$alert_height});
            top: calc(#{$default_height} + #{$alert_height});

            main {
                &.absolute,
                &.table-view {
                    top: calc(#{$default_height} + #{$global-padding} + #{$alert_height});
                }

                &.absolute {
                    height: calc(100% - #{$default_height} - (2 * #{$global-padding}) - #{$alert_height});
                }

                &.table-view {
                    height: calc(100% - #{$default_height} - #{$global-padding} - #{$alert_height});
                }
            }
        }
    }

    .has-trial-bar.has-alert {

        .slds-notify_container,
        .slds-notification-container {
            margin-top: calc(#{$default_height} + #{$trial_bar_height} + #{$alert_height});
        }

        .slds-global-content {
            height: calc(100% - #{$default_height} - #{$trial_bar_height} - #{$alert_height});
            top: calc(#{$default_height} + #{$trial_bar_height} + #{$alert_height});

            main {
                &.absolute,
                &.table-view {
                    top: calc(#{$default_height} + #{$global-padding} + #{$trial_bar_height} + #{$alert_height});
                }

                &.absolute {
                    height: calc(100% - #{$default_height} - (2 * #{$global-padding}) - #{$trial_bar_height} - #{$alert_height});
                }

                &.table-view {
                    height: calc(100% - #{$default_height} - #{$global-padding} - #{$trial_bar_height} - #{$alert_height});
                }
            }
        }
    }
</style>
