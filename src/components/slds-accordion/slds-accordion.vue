<template>
    <ul class="slds-accordion">
        <slot>
            <slds-accordion-section
                v-for="section of sections"
                :key="section.name"
                :content="section.content"
                :label="section.label"
                :name="section.name"
            />
        </slot>
    </ul>
</template>

<!--suppress JSValidateTypes -->
<script>
import SldsAccordionSection from '@/components/slds-accordion/slds-accordion-section'

export default {
    name: 'SldsAccordion',

    components: {
        SldsAccordionSection,
    },

    props: {
        /**
         * Expands the specified accordion sections.
         * Pass in a string for a single section or a list of section names.
         * To support multiple expanded sections, include allow-multiple-sections-open in your markup.
         * By default, only the first section in the accordion is expanded.
         * @type {string|string[]}
         */
        activeSectionName: [String, Array],

        /**
         * If present, the accordion allows multiple open sections.
         * Otherwise, opening a section closes another that's currently open.
         * @type {boolean}
         */
        allowMultipleSectionsOpen: Boolean,

        /**
         * Accordion sections.
         * @type {AccordionSection[]}
         */
        sections: Array,
    },

    data() {
        return {
            /**
             * Private variable to track the active section name.
             * @type {string}
             */
            $_activeSectionName: this.activeSectionName
        }
    },

    watch: {
        /**
         * Watch for changes to the active section name.
         * @param {string|string[]} activeSectionName
         */
        activeSectionName(activeSectionName) {
            if (this.$data.$_activeSectionName !== activeSectionName) {
                this.$data.$_activeSectionName = activeSectionName
                this.onActiveSectionChange(activeSectionName)
            }
        },

        /**
         * Watch for changes to the sections.
         */
        sections: {
            deep: true,
            handler() {
                this.onActiveSectionChange(this.activeSectionName)
            }
        },
    },

    created() {
        this.validateActiveSectionName()
    },

    methods: {
        /**
         * Handles the active section change event.
         * @param {string} sectionName New section name
         */
        onActiveSectionChange(sectionName) {
            this.validateActiveSectionName()

            if (this.allowMultipleSectionsOpen) {
                const index = this.$data.$_activeSectionName.indexOf(sectionName)

                if (index === -1) this.$data.$_activeSectionName.push(sectionName)
                else this.$data.$_activeSectionName.splice(index, 1)
            }
            else {
                this.$data.$_activeSectionName = (this.$data.$_activeSectionName !== sectionName)
                    ? sectionName
                    : null
            }

            this.$emit('active-section-change', sectionName)
        },

        /**
         * Throws error if the section name is invalid.
         */
        validateActiveSectionName() {
            if (this.allowMultipleSectionsOpen) {
                if (typeof (this.activeSectionName) === 'string') {
                    throw new Error('If allow-multiple-sections-open is present, activeSectionName must be a string array.')
                }
            }
            else {
                if (typeof (this.activeSectionName) !== 'string') {
                    throw new Error('If allow-multiple-sections-open is not present, activeSectionName must be a string.')
                }
            }
        },
    },
}
</script>
