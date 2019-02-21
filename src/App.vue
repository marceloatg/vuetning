<template>
    <div id="app" :class="{'has-trial-bar': trial.showBar, 'has-alert': alert.show}">

        <!-- Trial bar -->
        <slds-trial-bar :daysLeft="trial.daysLeft" v-if="trial.showBar"/>

        <!-- Alert -->
        <slds-alert :theme="alert.theme"
                    :icon-category="alert.iconCategory"
                    :icon-name="alert.iconName"
                    :message="alert.message"
                    :class="[{'slds-hide': !alert.show}]"
                    @close="closeAlert"/>

        <!-- Global header -->
        <slds-global-header name="Arcthos"/>

        <!-- Global navigation -->
        <slds-global-navigation appName="Vuetning"/>

        <!-- Brand band -->
        <slds-brand-band theme="default"/>

        <!-- Global content -->
        <div class="slds-global-content">
            <picklists/>
        </div>

    </div>
</template>

<script>
    //import Components from "./views/Components";
    import Picklists from "./views/Picklists";

    export default {
        name: 'app',
        components: {
            //Components,
            Picklists
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
            }
        },
        methods: {
            closeAlert() {
                this.alert.show = false;
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

    .has-trial-bar .slds-global-content {
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

    .has-alert .slds-global-content {
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

    .has-trial-bar.has-alert .slds-global-content {
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
</style>