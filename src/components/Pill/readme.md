# Pill ![avaliability](https://img.shields.io/badge/avaliability-beta-orange.svg)  ![testing](https://img.shields.io/badge/testing-untested-red.svg) ![documentation](https://img.shields.io/badge/documentation-documented-green.svg)

A pill represents an object that can be viewed with or without an icon

### Props

| Name      | Type    | Required | Default | Description |
| --------- | ------- | -------- | ------- | ----------- |
| label     | String  | true     |         | The text label that displays in the pill. |
| name      | String  | false    |         | The name for the pill.<br>This value is optional and can be used to identify the pill when firing events. |
| clickable | Boolean | false    | true    | Indicates whether or not the pill is clickable.<br>If true, when the pill is clicked a "click" event is fired.<br>Default is true. |

### Events

| Name   | Arguments | Description |
| ------ | --------- | ----------- |
| click  | name      | Fired when a clickable pill is clicked.<br>Passes as argument the pill name. |
| remove | name      | Fired when the remove button is clicked.<br>Passes as argument the pill name. |

### Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/pills/)<br>
[Aura documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning:pill)<br>
[LWC documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-pill)<br>