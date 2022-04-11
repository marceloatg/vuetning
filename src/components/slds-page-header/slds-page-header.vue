<!--suppress HtmlUnknownTag -->
<template>
    <div class="slds-page-header">

        <!-- Upper row -->
        <div class="slds-page-header__row">

            <!-- Title -->
            <div class="slds-page-header__col-title">
                <slds-media-object>

                    <!-- Figure -->
                    <template v-if="hasIcon" #figure>
                        <slds-icon
                            :icon="icon"
                            inverse
                            standard-format
                            :assistive-text="assistiveText"
                            :icon-class="[iconClass,'slds-page-header__icon']"
                        />
                    </template>

                    <!-- Base body -->
                    <template v-if="hasBaseBody" #default>

                        <!-- Title -->
                        <div class="slds-page-header__name">
                            <div class="slds-page-header__name-title">
                                <h1>
                                    <span class="slds-page-header__title slds-truncate" :title="title">
                                        {{ title }}
                                    </span>
                                </h1>
                            </div>
                        </div>

                        <!-- Meta text -->
                        <p class="slds-page-header__name-meta">
                            {{ meta }}
                        </p>

                    </template>

                    <!-- Dropdown body -->
                    <template v-else #default>
                        <div class="slds-page-header__name">
                            <div class="slds-page-header__name-title">
                                <h1>

                                    <!-- Breadcrumbs/Name -->
                                    <slot name="breadcrumbs">
                                        <div>
                                            {{ name }}
                                        </div>
                                    </slot>

                                    <!-- Dropdown title -->
                                    <span
                                        v-if="hasDropdown"
                                        v-click-outside="hideDropdown"
                                        class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open"
                                    >

                                        <!-- Trigger -->
                                        <span
                                            class="slds-page-header__title slds-button slds-button_reset slds-type-focus slds-truncate"
                                            @click="onClickDropdown"
                                        >

                                            {{ title }}

                                            <slds-icon
                                                icon="utility:down"
                                                current
                                                x-small
                                                class="slds-m-left_x-small"
                                            />

                                        </span>

                                        <!-- Dropdown -->
                                        <transition v-bind="dropdownTransitionProperties">
                                            <slds-page-header-dropdown
                                                v-if="$data.$_isOpen"
                                                :value="selectedListView"
                                                :options="filteredOptions"
                                                :focused-option="$data.$_focusedOption"
                                                :loading="loading"
                                                @click="onClickOption"
                                                @mouseover="onMouseOverOption"
                                            >
                                                <template v-if="$slots.options">
                                                    <slot name="options"/>
                                                </template>
                                            </slds-page-header-dropdown>
                                        </transition>

                                    </span>

                                    <!-- Title -->
                                    <span v-else class="slds-page-header__title slds-truncate" :title="title">
                                        {{ title }}
                                    </span>

                                </h1>
                            </div>
                        </div>
                    </template>

                </slds-media-object>
            </div>

            <!-- Actions -->
            <div class="slds-page-header__col-actions">
                <div class="slds-page-header__controls">
                    <slot name="actions"/>
                </div>
            </div>

        </div>

        <!-- Lower row -->
        <div v-if="objectHome || relatedList" class="slds-page-header__row">

            <!-- Meta -->
            <div class="slds-page-header__col-meta">
                <p class="slds-page-header__meta-text">
                    {{ meta }}
                </p>
            </div>

            <!-- Controls -->
            <div class="slds-page-header__col-controls">
                <div class="slds-page-header__controls">

                    <div class="slds-page-header__control control-placeholder"/>

                    <slot name="controls"/>

                </div>
            </div>

        </div>

        <!-- Details row -->
        <div v-if="recordHome" class="slds-page-header__row slds-page-header__row_gutters">
            <div class="slds-page-header__col-details">
                <ul class="slds-page-header__detail-row">
                    <slot name="details"/>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import SldsIcon from '@/components/slds-icon/slds-icon'
import ClickOutside from '@/directives/click-outside/index'
import HasDropdownMixin from '@/mixins/has-dropdown-mixin'
import SldsPageHeaderDropdown from '@/components/slds-page-header/slds-page-header-dropdown'
import DropdownOption from '@/components/slds-options/dropdown-option-class'

export default {
    name: 'SldsPageHeader',

    directives: {
        ClickOutside
    },

    components: {
        SldsPageHeaderDropdown,
        SldsIcon
    },

    mixins: [
        HasDropdownMixin
    ],

    props: {
        assistiveText: String,
        details: String,
        hasDropdown: Boolean,
        icon: String,
        iconClass: String,
        listViewOptions: Array,
        meta: String,
        name: String,
        objectHome: Boolean,
        recordHome: Boolean,
        relatedList: Boolean,
        selectedListView: String,
        title: {type: String, required: true}
    },

    computed: {
        hasBaseBody() {
            return !this.objectHome && !this.recordHome && !this.relatedList
        },

        hasIcon() {
            return !this.relatedList && !!this.icon
        },
    },

    watch: {
        listViewOptions: {
            deep: true,
            handler() {
                this.parseLisViewOptions()
            }
        }
    },

    created() {
        this.parseLisViewOptions()
    },

    methods: {
        onClickDropdown() {
            if (this.$data.$_isOpen) return
            this.setFocusedOption()
            this.showDropdown()
            this.$emit('dropdown-click')
        },

        onClickOption(value) {
            this.hideDropdown()
            this.$emit('dropdown-select', value)
            this.clearFocusedOption()
        },

        onMouseOverOption(value) {
            this.setFocusedOption(value)
        },

        parseLisViewOptions() {
            this.$data.$_options = this.$data.$_options.splice(0, this.$data.$_options.length)
            if (this.listViewOptions == null) return

            for (const option of this.listViewOptions) {
                if (typeof option === 'string') {
                    this.$data.$_options.push(new DropdownOption(null, option))
                }
                else if (typeof option === 'object') {
                    const dropdownOption = new DropdownOption(option.heading, option.label, option.value)
                    this.$data.$_options.push(dropdownOption)
                }
                else {
                    throw'[slds-page-header] options must be of type string or a valid page header option object.'
                }
            }
        },

        setFocusedOption(value = null) {
            if (value) this.$data.$_focusedOption = value
            else if (this.selectedListView) this.$data.$_focusedOption = this.selectedListView
            else this.$data.$_focusedOption = this.filteredOptions
                    .find(option => !option.heading)
                    .value
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../directives/animated/animations';

.control-placeholder {
    height: 2rem;
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: transform 300ms, opacity 150ms !important;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0 !important;
    transform: translateY(5%) !important;
}

.slds-card {
    .slds-page-header {
        padding: 1rem 1rem .75rem 1rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: 1px solid rgb(221, 219, 218);
    }
}

</style>
