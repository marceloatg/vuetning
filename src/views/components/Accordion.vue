<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Accordion"
            details="Components"
        >
            <template #details>
                An accordion allows a user to toggle the display of a section of content.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium" title="Passing sections via slot">
            <slds-accordion :active-section-name="activeSectionName">

                <slds-accordion-section
                    content="Accordion details - A"
                    label="Accordion Summary A"
                    name="accordion-a"
                />

                <slds-accordion-section
                    label="Accordion Summary B"
                    name="accordion-b"
                >
                    This is the content area for section B.

                    Nam at elit et justo scelerisque ullamcorper vel a felis. Mauris sit amet lorem sed est sagittis
                    blandit nec ac turpis. Ut a mi id turpis pharetra ornare. Nullam rhoncus feugiat nunc, ac pulvinar
                    felis pulvinar at. Nullam efficitur aliquet justo et ultricies. Maecenas eu felis aliquam, tincidunt
                    elit at, suscipit leo. Duis ut urna nec nibh hendrerit lacinia. Sed non auctor libero. Sed
                    pellentesque tempor mollis.
                </slds-accordion-section>

                <slds-accordion-section name="accordion-c">

                    <template #summary>
                        Accordion Summary c
                    </template>

                    This is the content area for section C.

                    Nam at elit et justo scelerisque ullamcorper vel a felis. Mauris sit amet lorem sed est sagittis
                    blandit nec ac turpis. Ut a mi id turpis pharetra ornare. Nullam rhoncus feugiat nunc, ac pulvinar
                    felis pulvinar at. Nullam efficitur aliquet justo et ultricies. Maecenas eu felis aliquam, tincidunt
                    elit at, suscipit leo. Duis ut urna nec nibh hendrerit lacinia. Sed non auctor libero. Sed
                    pellentesque tempor mollis.

                </slds-accordion-section>

            </slds-accordion>
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Passing sections as objects">
            <slds-accordion
                :active-section-name="activeSectionName"
                :sections="sections"
            />
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Allow multiple sections open">
            <slds-accordion
                :active-section-name="activeSectionNames"
                allow-multiple-sections-open
                :sections="sections"
            />
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Accordion',

    data() {
        return {
            activeSectionName: 'accordion-a',

            activeSectionNames: ['accordion-a'],

            sections: [
                {name: 'accordion-a', label: 'Accordion Summary A', content: 'Accordion details - A'},
                {name: 'accordion-b', label: 'Accordion Summary B', content: 'Accordion details - B'},
                {name: 'accordion-c', label: 'Accordion Summary C', content: 'Accordion details - C'},
            ]
        }
    },
}
</script>
