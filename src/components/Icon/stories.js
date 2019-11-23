import {storiesOf} from '@storybook/vue';
import {boolean, text, withKnobs} from '@storybook/addon-knobs';

import SldsIcon from './index';

const stories = storiesOf('Icon', module);

stories.addDecorator(withKnobs);

stories.add('Base', () => ({
    components: {SldsIcon},
    props: {
        icon: {
            default: text('icon', 'standard:user')
        },
    },
    template: '<slds-icon ' +
        ':icon="icon" ' +
        '/>',
}));

stories.add('Size', () => ({
    components: {SldsIcon},
    props: {
        icon: {
            default: text('icon', 'standard:user')
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
        medium: {
            default: boolean('medium', false)
        },
        large: {
            default: boolean('large', false)
        },
    },
    template: '<slds-icon ' +
        ':icon="icon" ' +
        ':xx-small="xxSmall" ' +
        ':x-small="xSmall" ' +
        ':small="small" ' +
        ':medium="medium" ' +
        ':large="large" ' +
        '/>',
}));

stories.add('Variant', () => ({
    components: {SldsIcon},
    props: {
        icon: {
            default: text('icon', 'utility:user')
        },
        current: {
            default: boolean('current', false)
        },
        error: {
            default: boolean('error', false)
        },
        inverse: {
            default: boolean('inverse', false)
        },
        light: {
            default: boolean('light', false)
        },
        success: {
            default: boolean('success', false)
        },
        warning: {
            default: boolean('warning', false)
        },
    },
    template: '<slds-icon ' +
        ':icon="icon" ' +
        ':current="current" ' +
        ':error="error" ' +
        ':inverse="inverse" ' +
        ':light="light" ' +
        ':success="success" ' +
        ':warning="warning" ' +
        '/>',
}));
