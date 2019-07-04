# Modal ![avaliability](https://img.shields.io/badge/avaliability-available-green.svg)  ![testing](https://img.shields.io/badge/testing-tested-green.svg) ![documentation](https://img.shields.io/badge/documentation-documented-green.svg)

Modals are used to display content in a layer above the app. This paradigm is used in cases such as the creation or editing of a record, as well as various types of messaging and wizards.

## Props

| Name                 | Type    | Required | Default              | Description |
| -------------------- | ------- | -------- | -------------------- | ----------- |
| bodyClass            | String  | false    | slds-p-around_medium | The class to be applied to the modal content element.<br>Default is 'slds-p-around_medium'. |
| footerClass          | String  | false    | slds-p-around_medium | The class to be applied to the modal content element. |
| headerClass          | String  | false    | slds-p-around_medium | The class to be applied to the modal content element. |
| size                 | String  | false    | default              | The size of the modal.<br>Accepted sizes include default, small, medium, and large.<br>Default is 'default'. |

## Slots

| Name    | Optional | Description |
| ------- | -------- | ----------- |
| header  | true     | The modal header. |
| content | false    | The content to be placed inside the modal. |
| footer  | true     | The modal footer. |

## Events

| Name           | Arguments | Description |
| -------------- | --------- | ----------- |
| close          |           | Fired when the close button inside the header is clicked. |

## Examples

```vue
<slds-modal @close="onClose">

    <template #header>

        <h2 class="slds-text-heading_medium slds-hyphenate">
            My custom modal
        </h2>

        <p class="slds-m-top_x-small">
            Cras quam sapien, eleifend id dapibus vel, porta et massa.
        </p>

    </template>

    <template #content>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
    </template>

    <template #footer>
        <slds-button label="Discard"/>
        <slds-button label="Confirm" brand/>
    </template>

</slds-modal>

<!-- body only -->
<slds-modal @close="onClose">
    <template #content>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
    </template>
</slds-modal>
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/modals/)<br>
