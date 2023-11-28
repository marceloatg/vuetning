<template>
    <nav role="navigation" aria-label="Breadcrumbs">
        <ol class="slds-breadcrumb slds-list_horizontal slds-wrap slds-grid_vertical-align-center">

            <!--  Overflow -->
            <li v-if="hasOverflow" class="slds-breadcrumb__item">
                <div
                    v-click-outside="hideDropdown"
                    class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open"
                >

                    <!-- Button -->
                    <slds-button-icon
                        icon-name="utility:threedots"
                        x-small
                        bordered-filled
                        title="Show More"
                        assistive-text="Show More"
                        @click="handleClickDropdown"
                    />

                    <!-- Dropdown -->
                    <transition name="dropdown">
                        <div v-if="isDropdownOpen" class="slds-dropdown slds-dropdown_left slds-dropdown_actions">
                            <ul class="slds-dropdown__list" role="menu">
                                <slds-overflowed-breadcrumb
                                    v-for="overflowedItem in overflownItems"
                                    :key="overflowedItem.name"
                                    :name="overflowedItem.name"
                                    :label="overflowedItem.label"
                                    :href="overflowedItem.href"
                                    @click="handleClickBreadcrumb"
                                />
                            </ul>
                        </div>
                    </transition>

                </div>
            </li>

            <!-- Items -->
            <slds-breadcrumb
                v-for="item in visibleItems"
                :key="item.name"
                :name="item.name"
                :label="item.label"
                :href="item.href"
                :neutral="neutral"
                @click="handleClickBreadcrumb"
            />

        </ol>
    </nav>
</template>

<script lang="ts">
import SldsBreadcrumb from "./slds-breadcrumb.vue"
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import SldsOverflowedBreadcrumb from "./slds-overflowed-breadcrumb.vue"
import { vOnClickOutside } from "@vueuse/components"
import { EVENTS } from "../../constants"
import { defineComponent } from "vue"

import type { Breadcrumb } from "./breadcrumb"
import type { PropType } from "vue"

export default defineComponent({
    name: "SldsBreadcrumbs",

    components: {
        SldsButtonIcon,
        SldsBreadcrumb,
        SldsOverflowedBreadcrumb,
    },

    directives: {
        ClickOutside: vOnClickOutside,
    },

    props: {
        items: { type: Array as PropType<Breadcrumb[]>, default: () => [] as Breadcrumb[] },

        maxItems: { type: Number, default: 3 },

        neutral: Boolean,
    },

    data() {
        return {
            isDropdownOpen: false,
        }
    },

    computed: {
        /**
         * Indicates whether the breadcrumbs have overflow.
         */
        hasOverflow(): boolean {
            return Boolean(this.items.length > this.maxItems)
        },

        overflownItems(): Breadcrumb[] {
            return this.items.slice(-this.maxItems)
        },

        visibleItems(): Breadcrumb[] {
            return this.hasOverflow
                ? this.items.slice(0, this.items.length - this.maxItems)
                : this.items
        },
    },

    methods: {
        handleClickBreadcrumb(name: string): void {
            this.$emit(EVENTS.CLICK, name)
        },

        handleClickDropdown(): void {
            this.isDropdownOpen = !this.isDropdownOpen
        },

        hideDropdown(): void {
            this.isDropdownOpen = false
        },
    },
})
</script>
