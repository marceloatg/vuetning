# Modal ![avaliability](https://img.shields.io/badge/avaliability-available-green.svg)  ![testing](https://img.shields.io/badge/testing-tested-green.svg) ![documentation](https://img.shields.io/badge/documentation-documented-green.svg)

Modals are used to display content in a layer above the app. This paradigm is used in cases such as the creation or editing of a record, as well as various types of messaging and wizards.

## Props

| Name                 | Type    | Required | Default              | Description |
| -------------------- | ------- | -------- | -------------------- | ----------- |
| bodyClass            | String  | false    | slds-p-around_medium | The class to be applied to the modal content element.Default is 'slds-p-around_medium'. |
| headerEmpty          | Boolean | false    | false                | Indicates whether or not the modal header has no content.<br>Default is false. |
| heading              | String  | true*    |                      | The modal heading text.<br>Not required when the header is empty. |
| primaryButtonLabel   | String  | false    | Save                 | The label to be displayed in the primary button when no footer slot is provided.<br>Default is 'Save'. |
| secondaryButtonLabel | String  | false    | Cancel               | The label to be displayed in the secondary button when no footer slot is provided.<br>Default is 'Cancel'. |
| size                 | String  | false    | default              | The size of the modal.<br>Accepted sizes include default, small, medium, and large.<br>Default is 'default'. |

## Slots

| Name    | Optional | Description |
| ------- | -------- | ----------- |
| tagline | true     | Tagline placed bellow the heading text inside the header. |
| body    | false    | The content to be placed inside the modal. |
| footer  | true     | Replaces the default footer. |

## Events

| Name           | Arguments | Description |
| -------------- | --------- | ----------- |
| close          |           | Fired when the close button inside the header is clicked. |
| primaryclick   |           | Fired when the the primary button in the default footer is clicked. |
| secondaryclick |           | Fired when the the secondary button in the default footer is clicked. |

## Examples

```vue
<!-- Generic modal -->
<slds-modal heading="My modal" @close="onClose" @primaryclick="onPrimaryClick" @secondaryclick="onSecondaryClick">
    <template #body>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
    </template>
</slds-modal>

<!-- Empty header modal -->
<slds-modal :header-empty="true" @close="onClose" @primaryclick="onPrimaryClick" @secondaryclick="onSecondaryClick">
    <template #body>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
    </template>
</slds-modal>

<!-- Custom modal -->
<slds-modal heading="My custom modal" @close="onClose">

    <template #tagline>
        <p class="slds-m-top_x-small">
            Cras quam sapien, eleifend id dapibus vel, porta et massa.
        </p>
    </template>

    <template #body>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
    </template>

    <template #footer>
        <slds-button label="Discard"/>
        <slds-button label="Confirm" variant="brand"/>
    </template>

</slds-modal>
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/modals/)<br>
