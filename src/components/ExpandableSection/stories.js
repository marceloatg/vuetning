import {storiesOf} from '@storybook/vue';
import {text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';

import SldsExpandableSection from './Index';

const stories = storiesOf('Expandable Section', module);

stories.addDecorator(withKnobs);

stories.add('Base', () => ({
    components: {SldsExpandableSection},
    props: {
        title: {
            default: text('title', 'Section Title')
        },
    },
    template: '<div>' +
        '<slds-expandable-section :title="title" collapsible>' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +
        '</slds-expandable-section>' +
        '<br>' +
        '<slds-expandable-section title="My second section" collapsible>' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +
        '</slds-expandable-section>' +
        '</div>',
    methods: {action: action('clicked')},
}));

stories.add('Non-collapsable', () => ({
    components: {SldsExpandableSection},
    props: {
        title: {
            default: text('Title', 'Section Title')
        },
    },
    template: '<slds-expandable-section :title="title">' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +
        '</slds-expandable-section>',
    methods: {action: action('clicked')},
}));
