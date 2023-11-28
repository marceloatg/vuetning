<template>
    <ul class="slds-accordion">
        <slot>
            <slds-accordion-section
                v-for="section of sections"
                :key="section.id"
                :content="section.content"
                :label="section.label"
                :name="section.name"
            />
        </slot>
    </ul>
</template>

<script lang="ts">
import SldsAccordionSection from "./slds-accordion-section.vue"
import { defineComponent } from "vue"
import type { PropType } from "vue"
import type { AccordionSection } from "./accordion-section"

export default defineComponent({
    name: "SldsAccordion",

    components: {
        SldsAccordionSection,
    },

    props: {
        /**
         * Expands the specified accordion section passing in a string for a single section.
         * By default, only the first section in the accordion is expanded.
         */
        activeSectionName: String,

        /**
         * Expands the specified accordion sections passing in a list of section names.
         * To support multiple expanded sections, include allow-multiple-sections-open in your markup.
         * By default, only the first section in the accordion is expanded.
         */
        activeSectionNames: { type: Array as PropType<string[]>, default: () => [] as string[] },

        /**
         * If present, the accordion allows multiple open sections.
         * Otherwise, opening a section closes another that's currently open.
         */
        allowMultipleSectionsOpen: Boolean,

        /**
         * Accordion sections.
         */
        sections: Array as PropType<AccordionSection[]>,
    },

    data() {
        return {
            /**
             * Private variable to track the active section name.
             */
            internalActiveSectionName: this.activeSectionName,

            /**
             * Private variable to track the active section names.
             */
            internalActiveSectionNames: this.activeSectionNames,
        }
    },

    watch: {
        /**
         * Watch for changes to the active section name.
         * @param activeSectionName The new active section name.
         */
        activeSectionName(activeSectionName: string): void {
            if (this.internalActiveSectionName === activeSectionName) return

            this.internalActiveSectionName = activeSectionName
            this.handleActiveSectionChange(activeSectionName)
        },

        /**
         * Watch for changes to the active section names.
         * @param activeSectionNames The new active section names.
         */
        activeSectionNames(activeSectionNames: string[]) {
            if (this.internalActiveSectionNames === activeSectionNames) return

            this.internalActiveSectionNames = activeSectionNames
            this.handleActiveSectionChange(activeSectionNames)
        },

        /**
         * Watch for changes to the sections.
         */
        sections: {
            deep: true,
            handler() {
                if (this.allowMultipleSectionsOpen) this.handleActiveSectionChange(this.activeSectionNames)
                else this.handleActiveSectionChange(this.activeSectionName)
            },
        },
    },

    methods: {
        /**
         * Handles the active section change event.
         * @param input New section name.
         */
        handleActiveSectionChange(input: string | string[] | undefined): void {
            if (this.allowMultipleSectionsOpen) {
                if (!Array.isArray(input)) {
                    throw Error(`Accordion expected an array of string but got ${input}`)
                }

                for (const sectionName of input) {
                    const index = this.internalActiveSectionNames.indexOf(sectionName)

                    if (index === -1) this.internalActiveSectionNames.push(sectionName)
                    else this.internalActiveSectionNames.splice(index, 1)
                }
            }
            else {
                this.internalActiveSectionName = (this.internalActiveSectionName !== input)
                    ? input as string
                    : undefined
            }

            this.$emit("active-section-change", input)
        },
    },
})
</script>
