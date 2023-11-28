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
                            :class="iconClass"
                            :icon-name="iconName!"
                            :icon-class="['slds-page-header__icon']"
                            inverse
                            standard-format
                            :assistive-text="assistiveText"
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
                                                icon-name="utility:down"
                                                current
                                                x-small
                                                class="slds-m-left_x-small"
                                            />

                                        </span>

                                        <!-- Dropdown -->
                                        <transition name="dropdown">
                                            <slds-page-header-dropdown
                                                v-if="$data.$_isOpen"
                                                :value="selectedListView"
                                                :options="filteredOptions"
                                                :focused-option="focusedOption"
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
            <template v-if="meta || $slots.controls">

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

            </template>
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

<script lang="ts">
import { vOnClickOutside } from "@vueuse/components"
import HasDropdownMixin from "../../mixins/has-dropdown-mixin.js"
import SldsIcon from "../slds-icon/slds-icon.vue"
import SldsMediaObject from "../slds-media-object/slds-media-object.vue"
import SldsPageHeaderDropdown from "../slds-page-header/slds-page-header-dropdown.vue"
import { defineComponent } from "vue"
import type { DropdownOption } from "../slds-dropdown/dropdown-option"

export default defineComponent({
    name: "SldsPageHeader",

    directives: {
        ClickOutside: vOnClickOutside,
    },

    components: {
        SldsMediaObject,
        SldsPageHeaderDropdown,
        SldsIcon,
    },

    mixins: [
        HasDropdownMixin,
    ],

    props: {
        assistiveText: String,

        details: String,

        hasDropdown: Boolean,

        iconName: String,

        iconClass: String,

        meta: String,

        name: String,

        objectHome: Boolean,

        recordHome: Boolean,

        relatedList: Boolean,

        selectedListView: String,

        title: { type: String, required: true },
    },

    computed: {
        hasBaseBody(): boolean {
            return Boolean(!this.objectHome && !this.recordHome && !this.relatedList)
        },

        hasIcon(): boolean {
            return Boolean(!this.relatedList && !!this.iconName)
        },
    },

    methods: {
        onClickDropdown(): void {
            if (this.isOpen) return

            this.setFocusedOption()
            this.showDropdown()
            this.$emit("dropdown-click")
        },

        onClickOption(value: string): void {
            this.hideDropdown()
            this.$emit("dropdown-select", value)
            this.clearFocusedOption()
        },

        onMouseOverOption(option: DropdownOption): void {
            this.setFocusedOption(option)
        },

        /**
         * Set the focused item.
         * @param focusedOption Hovered option, if any.
         */
        setFocusedOption(focusedOption?: DropdownOption): void {
            if (this.isEmpty) return

            if (focusedOption) this.focusedOption = focusedOption
            console.warn("To be implemented")
        },
    },
})
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
