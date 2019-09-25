import {addParameters, configure} from '@storybook/vue';
import yourTheme from './lightningTheme';

// Importing styles
import '../public/assets/styles/salesforce-lightning-design-system.min.css'
import './style.css'

addParameters({
    options: {
        theme: yourTheme,
    },
});

configure(require.context('../src/components', true, /stories\.js$/), module);
