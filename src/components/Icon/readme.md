# Icon

Icons provide visual context and enhance usability.

## Props

| Name     | Type    | Required | Default | Description |
| -------- | ------- | -------- | ------- | ----------- |
| iconName | String  | true     |         | The Lightning Design System name of the icon.<br>Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. |
| size     | String  | false    | medium  | The size of the icon.<br>Options include xx-small, x-small, small, medium, or large.<br>This value defaults to medium. |
| variant  | String  | false    |         | The variant changes the appearance of a utility icon.<br>Accepted variants include inverse, default, success, warning, error, and light. |

## Background Color
To change a background color for action, custom, or standard icons, use composed class names:

`.slds-icon-[sprite name]-[icon name]`

If no class following the above patter is present, the Icon component will automatically assign one based on its nameIcon prop.

## Examples

```vue
<slds-icon icon-name="utility:down"/>

<slds-icon icon-name="utility:check" variant="success"/>

<slds-icon icon-name="standard:account" size="large"/>
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/icons/)<br>
[Aura documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning:icon)<br>
[LWC documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-icon)<br>