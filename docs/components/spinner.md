---
outline: deep
---

<script setup>
import SpinnerExample from "../examples/spinner-example.vue"
</script>

<h1 class="component-title">
Spinner
</h1>

<h3>
Spinners are CSS loading indicators that should be shown when retrieving data or performing slow computations. 
In some cases, the first time a parent component loads, a stencil is preferred to indicate network activity.
</h3>

<spinner-example show-case/>

## Usage

To use the spinner in a component, the parent of the spinner should be set to `position:relative`. You can use the
utility
class `.slds-is-relative` or add the declaration to your custom component CSS. If you are using the spinner in an iframe
and dynamically loading DOM nodes after the page has loaded, it is recommended that you set the `slds-spinner-container`
to `position:fixed` so that it remains centered in the viewport. The background overlay for the spinner is an optional
element.

### Base

Lorem ipsum

<spinner-example base/>

```html

<slds-spinner/>
```

### Bar

Lorem ipsum

## API

API defines props, emits, slots, and others for the Button component.

### Props

Any property such as style and class are passed to the underlying unordered list wrapping.
Following are the additional properties to configure the component.

#### General Props

| Name           | Type    | Required | Default | Description                                                                           |
|----------------|---------|----------|---------|---------------------------------------------------------------------------------------|
| assistive-text | string  | false    | null    | The alternative text used to describe the reason for the wait and need for a spinner. |
| delayed        | boolean | false    | false   | Indicates whether the spinner has a delay before starting the animation.              |
| inline         | boolean | false    | false   | Indicates whether to display the spinner in an inline format.                         |
| text           | string  | false    | false   | An optional text displayed below the spinner. .                                       |

#### Variant Props

| Name    | Type    | Required | Default | Description                                             |
|---------|---------|----------|---------|---------------------------------------------------------|
| brand   | boolean | false    | false   | Indicates whether the button has the brand theme.       |
| inverse | boolean | false    | false   | Indicates whether the button has the destructive theme. |

#### Size Props

| Name     | Type    | Required | Default | Description                                                                                                    |
|----------|---------|----------|---------|----------------------------------------------------------------------------------------------------------------|
| xx-small | boolean | false    | false   | Indicates whether the spinner uses the extra-extra-small size.                                                 |
| x-small  | boolean | false    | false   | Indicates whether the spinner uses the extra-small size.                                                       |
| small    | boolean | false    | false   | Indicates whether the spinner uses the small size.                                                             |
| medium   | boolean | false    | true    | Indicates whether the spinner uses the medium size. If no other size is set, this one will be used by default. |
| large    | boolean | false    | false   | Indicates whether the spinner uses the large size.                                                             |

### Slots

No slots are available for this component.

### Emits

Other than the standard events that the div element emits, this component does not emit any custom events.

## References

- [Lightning Design System Spinners](https://www.lightningdesignsystem.com/components/spinners/)
- [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/)
- [Salesforce Lightning Design System GitHub](https://github.com/salesforce-ux/design-system)
