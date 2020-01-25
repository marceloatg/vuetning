<p align="center">
    <img width="160"src="https://s3.amazonaws.com/arcthos.com/vuetning/logo.svg">
</p>

# Vuetning [![vuetning](https://img.shields.io/npm/v/vuetning.svg)](https://www.npmjs.org/package/vuetning) ![Dependencies](https://img.shields.io/david/ArcthosCompany/Vuetning.svg) [![NPM downloads](https://img.shields.io/npm/dt/vuetning.svg)](https://npmjs.org/package/vuetning) ![gzip size](http://img.badgesize.io/https://unpkg.com/vuetning/dist/vuetning.common.js?compression=gzip&label=gzip%20size)

## Introduction
[Vuetning](https://marceloatg.github.io/vuetning) is a Salesforce Lightning Design System framework for Vue.js 2...

## Components

* [Avatar](https://marceloatg.github.io/vuetning/components/avatar.html)
* [Button](https://marceloatg.github.io/vuetning/components/button.html)
* [Checkbox Button](https://marceloatg.github.io/vuetning/components/checkbox-button.html)

## Browser Support
Vuetning is being developed in recent versions of **Chrome**. Support for **Safari**, **Firefox**, **Edge** and **Opera** will be added in the future.

## Quick-start CDN

```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>
<body>
  <div id="app">
    <slds-button brand label="Hello World"/>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuetning/dist/vuetning.umd.min.js"></script>
  <script>
    new Vue({
      el: '#app'
    })
  </script>
</body>
</html>
```

## CDN Links

- https://cdn.jsdelivr.net/npm/vuetning/dist/vuetning.umd.min.js
- https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system

# Install inside a NPM project
Vuetning is available as [npm](https://www.npmjs.com/package/vuetning) and [yarn](https://yarnpkg.com/package/vuetning) packages.

``` bash
# npm
npm install vuetning
```

``` bash
# yarn
yarn add vuetning
```

## Usage
In your `main.js`, or similar entry point, install vuetning using:

### All components

```javascript
import Vue from 'vue'
import Vuetning from 'vuetning'

Vue.use(Vuetning)
```

### Or use individual components:

```javascript
import Vue from 'vue'
import { sldsButton, sldsCombobox, sldsModal } from 'vuetning'

Vue.use(sldsButton)
Vue.use(sldsCombobox)
Vue.use(sldsModal)
```

## Assets

TBD 

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
