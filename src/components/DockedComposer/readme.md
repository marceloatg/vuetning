# Docked Composer ![avaliability](https://img.shields.io/badge/avaliability-available-green.svg)  ![testing](https://img.shields.io/badge/testing-untested-red.svg) ![documentation](https://img.shields.io/badge/documentation-documented-green.svg)

Docked Composer is a persistent utility bar that allows a user to continually use the app to complete tasks or gather information while expanding/collapsing a composer window.

## Props

| Name              | Type    | Required | Default | Description |
| ----------------- | ------- | -------- | ------- | ----------- |
| hasExpandButton   | String  | false    | true    | Indicates whether or not the docked composer has a expand button.<br>Default is true. |
| hasMinimizeButton | Boolean | false    | true    | Indicates whether or not the docked composer has a minimize button.<br>Default is true. |
| heading           | String  | true     |         | The docked composer heading text. |
| iconName          | String  | true     |         | The docked composer icon name.<br>The Lightning Design System name of the icon.<br>Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. |

## Slots

| Name    | Optional | Description |
| ------- | -------- | ----------- |
| body    | false    | The content to be placed inside the docked composer. |
| footer  | true     | The content to be placed in the footer of the docked composer. |

## Events

| Name     | Arguments | Description |
| -------- | --------- | ----------- |
| close    |           | Fired when the close button is clicked. |
| erect    |           | Fired when the erect window button is clicked. |
| expand   |           | Fired when the expand window button is clicked. |
| minimize |           | Fired when the minimize window button is clicked. |

## Examples

```vue
<div class="slds-docked_container">
    <slds-docked-composer heading="My docked composer" icon-name="utility:chat" @close="onClose">

        <template #body>
            <div class="slds-align_absolute-center">
                Docked Composer Panel Body <br>
                This area consumes the feature
            </div>
        </template>

        <template #footer>
            <div class="slds-col_bump-left slds-text-align_right">
                <slds-button label="Action" variant="brand"/>
            </div>
        </template>

    </slds-docked-composer>
</div>
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/docked-composer/)<br>
