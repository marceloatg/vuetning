# Checkbox Button ![avaliability](https://img.shields.io/badge/avaliability-available-green.svg)  ![testing](https://img.shields.io/badge/testing-tested-green.svg) ![documentation](https://img.shields.io/badge/documentation-documented-green.svg)

A styled checkable input that communicates if an option is being added to a group

## Props

| Name         | Type    | Required | Default | Description |
| ------------ | ------- | -------- | ------- | ----------- |
| checked      | Boolean | false    | false   | If present, the checkbox is selected.<br>Default is false. |
| disabled     | Boolean | false    | false   | If present, the input field is disabled and users cannot interact with it.<br>Default is false. |

## Events

| Name           | Arguments | Description |
| -------------- | --------- | ----------- |
| input          | value     | Fired when the checkbox button is clicked.<br>`v-model` binding available. |

## Examples

```vue
<slds-checkbox-button v-model="myBoolean"/>

<slds-checkbox-button :checked="true" v-model="myBoolean"/>

<slds-checkbox-button :disabled="true" v-model="myBoolean"/>
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/checkbox-button/)<br>
[Aura documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning:input/example#lightningComponentDemo:exampleInputCheckboxButton)<br>
[LWC documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-input/example)<br>
