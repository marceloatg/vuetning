---
outline: deep
---

<script setup>
import AccordionExample from '../examples/accordion-example.vue';
</script>

<h1 class="component-title">
Accordion
</h1>

<h3>
An accordion allows a user to toggle the display of a section of content.
</h3>

<accordion-example show-case/>

## Usage

Accordions are composed of a list of longer blocks of text, with a header button to toggle the visibility of each block.

### Modes

There are two modes for the accordion: single and multiple.

#### Single

In single mode, only one section can be open at a time. You can close a section by opening another section.

A **string** is required to be passed via `active-section-name` prop when in single mode.

<accordion-example single/>

```html

<slds-accordion
    :active-section-name="activeSectionName"
    :sections="sections"
/>
```

#### Multiple

In multiple mode, Accordion sections can be open or closed without restrictions, programmatically or by clicking the
section headers. To set the accordion to multiple mode, add the `allow-multiple-sections-open` prop.

A **string array** is required to be passed via `active-section-name` prop when in multiple mode.

<accordion-example multiple/>

```html

<slds-accordion
    allow-multiple-sections-open
    :active-section-names="activeSectionNames"
    :sections="sections"
/>
```

### Implementation

An accordion is implemented as an unordered list. Inside the list, each chunk of content is a section with a
`slds-accordion-section` component. The list of sections can be passed via prop, as an array of `AccordionSection` or
via slot.

#### Implementation via prop

To implement the accordion sections via prop, you need to pass an array of [AccordionSection](#accordionsection) to the
`sections` property.

<accordion-example via-prop/>

```html

<slds-accordion
    :active-section-name="activeSectionName"
    :sections="sections"
/>
```

```js
const activeSectionName = 'accordion-a'
const sections = [
    {
        content: "Accordion details - A",
        label: "Accordion Summary A",
        name: "accordion-a"
    },
    {
        content: "Accordion details - B",
        label: "Accordion Summary B",
        name: "accordion-b"
    },
    {
        content: "Accordion details - C",
        label: "Accordion Summary C",
        name: "accordion-c"
    },
]
```

#### Implementation via slot

To implement the accordion sections via slot, you need pass `slds-accordion-section` components to the default slot.

<accordion-example via-slot/>

```html

<slds-accordion :active-section-name="activeSectionName">

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
```

```js
const activeSectionName = 'accordion-a'
```

## API

API defines props, emits, slots, and others for the Button component.

### Interfaces

Typescript interfaces available for use.

#### AccordionSection

| Name    | Type   | Description                                                                                       |
|---------|--------|---------------------------------------------------------------------------------------------------|
| content | string | The content in the accordion section.                                                             |
| label   | string | The text that displays as the title of the section.                                               |
| name    | string | The unique section name to use with the active-section-name attribute in the accordion component. |

### Props

Any property such as style and class are passed to the underlying unordered list wrapping.
Following are the additional properties to configure the component.

| Name                         | Type                                    | Required | Default | Description                                                                                                                                                                                                                                                              |
|------------------------------|-----------------------------------------|----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| active-section-name          | string                                  | false    | null    | Expands the specified accordion sections. Pass in a string for a single section or a list of section names. To support multiple expanded sections, include allow-multiple-sections-open in your markup. By default, only the first section in the accordion is expanded. |
| active-section-names         | string[]                                | false    | []      | Expands the specified accordion sections. Pass in a string for a single section or a list of section names. To support multiple expanded sections, include allow-multiple-sections-open in your markup. By default, only the first section in the accordion is expanded. |
| allow-multiple-sections-open | boolean                                 | false    | false   | If present, the accordion allows multiple open sections. Otherwise, opening a section closes another that's currently open.                                                                                                                                              |
| sections                     | [AccordionSection](#accordionsection)[] | false    | null    | Accordion sections.                                                                                                                                                                                                                                                      |

### Slots

Following are the available slots for this component.

| Name    | Optional | Description                                                |
|---------|----------|------------------------------------------------------------|
| default | true     | The slot to place the `slds-accordion-section` components. |

### Emits

Other than the standard events that the ul element emits, following are the custom events this component emits.

| Name                  | Parameters              | Description                                                                    |
|-----------------------|-------------------------|--------------------------------------------------------------------------------|
| active-section-change | value: string, string[] | Emitted when the active section changes. Send the section name as a parameter. |

## References

- [Lightning Design System Accordion](https://www.lightningdesignsystem.com/components/accordion/)
- [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/)
- [Salesforce Lightning Design System GitHub](https://github.com/salesforce-ux/design-system)
