import {shallowMount} from '@vue/test-utils'
import SldsPill from './Index'

describe('SldsPill', () => {
    const label = 'test label';

    it('renders props.label', () => {
        const wrapper = shallowMount(SldsPill, {
            propsData: {label}
        });

        expect(wrapper.find('span.slds-pill__label').text()).toMatch(label);
    });

    it('does not contain error class when prop.hasError is false', () => {
        const wrapper = shallowMount(SldsPill, {
            propsData: {label}
        });

        expect(wrapper.find('.slds-has-error').exists()).toBeFalsy();
    });

    it('contains error class when prop.hasError is true', () => {
        const hasError = true;
        const wrapper = shallowMount(SldsPill, {
            propsData: {label, hasError}
        });

        expect(wrapper.findAll('.slds-has-error').exists()).toBeTruthy();
    });

    it('does not render icon when not passed', () => {
        const wrapper = shallowMount(SldsPill, {
            propsData: {label}
        });

        expect(wrapper.find('span.slds-pill__icon_container').exists()).toBeFalsy();
    });

    it('renders icon when passed', () => {
        const wrapper = shallowMount(SldsPill, {
            propsData: {label},
            slots: {icon: '<span class="test"></span>'}
        });

        expect(wrapper.find('span.slds-pill__icon_container').exists()).toBeTruthy();
    });

    it('emits click when clicked', () => {

        const wrapper = shallowMount(SldsPill, {
            propsData: {label}
        });

        wrapper.find('span.slds-pill').trigger('click');

        expect(wrapper.emitted().click).toBeTruthy();
        expect(wrapper.emitted().click.length).toBe(1);
    });

    it('does not emits click when clicked and clickable is set to false', () => {
        const clickable = false;
        const wrapper = shallowMount(SldsPill, {
            propsData: {label, clickable}
        });

        wrapper.find('span.slds-pill').trigger('click');

        expect(wrapper.emitted().click).toBeFalsy();
    });

    it('emits remove when clicked the remove button', () => {
        const wrapper = shallowMount(SldsPill, {
            propsData: {label}
        });

        wrapper.find('button.slds-pill__remove').trigger('click');

        expect(wrapper.emitted().remove).toBeTruthy();
        expect(wrapper.emitted().remove.length).toBe(1);
        expect(wrapper.emitted().click).toBeFalsy();
    });

    it('emits remove when clicked the remove button with payload', () => {
        const name = 'test-name';
        const wrapper = shallowMount(SldsPill, {
            propsData: {label, name}
        });

        wrapper.find('button.slds-pill__remove').trigger('click');

        expect(wrapper.emitted().remove[0]).toEqual([name]);
    });
});