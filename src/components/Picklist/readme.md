# Picklist ![avaliability](https://img.shields.io/badge/avaliability-available-green.svg)  ![testing](https://img.shields.io/badge/testing-untested-red.svg) ![documentation](https://img.shields.io/badge/documentation-documented-green.svg)

A Picklist provides a user with an read-only input field that is accompanied with a listbox of pre-defined options. A picklist has a single and multi-selection pattern.

### Props

| Name           | Type            | Required | Default          | Description |
| -------------- | --------------- | -------- | ---------------- | ----------- |
| disabled       | Boolean         | false    | false            | If true, the comboxbox is disabled and users cannot interact with it. |
| label          | String          | false    |                  | Text label for the picklist. |
| length         | String, Number  | false    | fluid            | The dropdown length for the picklist. If fluid, the dropdown will expand according to the amount of items to show, otherwise forces overflow scrolling after the specified length of items.<br>Accepted lengths include "fluid", 5, 7, and 10.<br>The default is fluid. |
| option         | Object (Option) | false    |                  | A preselected option.<br>Does not need to be present within the list of options. |
| options        | Array           | true     |                  | A list of options that are available for selection and optionally headings for grouping.<br>Each **option** has the following attributes: disabled, label, meta, and value.<br>Each **heading** has the following attributes: heading.<br> |
| placeholder    | String          | false    | Select an Option | Text that is displayed before an option is selected, to prompt the user to select an option.<br>The default is "Select an Option". |
| required       | Boolean         | false    | false            | If true, a value must be selected before the form can be submitted. |
| size           | String          | false    | full             | The container size for the picklist.<br>Accepted sizes include xx-small, x-small, small, medium, large, x-large, xx-large, and full.<br>The default is full. |
| spinner-active | Boolean         | false    | false            | If true, a spinner is displayed below the menu items to indicate loading activity. |

### Events

| Name        | Arguments | Description |
| ----------- | --------- | ----------- |

### Object examples

#### Option
```json
{
  "disabled": false,
  "label": "My awesome option",
  "meta": "My meta optional description",
  "value": "a6d3dbd7-effb-42ee-96ad-f5c95794b3c8"
}
```

#### Heading
```json
{
  "heading": "My group heading"
}
```

### Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/picklist/)<br>
[Aura documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning:combobox)<br>
[LWC documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-combobox/example)<br>
