<template>
    <li
        class="slds-context-bar__item slds-context-bar__item_tab"
        :class="[{'slds-is-active': isActive}, {'slds-has-sub-tabs': hasSubTabs}]"
        role="presentation"
        @click="onClickTab"
        @click.middle="onClickClose">

        <!-- Identification -->
        <a role="tab" :title="title" class="slds-context-bar__label-action">

            <!-- Indicator -->
            <span class="slds-indicator-container"/>

            <!-- Icon -->
            <span class="slds-icon_container">
                <slds-svg :icon="icon" standard-format class="slds-icon slds-icon_small slds-icon-text-default"/>
            </span>

            <!-- Text -->
            <span class="slds-truncate">
                {{ title }}
            </span>

        </a>

        <!-- Dropdown menu -->
        <div class="slds-context-bar__icon-action slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-p-left_none slds-p-right_none slds-is-open">

            <slds-button-icon
                icon="utility:chevrondown"
                bare
                x-small
                class="slds-button_icon-current-color"
                @click.stop="toggleDropdown"/>

            <transition name="dropdown">
                <div v-if="isDropdownActive" v-on-clickaway="away" class="slds-dropdown slds-dropdown_right">
                    <ul class="slds-dropdown__list" role="menu">
                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1" @click.prevent="onClickRefreshTab">
                                <span class="slds-truncate" title="Refresh Tab">Refresh Tab</span>
                            </a>
                        </li>
                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1" @click.prevent="onClickCloseAll">
                                <span class="slds-truncate" title="Close All">Close All</span>
                            </a>
                        </li>
                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1" @click.prevent="onClickClose">
                                <span class="slds-truncate" title="Close">Close</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </transition>

        </div>

        <!-- Close button -->
        <div class="slds-context-bar__icon-action slds-col_bump-left slds-p-left_none">
            <slds-button-icon
                icon="utility:close"
                x-small
                bare
                title="Close"
                class="slds-button_icon-current-color"
                @click.stop="onClickClose"/>
        </div>

    </li>
</template>

<script>
    import {mixin as clickaway} from 'vue-clickaway'

    export default {
        mixins: [
            clickaway
        ],
        props: {
            hasSubTabs: {
                type: Boolean,
                default: false,
            },
            icon: {
                type: String,
                required: true,
            },
            isActive: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                isDropdownActive: false,
            }
        },
        methods: {
            away() {
                this.isDropdownActive = false;
            },
            onClickTab() {
                this.$emit('click');
            },
            onClickRefreshTab() {
                this.$emit('refresh');
                this.isDropdownActive = false;
            },
            onClickCloseAll() {
                this.$emit('closeAll');
            },
            onClickClose() {
                this.$emit('close');
            },
            toggleDropdown() {
                this.isDropdownActive = !this.isDropdownActive;
            }
        },
    }
</script>

<style scoped lang="scss">
    .dropdown-enter,
    .dropdown-leave-to {
        opacity: 0 !important;
        transform: translateY(5%) !important;
    }

    .dropdown-enter-active,
    .dropdown-leave-active {
        transition: transform .3s, opacity .15s !important;
    }
</style>
