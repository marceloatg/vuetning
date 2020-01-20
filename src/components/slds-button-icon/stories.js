import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, text, withKnobs} from '@storybook/addon-knobs';

import SldsButtonIcon from './index';

const stories = storiesOf('Button Icon', module);

stories.addDecorator(withKnobs);

stories.add('Base', () => ({
    components: {SldsButtonIcon},
    props: {
        icon: {
            default: text('icon', 'utility:settings')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        hasDropdown: {
            default: boolean('has-dropdown', false)
        },
    },
    template: '<slds-button-icon ' +
        ':icon="icon" ' +
        ':disabled="disabled" ' +
        ':has-dropdown="hasDropdown" ' +
        ' @click="action" ' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Container', () => ({
    components: {SldsButtonIcon},
    props: {
        icon: {
            default: text('icon', 'utility:settings')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        hasDropdown: {
            default: boolean('has-dropdown', false)
        },
        bare: {
            default: boolean('bare', false)
        },
        bordered: {
            default: boolean('bordered', false)
        },
        borderedFilled: {
            default: boolean('bordered-filled', false)
        },
        borderedInverse: {
            default: boolean('bordered-inverse', false)
        },
    },
    template: '<div style="padding:0.5rem;background-color:#f4f6f9">' +
        '<slds-button-icon ' +
        ':icon="icon" ' +
        ':disabled="disabled" ' +
        ':has-dropdown="hasDropdown" ' +
        ':bare="bare" ' +
        ':bordered="bordered" ' +
        ':bordered-filled="borderedFilled" ' +
        ':bordered-inverse="borderedInverse" ' +
        ' @click="action" ' +
        '/>' +
        '</div>',
    methods: {action: action('clicked')},
}));

stories.add('Variant', () => ({
    components: {SldsButtonIcon},
    props: {
        icon: {
            default: text('icon', 'utility:settings')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        hasDropdown: {
            default: boolean('has-dropdown', false)
        },
        brand: {
            default: boolean('brand', false)
        },
        inverse: {
            default: boolean('inverse', false)
        },
        error: {
            default: boolean('error', false)
        },
    },
    template: '<div style="padding:0.5rem;background-color:#f4f6f9">' +
        '<slds-button-icon ' +
        ':icon="icon" ' +
        ':disabled="disabled" ' +
        ':has-dropdown="hasDropdown" ' +
        ':brand="brand" ' +
        ':inverse="inverse" ' +
        ':error="error" ' +
        '@click="action" ' +
        '/>' +
        '</div>',
    methods: {action: action('clicked')},
}));

stories.add('Bare Icon Size', () => ({
    components: {SldsButtonIcon},
    props: {
        icon: {
            default: text('icon', 'utility:settings')
        },
        xSmall: {
            default: boolean('x-small', false)
        },
        small: {
            default: boolean('small', false)
        },
        large: {
            default: boolean('large', false)
        },
    },
    template: '<slds-button-icon ' +
        ':icon="icon" ' +
        ':x-small="xSmall" ' +
        ':small="small" ' +
        ':large="large" ' +
        '@click="action" ' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Icon Container Size', () => ({
    components: {SldsButtonIcon},
    props: {
        icon: {
            default: text('icon', 'utility:settings')
        },
        xxSmall: {
            default: boolean('xx-small', false)
        },
        xSmall: {
            default: boolean('x-small', false)
        },
        small: {
            default: boolean('small', false)
        },
    },
    template: '<slds-button-icon ' +
        ':icon="icon" ' +
        'bordered ' +
        ':xx-small="xxSmall" ' +
        ':x-small="xSmall" ' +
        ':small="small" ' +
        '@click="action" ' +
        '/>',
    methods: {action: action('clicked')},
}));
