<template>
    <li
        class="slds-sub-tabs__item slds-tabs_default__overflow-button slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

        <!-- Identification -->
        <a role="tab" :title="`More (${overflowedSubTabs.length})`" class="slds-context-bar__label-action" @click="toggleDropdown">

            <!-- Indicator -->
            <span class="slds-indicator-container"/>

            <!-- Text -->
            <span class="slds-truncate">
                {{ `More (${overflowedSubTabs.length})` }}
            </span>

        </a>

        <!-- Dropdown menu -->
        <div class="slds-context-bar__icon-action slds-p-left_none slds-p-right_x-small">
            <svg class="slds-button__icon slds-button__icon_small slds-button__icon_right">
                <slds-svg icon="utility:chevrondown"/>
            </svg>
        </div>

        <!-- More tabs dropdown -->
        <transition name="dropdown">
            <div v-if="isDropdownActive" v-click-outside="away" class="slds-dropdown slds-dropdown_right">
                <ul class="slds-dropdown__list" role="menu">
                    <li
                        v-for="subTab in overflowedSubTabs"
                        :key="subTab.id"
                        class="slds-dropdown__item"
                        @click="onClick(subTab)">

                        <a role="menuitem" tabindex="-1">
                            <span class="slds-truncate" :title="subTab.label">

                                <span class="slds-indicator-container"/>

                                <span class="slds-icon_container">
                                    <slds-svg :icon="subTab.icon" standard-format class="slds-icon slds-icon_small slds-icon-text-default"/>
                                </span>

                                <span>
                                    {{ subTab.label }}
                                </span>

                            </span>
                        </a>

                    </li>
                </ul>
            </div>
        </transition>

    </li>
</template>

<script>
import ClickOutside from '@/directives/click-outside/index'

export default {
    directives: {
        ClickOutside
    },

    props: {
        overflowedSubTabs: {
            type: Array,
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

        onClick(subTab) {
            this.isDropdownActive = false;
            this.$emit('click', subTab);
        },

        toggleDropdown() {
            this.isDropdownActive = !this.isDropdownActive;
        },
    },
}
</script>

<style scoped lang="scss">
.slds-sub-tabs__item {
    width: 7.5rem;
    max-width: 7.5rem;
    background: white;
}

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
