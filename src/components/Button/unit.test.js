import {shallowMount} from '@vue/test-utils'
import SldsButton from './Index'

describe('SldsButton', () => {
    it('renders props.label when passed', () => {

        // shallow mount the button setting a label
        const label = 'test label';
        const wrapper = shallowMount(SldsButton, {
            propsData: {label}
        });

        // assert button text matches label
        expect(wrapper.text()).toMatch(label);
    });

    it('emits click when clicked', () => {

        // shallow mount the button
        const wrapper = shallowMount(SldsButton);

        // trigger click
        wrapper.find('button').trigger('click');

        // assert event has been emitted
        expect(wrapper.emitted().click).toBeTruthy();
    });

    it('does no emit click when clicked in disabled state', () => {

        // shallow mount the button setting a disabled state
        const disabled = true;
        const wrapper = shallowMount(SldsButton, {
            propsData: {disabled}
        });

        // trigger click
        wrapper.find('button').trigger('click');

        // assert event has not been emitted
        expect(wrapper.emitted().click).toBeFalsy();
    });

    it('does no emit click when clicked when spinner is active', () => {

        // shallow mount the button setting a disabled state
        const spinnerActive = true;
        const wrapper = shallowMount(SldsButton, {
            propsData: {spinnerActive}
        });

        // trigger click
        wrapper.find('button').trigger('click')

        // assert event has not been emitted
        expect(wrapper.emitted().click).toBeFalsy();
    });
});