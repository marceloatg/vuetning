import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {number, withKnobs} from '@storybook/addon-knobs';

import SldsTrialBar from './index';

const stories = storiesOf('Trial Bar', module);

stories.addDecorator(withKnobs);

stories.add('Base', () => ({
    components: {SldsTrialBar},
    props: {
        daysLeft: {
            default: number('days-left', 10)
        },
    },
    template: '<slds-trial-bar ' +
        ':days-left="daysLeft" ' +
        '/>',
    methods: {action: action('clicked')},
}));
