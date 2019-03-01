<template>
    <div id="app" :class="{'has-trial-bar': trial.showBar, 'has-alert': alert.show}">

        <!-- Trial bar -->
        <slds-trial-bar :days-left="trial.daysLeft" v-if="trial.showBar"/>

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
        <slds-global-navigation app-name="Vuetning"/>

        <!-- Notifications -->
        <div class="slds-notification-container">
            <slds-notification
                v-for="(notification, index) in notifications"
                :icon-class="notification.iconClass"
                :icon-name="notification.iconName"
                :key="notification.name"
                :message="notification.message"
                :name="notification.name"
                :subject="notification.subject"
                @close="onCloseNotification(index)"/>
        </div>

        <!-- Brand band -->
        <slds-brand-band theme="default"/>

        <!-- Global content -->
        <div class="slds-global-content">
            <slds-view/>
        </div>

    </div>
</template>

<script>
    import SldsView from "./views/Components";

    export default {
        name: 'App',
        components: {
            SldsView
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
                notifications: [
                    {
                        name: '7a06e46e-21e8-4197-8ebf-ba8893e24d51',
                        iconName: 'standard:event',
                        subject: 'First',
                        message: 'Event at 11:00am on Jan 8',
                    },
                    {
                        name: 'd91b85b1-d73a-462b-9373-0761b66a6e3f',
                        iconClass: 'slds-icon-standard-quick-text',
                        iconName: 'standard:partners',
                        subject: 'Second',
                        message: 'Event at 11:00am on Jan 8',
                    },
                    {
                        name: '3ed946d7-f9d2-4944-91e9-98b6fff3f3af',
                        iconName: 'standard:task',
                        subject: 'Third',
                        message: 'Event at 11:00am on Jan 8',
                    },
                    {
                        name: '99cb0010-d946-4089-aded-cdfcf18264a3',
                        iconName: 'standard:event',
                        subject: 'Fourth',
                        message: 'Event at 11:00am on Jan 8',
                    },
                ],
            }
        },
        methods: {
            closeAlert() {
                this.alert.show = false;
            },
            onCloseNotification(index) {
                this.notifications.splice(index, 1);
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