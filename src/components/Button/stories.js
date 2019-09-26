import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, text, withKnobs} from '@storybook/addon-knobs';

import SldsButton from './Index';

const stories = storiesOf('Button', module);

stories.addDecorator(withKnobs);

stories.add('Base', () => ({
    components: {SldsButton},
    props: {
        disabled: {
            default: boolean('disabled', false)
        },
        label: {
            default: text('label', 'Basic Button')
        },
        spinner: {
            default: boolean('spinner', false)
        },
        stretch: {
            default: boolean('stretch', false)
        },
    },
    template: '<slds-button ' +
        ':label="label" ' +
        ':spinner="spinner" ' +
        ':stretch="stretch" ' +
        ':disabled="disabled"' +
        ' @click="action"' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Neutral', () => ({
    components: {SldsButton},
    props: {
        disabled: {
            default: boolean('disabled', false)
        },
        label: {
            default: text('label', 'Neutral Button')
        },
        spinner: {
            default: boolean('spinner', false)
        },
        stretch: {
            default: boolean('stretch', false)
        },
    },
    template: '<slds-button ' +
        'neutral ' +
        ':label="label" ' +
        ':spinner="spinner" ' +
        ':stretch="stretch" ' +
        ':disabled="disabled"' +
        ' @click="action"' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Brand', () => ({
    components: {SldsButton},
    props: {
        disabled: {
            default: boolean('disabled', false)
        },
        label: {
            default: text('label', 'Brand Button')
        },
        spinner: {
            default: boolean('spinner', false)
        },
        stretch: {
            default: boolean('stretch', false)
        },
    },
    template: '<slds-button ' +
        'brand ' +
        ':label="label" ' +
        ':spinner="spinner" ' +
        ':stretch="stretch" ' +
        ':disabled="disabled"' +
        ' @click="action"' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Outline Brand', () => ({
    components: {SldsButton},
    props: {
        disabled: {
            default: boolean('disabled', false)
        },
        label: {
            default: text('label', 'Outline Brand Button')
        },
        spinner: {
            default: boolean('spinner', false)
        },
        stretch: {
            default: boolean('stretch', false)
        },
    },
    template: '<slds-button ' +
        'outline-brand ' +
        ':label="label" ' +
        ':spinner="spinner" ' +
        ':stretch="stretch" ' +
        ':disabled="disabled"' +
        ' @click="action"' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Success', () => ({
    components: {SldsButton},
    props: {
        disabled: {
            default: boolean('disabled', false)
        },
        label: {
            default: text('label', 'Success Button')
        },
        spinner: {
            default: boolean('spinner', false)
        },
        stretch: {
            default: boolean('stretch', false)
        },
    },
    template: '<slds-button ' +
        'success ' +
        ':label="label" ' +
        ':spinner="spinner" ' +
        ':stretch="stretch" ' +
        ':disabled="disabled"' +
        ' @click="action"' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Destructive', () => ({
    components: {SldsButton},
    props: {
        disabled: {
            default: boolean('disabled', false)
        },
        label: {
            default: text('label', 'Destructive Button')
        },
        spinner: {
            default: boolean('spinner', false)
        },
        stretch: {
            default: boolean('stretch', false)
        },
    },
    template: '<slds-button ' +
        'destructive ' +
        ':label="label" ' +
        ':spinner="spinner" ' +
        ':stretch="stretch" ' +
        ':disabled="disabled"' +
        ' @click="action"' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Text Destructive', () => ({
    components: {SldsButton},
    props: {
        disabled: {
            default: boolean('disabled', false)
        },
        label: {
            default: text('label', 'Text Destructive Button')
        },
        spinner: {
            default: boolean('spinner', false)
        },
        stretch: {
            default: boolean('stretch', false)
        },
    },
    template: '<slds-button ' +
        'text-destructive ' +
        ':label="label" ' +
        ':spinner="spinner" ' +
        ':stretch="stretch" ' +
        ':disabled="disabled"' +
        ' @click="action"' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Inverse', () => ({
    components: {SldsButton},
    props: {
        disabled: {
            default: boolean('disabled', false)
        },
        label: {
            default: text('label', 'Inverse Button')
        },
        spinner: {
            default: boolean('spinner', false)
        },
        stretch: {
            default: boolean('stretch', false)
        },
    },
    template: '<div style="background-color:#16325c;padding:0.5rem;">' +
        '<slds-button ' +
        'inverse ' +
        ':label="label" ' +
        ':spinner="spinner" ' +
        ':stretch="stretch" ' +
        ':disabled="disabled"' +
        ' @click="action"' +
        '/>' +
        '</div>',
    methods: {action: action('clicked')},
}));

stories.add('Icon', () => ({
    components: {SldsButton},
    props: {
        icon: {
            default: text('icon', 'utility:save')
        },
        label: {
            default: text('label', 'Neutral Button')
        },
        right: {
            default: boolean('right', false)
        },
    },
    template: '<slds-button ' +
        ':label="label" ' +
        'neutral ' +
        ':icon="icon" ' +
        ':right="right" ' +
        '@click="action"' +
        '/>',
    methods: {action: action('clicked')},
}));
