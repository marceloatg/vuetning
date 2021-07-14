<!--suppress HtmlUnknownTag -->
<template>
    <div class="slds-page-header">

        <!-- Upper row -->
        <div class="slds-page-header__row">

            <!-- Title -->
            <div class="slds-page-header__col-title">
                <div class="slds-media">

                    <!-- Figure -->
                    <div v-if="icon" class="slds-media__figure">
                        <slds-icon
                            :icon="icon"
                            inverse
                            standard-format
                            :assistive-text="assistiveText"
                            :icon-class="[iconClass,'slds-page-header__icon']"
                        />
                    </div>

                    <!-- Base body -->
                    <div v-if="base" class="slds-media__body">

                        <!-- Name title -->
                        <div class="slds-page-header__name">
                            <div class="slds-page-header__name-title">
                                <h1>
                                    <span class="slds-page-header__title slds-truncate" :title="title">
                                        {{ title }}
                                    </span>
                                </h1>
                            </div>
                        </div>

                        <!-- Supporting details -->
                        <p v-if="details" class="slds-page-header__name-meta">
                            {{ details }}
                        </p>

                    </div>

                    <!-- Dropdown body -->
                    <div v-else class="slds-media__body">
                        <div class="slds-page-header__name">

                            <!-- Name title -->
                            <div class="slds-page-header__name-title">
                                <h1>

                                    <!-- Breadcrumb/Details -->
                                    <slot name="breadcrumb">
                                        <span>
                                            {{ details }}
                                        </span>
                                    </slot>

                                    <!-- Dropdown title -->
                                    <span v-if="$slots.dropdown" class="slds-p-right-x-small">
                                        <div
                                            v-click-outside="hideDropdown"
                                            class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open"
                                        >

                                            <!-- Trigger -->
                                            <div
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
                                            </div>

                                            <!-- Dropdown -->
                                            <transition v-bind="dropdownTransitionProperties">
                                                <slds-page-header-dropdown
                                                    v-if="$data.$_isOpen"
                                                    :value="selectedListView"
                                                    :options="filteredOptions"
                                                    :focused-option="$data.$_focusedOption"
                                                    :is-loading="loading"
                                                    @click="onClickOption"
                                                    @mouseover="onMouseOverOption"
                                                >
                                                    <template v-if="$slots.options">
                                                        <slot name="options"/>
                                                    </template>
                                                </slds-page-header-dropdown>
                                            </transition>

                                        </div>
                                    </span>

                                    <!-- Title -->
                                    <span v-else class="slds-page-header__title slds-truncate" :title="title">
                                        {{ title }}
                                    </span>

                                </h1>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <!-- Actions -->
            <div class="slds-page-header__col-actions">
                <div class="slds-page-header__controls">
                    <slot name="actions"/>
                </div>
            </div>

        </div>

        <!-- Lower row -->
        <div v-if="objectHome" class="slds-page-header__row">

            <!-- Meta -->
            <div class="slds-page-header__col-meta">

                <slot v-if="$slots.meta" name="meta"/>

                <p v-else class="slds-page-header__meta-text">
                    {{ meta || '' }}
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
import SldsIcon from '@/components/slds-icon/icon'
import ClickOutside from '@/directives/click-outside/index'
import HasDropdownMixin from "@/mixins/has-dropdown-mixin";
import SldsPageHeaderDropdown from "@/components/slds-page-header/page-header-dropdown";
import DropdownOption from "@/components/slds-options/dropdown-option-class";

export default {
    name: "SldsPageHeader",

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
        base: Boolean,
        details: String,
        icon: String,
        iconClass: String,
        listViewOptions: Array,
        meta: String,
        objectHome: Boolean,
        recordHome: Boolean,
        selectedListView: String,
        title: {type: String, required: true}
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
        async onClickDropdown() {
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
                if (typeof option === "string") {
                    this.$data.$_options.push(new DropdownOption(null, option))
                }
                else if (typeof option === "object") {
                    const dropdownOption = new DropdownOption(option.heading, option.label, option.value)
                    this.$data.$_options.push(dropdownOption)
                }
                else {
                    throw`[slds-page-header] options must be of type string or a valid page header option object.`
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
