# Checkbox ![avaliability](https://img.shields.io/badge/avaliability-available-green.svg)  ![testing](https://img.shields.io/badge/testing-tested-green.svg) ![documentation](https://img.shields.io/badge/documentation-documented-green.svg)

A checkable input that communicates if an option is true or false.

## Props

| Name         | Type    | Required | Default | Description |
| ------------ | ------- | -------- | ------- | ----------- |
| checked      | Boolean | false    | false   | If present, the checkbox is selected.<br>Default is false. |
| disabled     | Boolean | false    | false   | If present, the input field is disabled and users cannot interact with it.<br>Default is false. |
| errorMessage | String  | false    |         | Error message to be displayed when the hasError is true. |
| hasError     | Boolean | false    | false   | Indicates whether or not the input has an error.<br>Default is false. |
| label        | String  | false    | false   | Text label for the input. |
| readOnly     | Boolean | false    | false   | If present, the input field is read-only and cannot be edited by users.<br>Default is false. |
| required     | Boolean | false    | false   | If present, the input field must be filled out before the form is submitted.<br>Default is false. |
| variant      | String  | false    | stacked | The variant changes the appearance of an input field.<br>Accepted variants include stacked and inline.<br>Default is 'stacked'. |

## Events

| Name           | Arguments | Description |
| -------------- | --------- | ----------- |
| input          | value     | Fired when the checkbox is clicked.<br>`v-model` binding available. |

## Examples

```vue
<slds-checkbox label="My inline checkbox" variant="inline"/>

<slds-checkbox label="My stacked checkbox" variant="stacked"/>

<slds-checkbox label="My checked checkbox" :checked="true"/>

<slds-checkbox label="My read only checkbox" :read-only="true"/>

<slds-checkbox label="My disabled checkbox" :disabled="true"/>

<slds-checkbox label="My required checkbox" :required="true"/>

<slds-checkbox label="My checkbox with error" :has-error="true" error-message="Nope!"/>
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/checkbox/)<br>
[Aura documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning:input/example#lightningComponentDemo:exampleInputCheckbox)<br>
[LWC documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-input/example)<br>
