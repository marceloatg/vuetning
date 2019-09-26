import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, number, text, withKnobs} from '@storybook/addon-knobs';

import SldsProgressBar from './index';

const stories = storiesOf('Progress Bar', module);

stories.addDecorator(withKnobs);

stories.add('Base', () => ({
    components: {SldsProgressBar},
    props: {
        progress: {
            default: number('progress', 25)
        },
        circular: {
            default: boolean('circular', false)
        },
    },
    data() {
        return {
            value: null,
        }
    },
    template: '<slds-progress-bar ' +
        ':progress="progress" ' +
        ':circular="circular" ' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Descriptive Progress Bar', () => ({
    components: {SldsProgressBar},
    props: {
        label: {
            default: text('label', 'Einstein Setup Assistant')
        },
        progress: {
            default: number('progress', 25)
        },
        circular: {
            default: boolean('circular', false)
        },
    },
    data() {
        return {
            value: null,
        }
    },
    template: '<slds-progress-bar ' +
        ':label="label" ' +
        ':progress="progress" ' +
        ':circular="circular" ' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Thickness', () => ({
    components: {SldsProgressBar},
    props: {
        xSmall: {
            default: boolean('x-small', false)
        },
        small: {
            default: boolean('small', false)
        },
        medium: {
            default: boolean('medium', true)
        },
        large: {
            default: boolean('large', false)
        },
    },
    data() {
        return {
            value: null,
        }
    },
    template: '<slds-progress-bar ' +
        'label="Einstein Setup Assistant" ' +
        ':progress="25" ' +
        ':x-small="xSmall" ' +
        ':small="small" ' +
        ':medium="medium" ' +
        ':large="large" ' +
        '/>',
    methods: {action: action('clicked')},
}));

stories.add('Color', () => ({
    components: {SldsProgressBar},
    props: {
        success: {
            default: boolean('success', false)
        },
        error: {
            default: boolean('error', false)
        },
    },
    data() {
        return {
            value: null,
        }
    },
    template: '<slds-progress-bar ' +
        'label="Einstein Setup Assistant" ' +
        ':progress="25" ' +
        ':success="success" ' +
        ':error="error" ' +
        '/>',
    methods: {action: action('clicked')},
}));
