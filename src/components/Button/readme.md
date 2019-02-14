# Button

Buttons are clickable items used to perform an action.

## Props

| Name         | Type    | Required | Default | Description |
| ------------ | ------- | -------- | ------- | ----------- |
| disabled     | Boolean | false    | false   | Specifies whether this button should be displayed in a disabled state.<br>Disabled buttons can't be clicked.<br>This value defaults to false. |
| iconName     | String  | false    |         | The Lightning Design System name of the icon.<br>Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. |
| iconPosition | String  | false    | left    | Describes the position of the icon with respect to body.<br>Options include left and right.<br>This value defaults to left. |
| label        | String  | false    |         | The text to be displayed inside the button. |

## Examples

```vue
<slds-button label="My button"/>

<slds-button label="Add" icon-name="utility:add"/>

<slds-button label="Delete" icon-name="utility:delete" icon-position="right"/>
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/buttons/)<br>
[Aura documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning:button)<br>
[LWC documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-button)<br>