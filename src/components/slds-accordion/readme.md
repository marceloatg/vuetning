# Accordion ![avaliability](https://img.shields.io/badge/avaliability-available-green.svg)  ![testing](https://img.shields.io/badge/coverage-0%25-red.svg) ![documentation](https://img.shields.io/badge/documentation-draft-red.svg)

An accordion allows a user to toggle the display of a section of content.

## Props

| Name                      | Type               | Required | Default | Description |
| ------------------------- | ------------------ | -------- | ------- | ----------- |
| activeSectionName         | String, String[]   | false    |         | Expands the specified accordion sections. Pass in a string for a single section or a list of section names. To support multiple expanded sections, include allow-multiple-sections-open in your markup. By default, only the first section in the accordion is expanded. |
| allowMultipleSectionsOpen | Boolean            | false    | false   | If present, the accordion allows multiple open sections. Otherwise, opening a section closes another that's currently open. |
| sections                  | AccordionSection[] | false    |         | Accordion section objects. When passing this property, the accordion wil automatically build the sections. |

## Slots

| Name    | Optional | Description |
| ------- | -------- | ----------- |
| default | true     | The slot to place the accordion sections. |


## Events

| Name                  | Arguments   | Description                            |
| --------------------- | ----------- | -------------------------------------- |
| active-section-change | sectionName | Fired when the active section changes. |

## Examples

```vue
<!-- Passing sections via prop -->
<slds-accordion
    :active-section-name="activeSectionName"
    :sections="sections"
/>

<!-- Passing sections via slot -->
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
    </slds-accordion-section>
    
    <slds-accordion-section name="accordion-c">
    
        <template #summary>
            Accordion Summary c
        </template>
    
        This is the content area for section C.
    </slds-accordion-section>

</slds-accordion>
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/accordion/)
