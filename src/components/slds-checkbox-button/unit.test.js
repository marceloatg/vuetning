import {shallowMount} from '@vue/test-utils'
import SldsCheckboxButton from './index'

describe('SldsCheckboxButton', () => {

    it('emits input when clicked and not checked', () => {
        const checked = false;
        const wrapper = shallowMount(SldsCheckboxButton, {
            propsData: {checked}
        });

        wrapper.find('.slds-checkbox_add-button').trigger('click');

        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0]).toEqual([!checked]);
    });

    it('emits input when clicked and checked', () => {
        const checked = true;
        const wrapper = shallowMount(SldsCheckboxButton, {
            propsData: {checked}
        });

        wrapper.find('.slds-checkbox_add-button').trigger('click');

        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0]).toEqual([!checked]);
    });

    it('does not emit input when clicked and disabled', () => {
        const disabled = true;
        const wrapper = shallowMount(SldsCheckboxButton, {
            propsData: {disabled}
        });

        wrapper.find('.slds-checkbox_add-button').trigger('click');

        expect(wrapper.emitted().input).toBeFalsy();
    });
});
