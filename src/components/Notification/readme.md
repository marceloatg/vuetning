# Notification ![avaliability](https://img.shields.io/badge/avaliability-available-green.svg)  ![testing](https://img.shields.io/badge/testing-tested-green.svg) ![documentation](https://img.shields.io/badge/documentation-documented-green.svg)

Notifications serve as a feedback and confirmation mechanism that comes into the page at the top right.

## Props

| Name      | Type   | Required | Default | Description |
| --------- | ------ | -------- | ------- | ----------- |
| iconClass | String | false    |         | Class applied to the inner icon component. |
| iconName  | String | true     |         | The Lightning Design System name of the icon.<br>Names are written in the format 'standard:event' where 'standard' is the category, and 'event' is the specific icon to be displayed.<br>Only standard icons should be used in this component. |
| message   | String | false    |         | Message text, displayed as a paragraph. |
| subject   | String | false    |         | Subject text, displayed as a header. |

## Events

| Name           | Arguments | Description |
| -------------- | --------- | ----------- |
| click          |           | Fired when the close button is clicked.|
| close          |           | Fired when the notification is clicked.|

## Examples

```vue
<!-- Single notification -->
<slds-notification 
    icon-name="standard:event" 
    message="Notification message"
    subject="Notification subject"
    @click="onClick()"
    @close="onClose()"/>

<!-- Multiple notifications -->
<div class="slds-notification-container">
    <slds-notification
        v-for="(notification, index) in notifications"
        :icon-class="notification.iconClass"
        :icon-name="notification.iconName"
        :key="notification.name"
        :message="notification.message"
        :name="notification.name"
        :subject="notification.subject"
        @click="onClick(index)"
        @close="onClose(index)"/>
</div>
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/notifications/)<br>
