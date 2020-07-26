<template>
    <li
        class="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

        <!-- Identification -->
        <a role="tab" :title="`More (${overflowedTabs.length})`" class="slds-context-bar__label-action" @click="toggleDropdown">

            <!-- Indicator -->
            <span class="slds-indicator-container"/>

            <!-- Text -->
            <span class="slds-truncate">
                {{ `More (${overflowedTabs.length})` }}
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
            <div v-if="isDropdownActive" v-on-clickaway="away" class="slds-dropdown slds-dropdown_right">
                <ul class="slds-dropdown__list" role="menu">
                    <li
                        v-for="tab in overflowedTabs"
                        :key="tab.id"
                        class="slds-dropdown__item"
                        @click="onClick(tab)">

                        <a role="menuitem" tabindex="-1">
                            <span class="slds-truncate" :title="tab.title">

                                <span class="slds-indicator-container"/>

                                <span class="slds-icon_container">
                                    <slds-svg :icon="tab.icon" standard class="slds-icon slds-icon_small slds-icon-text-default"/>
                                </span>

                                <span>
                                    {{ tab.title }}
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
    import {mixin as clickaway} from 'vue-clickaway'

    export default {
        mixins: [clickaway],

        props: {
            overflowedTabs: {
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

            onClick(tab) {
                this.isDropdownActive = false;
                this.$emit('click', tab);
            },

            toggleDropdown() {
                this.isDropdownActive = !this.isDropdownActive;
            },
        },
    }
</script>

<style scoped lang="scss">
    .slds-context-bar__item {
        width: 7.5rem;
        max-width: 7.5rem;
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
