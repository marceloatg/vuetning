<template>
    <li class="slds-tabs_default__item slds-sub-tabs__item slds-tabs_default__overflow-button">
        <div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

            <!-- More tabs button -->
            <button class="slds-button" :title="`More (${overflowedSubTabs.length})`" @click="toggleDropdown">

                <span class="slds-indicator-container"/>

                <span class="slds-truncate">
                    {{ `More (${overflowedSubTabs.length})` }}
                </span>

                <svg class="slds-button__icon slds-button__icon_small slds-button__icon_right">
                    <slds-svg icon="utility:chevrondown"/>
                </svg>

            </button>

            <!-- More tabs dropdown -->
            <div v-if="isDropdownActive" v-on-clickaway="away" class="slds-dropdown slds-dropdown_right">
                <ul class="slds-dropdown__list" role="menu">
                    <li
                        v-for="(subTab, index) in overflowedSubTabs"
                        :key="subTab.id"
                        class="slds-dropdown__item slds-has-notification"
                        @click="onClick(index, subTab)">

                        <a role="menuitem" tabindex="-1">
                            <span class="slds-truncate" :title="subTab.title">

                                <span class="slds-indicator-container"/>
                                <span class="slds-indicator-container"/>

                                <span class="slds-icon_container">
                                    <slds-svg :icon="subTab.icon" standard class="slds-icon slds-icon_small slds-icon-text-default"/>
                                </span>

                                <span>
                                    {{ subTab.title }}
                                </span>

                            </span>
                        </a>

                    </li>
                </ul>
            </div>

        </div>
    </li>
</template>

<script>
    import {mixin as clickaway} from 'vue-clickaway'

    export default {
        mixins: [clickaway],
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
            onClick(index, tab) {
                this.isDropdownActive = false;
                this.$emit('click', index, tab);
            },
            toggleDropdown() {
                this.isDropdownActive = !this.isDropdownActive;
            },
        },
    }
</script>
