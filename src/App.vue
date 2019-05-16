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
            :overflowed-tabs="overflowedTabs"
            @close="onCloseTab"/>

        <!-- Brand band -->
        <slds-brand-band theme="default"/>

        <!-- Global content -->
        <div class="slds-global-content">
            <main class="slds-container_small slds-container_center">
                <article class="slds-card">

                    <div class="slds-card__header slds-grid">
                        <header class="slds-media slds-media_center slds-has-flexi-truncate">
                            <div class="slds-media__figure">
                                <span class="slds-icon_container slds-icon-standard-account" title="account">
                                    <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                        <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"/>
                                    </svg>
                                    <span class="slds-assistive-text">account</span>
                                </span>
                            </div>
                            <div class="slds-media__body">
                                <h2 class="slds-card__header-title">
                                    <a href="javascript:void(0);" class="slds-card__header-link slds-truncate">
                                        <span>Tabs</span>
                                    </a>
                                </h2>
                            </div>
                        </header>
                    </div>

                    <div class="slds-card__body slds-card__body_inner">
                        <div class="slds-form">
                            <slds-input v-model="tabTitle" label="Title"/>
                            <slds-input v-model="tabIcon" label="Icon" default="standard:home"/>
                            <slds-checkbox v-model="hasSubTas" label="Has sub tabs?"/>
                            <slds-checkbox v-model="isOverflowed" label="Overflowed?"/>
                        </div>
                    </div>

                    <footer class="slds-card__footer">
                        <slds-button label="Clear" @click="clearTabs"/>
                        <slds-button label="Add tab" variant="brand" @click="addTab"/>
                    </footer>

                </article>
            </main>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'App',
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
                overflowedTabs: [],
            }
        },
        methods: {
            addTab() {
                for (const tab of this.tabs) tab.isActive = false;

                let subTabs = [];
                if (this.hasSubTas) subTabs.push({
                    id: Date.now(),
                    title: this.tabTitle,
                    icon: this.tabIcon,
                    isActive: true,
                });

                if (this.isOverflowed) {
                    this.overflowedTabs.push({
                        id: Date.now(),
                        title: this.tabTitle,
                        icon: this.tabIcon,
                        isActive: true,
                        subTabs: subTabs,
                    })
                }
                else {
                    this.tabs.push({
                        id: Date.now(),
                        title: this.tabTitle,
                        icon: this.tabIcon,
                        isActive: true,
                        subTabs: subTabs,
                    })
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
    $default_height: 130px;
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
