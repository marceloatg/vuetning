# Toast ![avaliability](https://img.shields.io/badge/avaliability-available-green.svg)  ![testing](https://img.shields.io/badge/testing-tested-green.svg) ![documentation](https://img.shields.io/badge/documentation-documented-green.svg)

Toast serves as a feedback & confirmation mechanism after the user takes an action.

## Props

| Name      | Type    | Required | Default  | Description |
| --------- | ------- | -------- | -------- | ----------- |
| iconName  | String  | false    |          | The Lightning Design System name of the icon.<br>Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. |
| variant   | String  | false    | base     | The variant changes the appearance of a toast.<br>Accepted variants include base, error, success, and warning.<br>Default variant is base. |

## Slots

| Name    | Optional | Description |
| ------- | -------- | ----------- |
| heading | false    | The main content of the toast. |
| details | true     | Details to be displayed bellow the heading. |

## Events

| Name           | Arguments | Description |
| -------------- | --------- | ----------- |
| close          |           | Fired when the close button is clicked. |

## Examples

```vue
<slds-toast icon-name="utility:check" variant="success">

    <template #heading>
        You've successfully some errors when trying to save edits to <a> what happened </a>.
    </template>

</slds-toast>

<slds-toast icon-name="utility:error" variant="error">

    <template #heading>
        You've encountered some errors when trying to save edits to Samuel Smith.
    </template>

    <template #details>        
        Here's some detail of <a> what happened </a>, being very descriptive and transparent.      
    </template>

</slds-toast>
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/toast/)<br>
