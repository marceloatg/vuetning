# Button ![avaliability](https://img.shields.io/badge/avaliability-available-green.svg)  ![testing](https://img.shields.io/badge/testing-partial-yellow.svg) ![documentation](https://img.shields.io/badge/documentation-documented-green.svg)

Buttons are clickable items used to perform an action.

## Props
Any button html tag attributes can be set to slds-button, plus the following custom attributes:

### General

| Name     | Type    | Required | Default | Description |
| -------- | ------- | -------- | ------- | ----------- |
| label    | String  | false    |         | The text to be displayed inside the button. |
| spinner  | Boolean | false    | false   | Set the spinner as visible and hide the button label and icon.<br>When the spinner is shown the button becomes unclickable. |
| stretch  | Boolean | false    | false   | allow the button's width to take up the entire width available. |

### Variants

| Name            | Type    | Required | Default | Description |
| --------------- | ------- | -------- | ------- | ----------- |
| neutral         | Boolean | false    | false   | Add the `slds-button_neutral` class to create a neutral button. |
| brand           | Boolean | false    | false   | Add the `slds-button_brand` class to create a neutral button. |
| outlineBrand    | Boolean | false    | false   | Add the `slds-button_outline-brand` class to create a outline brand button. |
| destructive     | Boolean | false    | false   | Add the `slds-button_destructive` class to create a destructive button. |
| textDestructive | Boolean | false    | false   | Add the `slds-button_text-destructive` class to create a text destructive button. |
| success         | Boolean | false    | false   | Add the `slds-button_success` class to create a success button. |
| inverse         | Boolean | false    | false   | Add the `slds-button_inverse` class to create a inverse  button. |

### Icon

| Name  | Type    | Required | Default | Description |
| ----- | ------- | -------- | ------- | ----------- |
| icon  | String  | false    |         | The Lightning Design System name of the icon.<br>Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. |
| left  | Boolean | false    | true    | Set the position of the icon to the left with respect to body.<br>This value defaults to left. |
| right | Boolean | false    | false   | Set the position of the icon to the right with respect to body. |

## Examples

```vue
<slds-button label="My button"/>

<slds-button label="My brand button" brand/>

<slds-button label="Add" icon="utility:add"/>

<slds-button label="Delete" icon="utility:delete" right/>

<slds-button label="My button" :spinner/>

```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/buttons/)<br>
[Aura documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning:button)<br>
[LWC documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-button)<br>
