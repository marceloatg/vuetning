<template>
    <li :class="itemClassNames" role="presentation" @click.stop.middle="handleClickClose">

        <!-- Identification -->
        <a role="tab" :title="label" class="slds-context-bar__label-action">

            <!-- Indicator -->
            <span data-slds-tab-indicator class="slds-indicator-container"/>

            <!-- Icon -->
            <span data-slds-tab-icon class="slds-icon_container">
                <slds-svg :icon="iconName" standard-format class="slds-icon slds-icon_small slds-icon-text-default"/>
            </span>

            <!-- Text -->
            <span data-slds-tab-label class="slds-truncate">
                {{ label }}
            </span>

        </a>

        <!-- Dropdown menu -->
        <div
            class="slds-context-bar__icon-action slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-p-left_none slds-p-right_none slds-is-open"
        >

            <slds-button-icon
                icon-name="utility:chevrondown"
                x-small
                class="slds-button_icon-current-color"
                @click.stop="toggleDropdown"
            />

            <transition name="dropdown">
                <div v-if="isDropdownActive" v-click-outside="away" class="slds-dropdown slds-dropdown_right">
                    <ul class="slds-dropdown__list" role="menu">

                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1" @click.prevent="handleClickRefreshTab">
                                <span class="slds-truncate" title="Refresh Tab">Refresh Tab</span>
                            </a>
                        </li>

                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1" @click.prevent="handleClickCloseAll">
                                <span class="slds-truncate" title="Close All">Close All</span>
                            </a>
                        </li>

                        <li class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="-1" @click.prevent="handleClickClose">
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
                icon-name="utility:close"
                x-small
                title="Close"
                class="slds-button_icon-current-color"
                @click.stop.prevent="handleClickClose"
            />
        </div>

    </li>
</template>

<script lang="ts">
import SldsSvg from "../slds-svg/slds-svg.vue"
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import { vOnClickOutside } from "@vueuse/components"
import { EVENTS } from "../../constants"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsGlobalNavigationTab",

    components: {
        SldsButtonIcon,
        SldsSvg,
    },

    directives: {
        ClickOutside: vOnClickOutside,
    },

    props: {
        hasSubTabs: { type: Boolean, default: false },

        iconName: { type: String, required: true },

        isActive: { type: Boolean, default: false },

        label: { type: String, required: true },
    },

    data() {
        return {
            isDropdownActive: false,
        }
    },

    computed: {
        itemClassNames(): string {
            let classNames = "slds-context-bar__item slds-context-bar__item_tab"

            if (this.hasSubTabs) classNames += " slds-has-sub-tabs"
            if (this.isActive) classNames += " slds-is-active"

            return classNames
        },
    },

    methods: {
        away(): void {
            this.isDropdownActive = false
        },

        handleClickRefreshTab(): void {
            this.$emit(EVENTS.REFRESH)
            this.isDropdownActive = false
        },

        handleClickCloseAll(): void {
            this.$emit(EVENTS.CLOSE_ALL)
        },

        handleClickClose(): void {
            this.$emit(EVENTS.CLOSE)
        },

        toggleDropdown(): void {
            this.isDropdownActive = !this.isDropdownActive
        },
    },
})
</script>
