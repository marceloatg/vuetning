<template>
    <div class="slds-trial-header slds-grid">

        <!-- Left grid -->
        <div class="slds-grid">

            <button class="slds-button slds-m-right_small">
                Take the salesforce tour
            </button>

            <div class="slds-grid slds-dropdown-trigger slds-dropdown-trigger_click">
                <button class="slds-button" aria-haspopup="true">
                    <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#right"/>
                    </svg>
                    Choose your tour
                </button>
                <div class="slds-dropdown slds-dropdown_inverse slds-dropdown_left">
                    <ul class="slds-dropdown__list" role="menu">
                        <li class="slds-dropdown__item slds-is-selected" role="presentation">
                            <a role="menuitem" tabindex="0">
                                <span class="slds-truncate" title="Completed: Conquer Your Cases">
                                    <svg class="slds-icon slds-icon_selected slds-icon_x-small slds-m-right_x-small" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                    </svg>
                                    <span class="slds-assistive-text">Completed:</span> Conquer Your Cases</span>
                            </a>
                        </li>
                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1">
                                <span class="slds-truncate" title="Automate For Speed">
                                    <svg class="slds-icon slds-icon_selected slds-icon_x-small slds-m-right_x-small" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                    </svg>
                                    Automate For Speed</span>
                            </a>
                        </li>
                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1">
                                <span class="slds-truncate" title="Share Your Knowledge">
                                    <svg class="slds-icon slds-icon_selected slds-icon_x-small slds-m-right_x-small" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                    </svg>
                                    Share Your Knowledge</span>
                            </a>
                        </li>
                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1">
                                <span class="slds-truncate" title="Finish it up in a Flash">
                                    <svg class="slds-icon slds-icon_selected slds-icon_x-small slds-m-right_x-small" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                    </svg>
                                    Finish it up in a Flash</span>
                            </a>
                        </li>
                        <li class="slds-has-divider_top-space" role="separator"/>
                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem">
                                <span class="slds-truncate" title="Import Contacts and Accounts">
                                    <svg class="slds-icon slds-icon_x-small slds-m-right_x-small" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#upload"/>
                                    </svg>
                                    Import Contacts and Accounts</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <!-- Right grid -->
        <div class="slds-grid slds-grid_vertical-align-center slds-col_bump-left">

            <span class="slds-box slds-box_xx-small slds-theme_default">{{ daysLeft }}</span>

            <span class="slds-m-horizontal_x-small">Days left in trial</span>

            <slds-button label="Subscribe Now" success @click="onClickSubscribe"/>

        </div>

    </div>
</template>

<script>
import SldsButton from '../slds-button/button'

export default {
    name: 'SldsTrialBar',
    components: {
        SldsButton,
    },
    props: {
        daysLeft: {
            type: Number,
            required: true
        }
    },
    methods: {
        onClickSubscribe() {
            this.$emit('subscribe')
        }
    }
}
</script>

<style scoped lang="scss">

</style>
