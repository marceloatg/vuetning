<template>
    <li
        class="slds-tabs_default__item slds-sub-tabs__item slds-grid slds-grid_vertical-align-center"
        :class="[{'slds-active': isActive}]"
        role="presentation"
        @click.prevent="onClickTab"
        @click.middle="onClickClose">

        <!-- Identification -->
        <a role="tab" class="slds-tabs_default__link slds-p-horizontal_xx-small" :title="title">

            <!-- Indicator -->
            <span class="slds-indicator-container"/>

            <!-- Icon -->
            <span class="slds-icon_container">
                <slds-svg :icon="icon" :class="adjustmentClass" class="slds-icon slds-icon_small slds-icon-text-default"/>
            </span>

            <!-- Text -->
            <span class="slds-truncate">
                {{ title }}
            </span>

        </a>

        <div class="slds-col_bump-left slds-grid">
            <div class="slds-context-bar__icon-action slds-size_1-of-2  slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-p-left_none slds-p-right_none slds-is-open">
                <slds-button-icon
                    icon-name="utility:chevrondown"
                    size="x-small"
                    container="bare"
                    title="Actions"
                    class="slds-button_icon-current-color"
                    @click="toggleDropdown"/>

                <div v-if="isDropdownActive" v-on-clickaway="away" class="slds-dropdown slds-dropdown_right">
                    <ul class="slds-dropdown__list" role="menu">
                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1" @click.prevent="onClickRefreshTab">
                                <span class="slds-truncate" title="Refresh Tab">Refresh Tab</span>
                            </a>
                        </li>
                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1" @click.prevent="onClickSetAsWorkspaceTab">
                                <span class="slds-truncate" title="Set as workspace tab">Set As Workspace Tab</span>
                            </a>
                        </li>
                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1" @click.prevent="onClickClose">
                                <span class="slds-truncate" title="Close">Close</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Close button -->
            <div v-if="!isMain" class=" slds-p-left_none slds-size_1-of-2 slds-p-right_none">
                <slds-button-icon
                    icon-name="utility:close"
                    size="x-small"
                    container="bare"
                    title="Close"
                    class="slds-button_icon-current-color"
                    @click.prevent="onClickClose"/>
            </div>
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
            icon: {
                type: String,
                required: true,
            },
            isActive: {
                type: Boolean,
                default: false,
            },
            isMain: {
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
        computed: {
            adjustmentClass() {
                const icon = this.icon;
                if (icon.startsWith('utility')) return 'utility-category-adjustment';
                return null;
            },
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
            onClickSetAsWorkspaceTab() {
                this.$emit('workspace');
                this.isDropdownActive = false;
            },
            onClickClose() {
                this.$emit('close');
                this.isDropdownActive = false;
            },
            toggleDropdown() {
                this.isDropdownActive = !this.isDropdownActive;
            }
        },
    }
</script>


<style scoped lang="scss">
    .slds-sub-tabs__item {
        min-width: 12rem;
        width: 12rem;
        max-width: 15rem;
    }
</style>
