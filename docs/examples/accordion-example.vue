<template>
    <example-container class="slds-m-top_medium">

        <slds-accordion
            v-if="showCase"
            :active-section-name="activeSectionName"
            :sections="sections"
        />

        <slds-accordion
            v-if="single"
            :active-section-name="activeSectionName"
            :sections="sections"
        />

        <slds-accordion
            v-if="multiple"
            allow-multiple-sections-open
            :active-section-names="activeSectionNames"
            :sections="sections"
        />

        <slds-accordion
            v-if="viaProp"
            :active-section-name="activeSectionName"
            :sections="sections"
        />

        <slds-accordion v-if="viaSlot" :active-section-name="activeSectionName">

            <slds-accordion-section
                content="Accordion details - A"
                label="Accordion Summary A"
                name="accordion-a"
            />

            <slds-accordion-section
                content="Accordion details - B"
                label="Accordion Summary B"
                name="accordion-c"
            />

            <slds-accordion-section
                content="Accordion details - c"
                label="Accordion Summary c"
                name="accordion-c"
            />

        </slds-accordion>

    </example-container>
</template>

<script lang="ts">
import ExampleContainer from "./example-container.vue"
import SldsAccordion from "../slds-accordion/slds-accordion.vue"
import SldsAccordionSection from "../../src/components/slds-accordion/slds-accordion-section.vue"
import { defineComponent } from "vue"
import { AccordionSection } from "../../src/components/slds-accordion/accordion-section"

export default defineComponent({
    name: "accordion-example",

    components: {
        ExampleContainer,
        SldsAccordionSection,
        SldsAccordion,
    },

    props: {
        multiple: Boolean,
        showCase: Boolean,
        single: Boolean,
        viaProp: Boolean,
        viaSlot: Boolean,
    },

    data() {
        return {
            activeSectionName: "accordion-a",
            activeSectionNames: ["accordion-a", "accordion-c"],
            sections: [
                { content: "Accordion details - A", label: "Accordion Summary A", name: "accordion-a" },
                { content: "Accordion details - B", label: "Accordion Summary B", name: "accordion-b" },
                { content: "Accordion details - C", label: "Accordion Summary C", name: "accordion-c" },
            ] as AccordionSection[],
        }
    },
})
</script>
