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
                        icon="utility:threedots"
                        x-small
                        bordered-filled
                        title="Show More"
                        assistive-text="Show More"
                        @click="onClickDropdown"
                    />

                    <!-- Dropdown -->
                    <transition v-bind="dropdownTransitionProperties">
                        <div v-if="$data.$_isOpen" class="slds-dropdown slds-dropdown_left slds-dropdown_actions">
                            <ul class="slds-dropdown__list" role="menu">
                                <slot v-if="$slots['dropdown-list']" name="dropdown-list"/>
                                <template v-else>
                                    <slds-overflowed-breadcrumb
                                        v-for="overflowedItem in $data.$_overflowedItems"
                                        :key="overflowedItem.key"
                                        :name="overflowedItem.name"
                                        :label="overflowedItem.label"
                                        :href="overflowedItem.href"
                                        @click=onClickBreadcrumb
                                    />
                                </template>
                            </ul>
                        </div>
                    </transition>

                </div>
            </li>

            <!-- Items -->
            <slot v-if="$slots.default"/>
            <template v-else>
                <slds-breadcrumb
                    v-for="item in $data.$_items"
                    :key="item.id"
                    :name="item.name"
                    :label="item.label"
                    :href="item.href"
                    :neutral="neutral"
                    @click=onClickBreadcrumb
                />
            </template>

        </ol>
    </nav>
</template>

<script>
import SldsBreadcrumb from "./breadcrumb";
import SldsOverflowedBreadcrumb from "./overflowed-breadcrumb";
import ClickOutside from '@/directives/click-outside/index'
import HasDropdownMixin from '@/mixins/has-dropdown-mixin'
import Item from './item'

export default {
    name: "SldsBreadcrumbs",

    components: {
        SldsBreadcrumb,
        SldsOverflowedBreadcrumb
    },

    directives: {
        ClickOutside
    },

    mixins: [
        HasDropdownMixin
    ],

    props: {
        items: Array,
        maxItems: {type: Number, default: 3},
        neutral: Boolean
    },

    data() {
        return {
            $_items: [],
            $_overflowedItems: []
        }
    },

    computed: {
        hasOverflow() {
            return (
                this.$slots['dropdown-list'] ||
                (this.items && (this.items.length >= this.maxItems))
            )
        },

        isOverflowNotPopulated() {
            return ((this.items.length - this.$data.$_overflowedItems.length) <= this.maxItems)
        },
    },

    watch: {
        items: {
            deep: true,
            handler() {
                return this.parseItems()
            }
        }
    },

    created() {
        this.parseItems()
    },

    methods: {
        onClickBreadcrumb(name) {
            this.$emit('click', name)
        },

        onClickDropdown() {
            this.toggleDropdown()
        },

        parseItems() {
            this.$data.$_items = this.$data.$_items.splice(0, this.$data.$_items.length)
            if (this.items == null) return

            for (const item of this.items) {
                let breadcrumbItem;

                if (typeof item === "string") breadcrumbItem = new Item(item)
                else if (typeof item === "object") breadcrumbItem = new Item(item.label, item.name, item.href)
                else throw`[slds-breadcrumbs] items must be of type string or a valid breadcrumb object.`

                if (!this.hasOverflow || (this.hasOverflow && this.isOverflowNotPopulated)) this.$data.$_items.push(breadcrumbItem)
                else this.$data.$_overflowedItems.push(breadcrumbItem)
            }
        },
    }
}
</script>
