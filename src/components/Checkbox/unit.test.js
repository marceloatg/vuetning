import {mount} from '@vue/test-utils'
import SldsCheckbox from './index'

describe('SldsCheckbox', () => {
    const label = 'test label';

    it('renders props.label for stacked checkbox', () => {
        const wrapper = mount(SldsCheckbox, {
            propsData: {label},
        });

        expect(wrapper.findAll('.slds-checkbox__label').length).toBe(0);
        expect(wrapper.findAll('.slds-form-element__label').length).toBe(1);
    });

    it('renders props.label for inline checkbox', () => {
        const variant = 'inline';
        const wrapper = mount(SldsCheckbox, {
            propsData: {label, variant},
        });

        expect(wrapper.findAll('.slds-checkbox__label').length).toBe(1);
        expect(wrapper.findAll('.slds-form-element__label').length).toBe(1);
    });

    it('renders props.hasError', () => {
        const hasError = true;
        const errorMessage = 'Test message';
        const wrapper = mount(SldsCheckbox, {
            propsData: {label, hasError, errorMessage},
        });

        expect(wrapper.find('.slds-has-error').exists()).toBeTruthy();
        expect(wrapper.find('.slds-form-element__help').text()).toBe(errorMessage);
    });

    it('renders props.required', () => {
        const required = true;
        const wrapper = mount(SldsCheckbox, {
            propsData: {label, required},
        });

        expect(wrapper.find('.slds-required').exists()).toBeTruthy();
    });

    it('input value changes via watcher', () => {
        const checked = false;
        const wrapper = mount(SldsCheckbox, {
            propsData: {label, checked}
        });

        wrapper.setProps({checked: true});

        expect(wrapper.vm.value).toBeTruthy();
    });

    it('emits input when clicked and not checked', () => {
        const checked = false;
        const wrapper = mount(SldsCheckbox, {
            propsData: {label, checked}
        });

        wrapper.find('.slds-form-element__control').trigger('click');

        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0]).toEqual([!checked]);
    });

    it('emits input when clicked and checked', () => {
        const checked = true;
        const wrapper = mount(SldsCheckbox, {
            propsData: {label, checked}
        });

        wrapper.find('.slds-form-element__control').trigger('click');

        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0]).toEqual([!checked]);
    });

    it('does not emit input when clicked and disabled', () => {
        const disabled = true;
        const wrapper = mount(SldsCheckbox, {
            propsData: {label, disabled}
        });

        wrapper.find('.slds-form-element__control').trigger('click');

        expect(wrapper.emitted().input).toBeFalsy();
    });

    it('does not emit input when clicked and read only', () => {
        const readOnly = true;
        const wrapper = mount(SldsCheckbox, {
            propsData: {label, readOnly}
        });

        wrapper.find('.slds-form-element__control').trigger('click');

        expect(wrapper.emitted().input).toBeFalsy();
    });
});
