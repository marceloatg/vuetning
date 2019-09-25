import {storiesOf} from '@storybook/vue';
import {boolean, text, withKnobs} from '@storybook/addon-knobs';

import SldsInput from './Index';

const stories = storiesOf('Input', module);

stories.addDecorator(withKnobs);

stories.add('Base', () => ({
    components: {SldsInput},
    props: {
        label: {
            default: text('label', 'My input')
        },
        placeholder: {
            default: text('placeholder', 'Placeholder text')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        required: {
            default: boolean('required', false)
        },
        spinner: {
            default: boolean('spinner', false)
        },
    },
    data() {
        return {
            value: null,
        }
    },
    template: '<slds-input ' +
        'v-model="value" ' +
        ':label="label" ' +
        ':placeholder="placeholder" ' +
        ':disabled="disabled" ' +
        ':required="required" ' +
        ':spinner="spinner" ' +
        '/>',
}));

stories.add('Read Only', () => ({
    components: {SldsInput},
    props: {
        label: {
            default: text('label', 'My input')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        required: {
            default: boolean('required', false)
        },
        spinner: {
            default: boolean('spinner', false)
        },
    },
    data() {
        return {
            value: 'My read only input',
        }
    },
    template: '<slds-input ' +
        'v-model="value" ' +
        'readonly ' +
        ':label="label" ' +
        ':disabled="disabled" ' +
        ':required="required" ' +
        ':spinner="spinner" ' +
        '/>',
}));

stories.add('With Icon', () => ({
    components: {SldsInput},
    props: {
        label: {
            default: text('label', 'My input')
        },
        placeholder: {
            default: text('placeholder', 'Search...')
        },
        icon: {
            default: text('icon', 'utility:search')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        required: {
            default: boolean('required', false)
        },
        spinner: {
            default: boolean('spinner', false)
        },
    },
    data() {
        return {
            value: null,
        }
    },
    template: '<slds-input ' +
        'v-model="value" ' +
        ':label="label" ' +
        ':placeholder="placeholder" ' +
        ':icon="icon" ' +
        ':disabled="disabled" ' +
        ':required="required" ' +
        ':spinner="spinner" ' +
        '/>',
}));

stories.add('Fixed Text', () => ({
    components: {SldsInput},
    props: {
        label: {
            default: text('label', 'Input Label')
        },
        addonPre: {
            default: text('addon-pre', '$')
        },
        addonPost: {
            default: text('addon-post', 'euro')
        },
        placeholder: {
            default: text('placeholder', 'Placeholder text')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        required: {
            default: boolean('required', false)
        },
        spinner: {
            default: boolean('spinner', false)
        },
    },
    data() {
        return {
            value: null,
        }
    },
    template: '<slds-input ' +
        'v-model="value" ' +
        ':label="label" ' +
        ':addon-pre="addonPre" ' +
        ':addon-post="addonPost" ' +
        ':placeholder="placeholder" ' +
        ':disabled="disabled" ' +
        ':required="required" ' +
        ':spinner="spinner" ' +
        '/>',
}));

stories.add('Inline Help', () => ({
    components: {SldsInput},
    props: {
        label: {
            default: text('label', 'Input Label')
        },
        placeholder: {
            default: text('placeholder', 'Placeholder text')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        required: {
            default: boolean('required', false)
        },
        spinner: {
            default: boolean('spinner', false)
        },
    },
    data() {
        return {
            value: null,
        }
    },
    template: '<slds-input ' +
        'v-model="value" ' +
        'inlineHelp ' +
        ':label="label" ' +
        ':placeholder="placeholder" ' +
        ':disabled="disabled" ' +
        ':required="required" ' +
        ':spinner="spinner" ' +
        '>' +
        '<template #inline-help>' +
        'ex: (415)111-2222' +
        '</template>' +
        '</slds-input>',
}));

stories.add('Error', () => ({
    components: {SldsInput},
    props: {
        label: {
            default: text('label', 'My input')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        required: {
            default: boolean('required', false)
        },
        spinner: {
            default: boolean('spinner', false)
        },
    },
    data() {
        return {
            value: null,
        }
    },
    template: '<slds-input ' +
        'v-model="value" ' +
        'error ' +
        ':label="label" ' +
        ':disabled="disabled" ' +
        ':required="required" ' +
        ':spinner="spinner" ' +
        '>' +
        '<template #error>' +
        'My error message' +
        '</template>' +
        '</slds-input>',
}));

stories.add('Error with Icon', () => ({
    components: {SldsInput},
    props: {
        label: {
            default: text('label', 'My input')
        },
        icon: {
            default: text('icon', 'utility:error')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        required: {
            default: boolean('required', false)
        },
        spinner: {
            default: boolean('spinner', false)
        },
    },
    data() {
        return {
            value: null,
        }
    },
    template: '<slds-input ' +
        'v-model="value" ' +
        'error ' +
        ':label="label" ' +
        ':icon="icon" ' +
        ':disabled="disabled" ' +
        ':required="required" ' +
        ':spinner="spinner" ' +
        '>' +
        '<template #error>' +
        'My error message' +
        '</template>' +
        '</slds-input>',
}));
