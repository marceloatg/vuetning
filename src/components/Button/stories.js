import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SldsButton from './Index';

const stories = storiesOf('Button', module);

stories.addDecorator(withKnobs);

stories.add('Basic', () => ({
    components: { SldsButton },
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
    },
    template: '<slds-button :label="label" @click="action" :spinner="spinner" :disabled="disabled"/>',
    methods: { action: action('clicked') },
}));

stories.add('Neutral', () => ({
    components: { SldsButton },
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
    },
    template: '<slds-button :label="label" neutral @click="action" :spinner="spinner" :disabled="disabled"/>',
    methods: { action: action('clicked') },
}));

stories.add('Brand', () => ({
    components: { SldsButton },
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
    },
    template: '<slds-button :label="label" brand @click="action" :spinner="spinner" :disabled="disabled"/>',
    methods: { action: action('clicked') },
}));

/*
export default {
    title: 'Button',
};

export const basic = () => ({
    components: { SldsButton },
    template: '<slds-button label="Basic Button" @click="action"/>',
    methods: { action: action('clicked') },
});

export const neutral = () => ({
    components: { SldsButton },
    template: '<slds-button label="Neutral Button" neutral @click="action"/>',
    methods: { action: action('clicked') },
});

export const brand = () => ({
    components: { SldsButton },
    template: '<slds-button label="Brand Button" brand @click="action"/>',
    methods: { action: action('clicked') },
});

export const success = () => ({
    components: { SldsButton },
    template: '<slds-button label="Success Button" success @click="action"/>',
    methods: { action: action('clicked') },
});

export const destructive = () => ({
    components: { SldsButton },
    template: '<slds-button label="Destructive Button" destructive @click="action"/>',
    methods: { action: action('clicked') },
});
*/
