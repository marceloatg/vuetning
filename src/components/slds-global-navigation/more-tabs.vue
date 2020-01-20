<template>
    <li class="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

        <!-- More tabs button -->
        <button class="slds-button slds-context-bar__label-action" :title="`More (${overflowedTabs.length})`" @click="toggleDropdown">

            <span class="slds-indicator-container"/>

            <span class="slds-truncate">
                {{ `More (${overflowedTabs.length})` }}
            </span>

            <svg class="slds-button__icon slds-button__icon_small slds-button__icon_right">
                <slds-svg icon="utility:chevrondown"/>
            </svg>

        </button>

        <!-- More tabs dropdown -->
        <div v-if="isDropdownActive" v-on-clickaway="away" class="slds-dropdown slds-dropdown_right">
            <ul class="slds-dropdown__list" role="menu">
                <li
                    v-for="(tab, index) in overflowedTabs"
                    :key="tab.id"
                    class="slds-dropdown__item"
                    @click="onClick(index, tab)">

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
