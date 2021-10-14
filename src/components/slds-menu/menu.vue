<template>
    <div
        v-click-outside="hideDropdown"
        class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open"
        @keyup.esc="onKeyEsc"
        @keyup.up="onKeyUp"
        @keyup.down="onKeyDown"
        @keyup.enter="onKeyEnter"
        @keydown.enter.prevent
    >

        <!-- Buttons -->
        <slds-button-icon
            :icon="icon"
            :has-dropdown="icon !== 'utility:down'"
            :bare="bare"
            :bordered="bordered"
            :bordered-filled="borderedFilled"
            :bordered-inverse="borderedInverse"
            :inverse="inverse"
            :xx-small="xxSmall"
            :x-small="xSmall"
            :small="small"
            :large="large"
            :disabled="disabled"
            :title="title"
            :assistive-text="title"
            aria-haspopup="true"
            @click="onClick"
        />

        <!-- Dropdown -->
        <transition v-bind="dropdownTransitionProperties">
            <div v-if="$data.$_isOpen" class="slds-dropdown" :class="dropDownClass">
                <ul class="slds-listbox slds-listbox_vertical" role="menu" aria-label="Show More">

                    <!-- Slot items -->
                    <slot
                        v-if="$slots.items"
                        name="items"
                    />

                    <!-- Prop items -->
                    <template v-else>
                        <template v-for="item in filteredOptions">

                            <!-- Dividers -->
                            <slds-menu-divider
                                v-if="item.divider"
                                :key="item.key"
                            />

                            <!-- Headings -->
                            <slds-menu-heading
                                v-else-if="item.heading"
                                :key="item.key"
                                :heading="item.heading"
                            />

                            <!-- Items -->
                            <slds-menu-item
                                v-else
                                :key="item.key"
                                :label="item.label"
                                :level="item.level"
                                :left-icon="item.leftIcon"
                                :right-icon="item.rightIcon"
                                :disabled="item.disabled"
                                :has-focus="$data.$_focusedOption === item.value"
                                @click="onClickItem(item.value)"
                                @mouseover="onMouseOverItem(item.value)"
                            />

                        </template>
                    </template>

                    <!-- No options -->
                    <li v-if="isEmpty" role="presentation" class="slds-listbox__item">
                        <div class="slds-align_absolute-center slds-p-vertical_small">
                            No options to display
                        </div>
                    </li>

                    <!-- Spinner -->
                    <li v-if="loading" role="presentation" class="slds-listbox__item">
                        <div class="slds-align_absolute-center slds-p-top_medium">
                            <slds-spinner x-small inline/>
                        </div>
                    </li>

                </ul>
            </div>
        </transition>

    </div>
</template>

<script>
import SldsButtonIcon from '@/components/slds-button-icon/button-icon'
import SldsMenuDivider from './menu-divider'
import SldsMenuItem from './menu-item'
import SldsSpinner from '@/components/slds-spinner/spinner'
import ClickOutside from '@/directives/click-outside/index'
import HasDropdownMixin from '@/mixins/has-dropdown-mixin'
import DropdownOption from '@/components/slds-options/dropdown-option-class'

export default {
    name: 'SldsMenu',

    components: {
        SldsButtonIcon,
        SldsMenuDivider,
        SldsMenuItem,
        SldsSpinner
    },

    directives: {
        ClickOutside
    },

    mixins: [
        HasDropdownMixin
    ],

    props: {
        bare: Boolean,
        bordered: Boolean,
        borderedFilled: Boolean,
        borderedInverse: Boolean,
        bottomCenterAlignment: Boolean,
        bottomLeftAlignment: Boolean,
        bottomRightAlignment: Boolean,
        centerAlignment: Boolean,
        disabled: Boolean,
        icon: {type: String, default: 'utility:down'},
        inverse: Boolean,
        items: Array,
        large: Boolean,
        leftAlignment: Boolean,
        length: {
            type: Number,
            validator(value) {
                return [5, 7, 10].indexOf(value) !== -1
            },
        },
        nubbin: Boolean,
        rightAlignment: Boolean,
        small: Boolean,
        title: String,
        xSmall: Boolean,
        xxSmall: Boolean
    },

    computed: {
        dropDownClass() {
            let classNames = []

            // Menu alignment
            if (this.leftAlignment || this.isAutoAlignment) classNames.push(' slds-dropdown_left')
            else if (this.centerAlignment) classNames.push(' slds-dropdown_center')
            else if (this.rightAlignment) classNames.push(' slds-dropdown_right')
            else if (this.bottomCenterAlignment) classNames.push(' slds-dropdown_bottom')
            else if (this.bottomRightAlignment) classNames.push(' slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right')
            else if (this.bottomLeftAlignment) classNames.push(' slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left')

            // Nubbin alignment
            if (this.nubbin) {
                if (this.leftAlignment || this.isAutoAlignment) classNames.push(' slds-nubbin_top-left')
                else if (this.rightAlignment) classNames.push(' slds-nubbin_top-right')
                else if (this.centerAlignment) classNames.push(' slds-nubbin_top')
                else if (this.bottomLeftAlignment) classNames.push(' slds-nubbin_bottom-left')
                else if (this.bottomRightAlignment) classNames.push(' slds-nubbin_bottom-right')
                else if (this.bottomCenterAlignment) classNames.push(' slds-nubbin_bottom')
            }

            if (this.length) {
                classNames.push(`slds-dropdown_length-${this.length}`)
            }

            return classNames
        },

        isAutoAlignment() {
            return (
                !this.leftAlignment &&
                !this.centerAlignment &&
                !this.rightAlignment &&
                !this.bottomLeftAlignment &&
                !this.bottomCenterAlignment &&
                !this.bottomRightAlignment
            )
        },
    },

    watch: {
        items: {
            deep: true,
            handler() {
                this.parseItems()
            }
        },
    },

    created() {
        this.parseItems()
    },

    methods: {
        onClick() {
            if (this.disabled) return

            if (this.$data.$_isOpen) {
                this.hideDropdown()
                this.clearFocusedOption()
            }
            else {
                this.setFocusedItem()
                this.showDropdown()
            }
        },

        onKeyEsc() {
            if (!this.$data.$_isOpen) return

            this.hideDropdown()
            this.clearFocusedOption()
        },

        onClickItem(value) {
            this.selectItem(value)
        },

        onKeyDown() {
            if (!this.$data.$_isOpen) {
                this.setFocusedItem()
                this.showDropdown()
            }
            else {
                this.setFocusedOptionDown()
            }
        },

        onKeyEnter() {
            if (!this.$data.$_isOpen) {
                this.setFocusedItem()
                this.showDropdown()
            }
            else {
                this.selectItem(this.$data.$_focusedOption)
            }
        },

        onKeyUp() {
            if (!this.$data.$_isOpen) {
                this.setFocusedItem()
                this.showDropdown()
            }
            else {
                this.setFocusedOptionUp()
            }
        },

        onMouseOverItem(value) {
            this.setFocusedItem(value)
        },

        parseItems() {
            this.$data.$_options = this.$data.$_options.splice(0, this.$data.$_options.length)
            if (this.items == null) return

            for (const item of this.items) {
                if (typeof item === 'string') {
                    this.$data.$_options.push(new DropdownOption(null, item))
                }
                else if (typeof item === 'object') {
                    const dropdownOption = new DropdownOption(item.heading, item.label, item.value, item.divider)
                    dropdownOption.leftIcon = item.leftIcon
                    dropdownOption.rightIcon = item.rightIcon
                    dropdownOption.disabled = item.disabled
                    dropdownOption.level = item.level

                    this.$data.$_options.push(dropdownOption)
                }
                else {
                    throw'[slds-menu] items must be of type string or a valid menu item object.'
                }
            }
        },

        selectItem(value) {
            this.hideDropdown()
            this.$emit(value)
            this.clearFocusedOption()
        },

        setFocusedItem(value = null) {
            if (value) this.$data.$_focusedOption = value
            else this.$data.$_focusedOption = this.$data.$_options
                .find(option => !option.disabled && !option.heading)
                .value
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../directives/animated/animations';
</style>
