# Avatar

An avatar component represents an object or entity.

## Props

| Name     | Type    | Required | Default | Description |
| -------- | ------- | -------- | ------- | ----------- |
| initials | String  | false    |         | The Lightning Design System name of the icon used as a fallback when the image fails to load.<br>The initials fallback relies on this for its background color.<br>Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.<br>Only icons from the standard and custom categories are allowed. |
| inverse  | Boolean | false    | false   | Used for initials that are dark text on light background. |
| size     | String  | false    | medium  | The size of the avatar.<br>Valid values are x-small, small, medium, and large.<br>This value defaults to medium. |
| src      | String  | false    |         | The URL for the image. |
| variant  | String  | false    | square  | The variant changes the shape of the avatar.<br>Valid values are empty, circle, and square.<br>This value defaults to square. |

## Examples

```vue
<slds-avatar src="/assets/images/avatar1.jpg"/>

<slds-avatar src="/assets/images/avatar1.jpg" size="x-small"/>

<slds-avatar src="/assets/images/avatar1.jpg" variant="circle"/>
        
<slds-avatar initials="AB" fallback-icon-name="standard:account"/>
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/avatar/)<br>
[Aura documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning:avatar)<br>
[LWC documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-avatar)<br>