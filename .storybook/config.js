import { configure } from '@storybook/vue';

// Importing styles
import '../public/assets/styles/salesforce-lightning-design-system.min.css'
import './style.css'

// automatically import all files ending in *.stories.js
configure(require.context('../src/components', true, /stories\.js$/), module);
