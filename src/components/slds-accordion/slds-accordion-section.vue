<template>
    <li class="slds-accordion__list-item">
        <section ref="content" :class="sectionClassNames">

            <!-- Summary -->
            <div class="slds-accordion__summary">
                <h2 class="slds-accordion__summary-heading">
                    <button
                        :aria-expanded="isOpen"
                        class="slds-button slds-button_reset slds-accordion__summary-action"
                        @click="handleClickLabel"
                    >

                        <!-- Chevron -->
                        <slds-svg
                            ref="chevron"
                            class="slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left"
                            icon="utility:switch"
                        />

                        <!-- Content -->
                        <span class="slds-accordion__summary-content">
                            <slot name="summary">
                                {{ label }}
                            </slot>
                        </span>

                    </button>
                </h2>
            </div>

            <!-- Content -->
            <div v-if="isOpen" class="slds-accordion__content">
                <slot>
                    {{ content }}
                </slot>
            </div>

        </section>
    </li>
</template>

<script lang="ts">
import SldsSvg from "../slds-svg/slds-svg.vue"
import autoAnimate from "@formkit/auto-animate"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsAccordionSection",

    components: {
        SldsSvg,
    },

    props: {
        /**
         * The content in the accordion section.
         */
        content: String,

        /**
         * The text that displays as the title of the section.
         */
        label: String,

        /**
         * The unique section name to use with the active-section-name attribute in the accordion component.
         */
        name: { type: String, required: true },
    },

    computed: {
        /**
         * Indicates whether the accordion section is open
         */
        isOpen(): boolean {
            const activeSectionName = (this.$parent as any).internalActiveSectionName
            const activeSectionNames = (this.$parent as any).internalActiveSectionNames
            const allowMultipleSectionsOpen = (this.$parent as any).allowMultipleSectionsOpen

            if (allowMultipleSectionsOpen) return activeSectionNames.includes(this.name)
            return activeSectionName === this.name
        },

        /**
         * The CSS class names for the accordion section.
         */
        sectionClassNames(): string {
            let classNames = "slds-accordion__section"

            // State
            if (this.isOpen) classNames += " slds-is-open"

            return classNames
        },
    },

    mounted() {
        autoAnimate(this.$refs.content as HTMLElement)
    },

    methods: {
        /**
         * Handles the click event on the section label.
         */
        handleClickLabel(): void {
            const allowMultipleSectionsOpen = (this.$parent as any).allowMultipleSectionsOpen as boolean
            const input = allowMultipleSectionsOpen ? [this.name] : this.name as string

            (this.$parent as any).handleActiveSectionChange(input)
            this.$emit("active-section-change", input)
        },
    },
})
</script>

<style scoped lang="scss">
.slds-accordion__summary-action-icon {
    transition-duration: 200ms;
}
</style>
