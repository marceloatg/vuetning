import {shallowMount} from '@vue/test-utils'
import SldsPill from './Index'

describe('SldsPill', () => {
    const label = 'test label';

    it('renders props.label', () => {
        // shallow mount the button setting a label
        const wrapper = shallowMount(SldsPill, {
            propsData: {label}
        });

        // assert button text matches label
        expect(wrapper.find('span.slds-pill__label').text()).toMatch(label);
    });

    it('does not contain error class when prop.hasError is false', () => {
        // shallow mount the button setting a label
        const wrapper = shallowMount(SldsPill, {
            propsData: {label}
        });

        // assert button text matches label
        expect(wrapper.find('.slds-has-error').exists()).toBeFalsy();
    });

    it('contains error class when prop.hasError is true', () => {
        // shallow mount the button setting a label
        const hasError = true;
        const wrapper = shallowMount(SldsPill, {
            propsData: {label, hasError}
        });

        // assert button text matches label
        expect(wrapper.findAll('.slds-has-error').exists()).toBeTruthy();
    });

    it('does not render icon when not passed', () => {
        // shallow mount the button setting a label
        const wrapper = shallowMount(SldsPill, {
            propsData: {label}
        });

        // assert button text matches label
        expect(wrapper.find('span.slds-pill__icon_container').exists()).toBeFalsy();
    });

    it('renders icon when passed', () => {
        // shallow mount the button setting a label
        const wrapper = shallowMount(SldsPill, {
            propsData: {label},
            slots: {icon: '<span class="test"></span>'}
        });

        // assert button text matches label
        expect(wrapper.find('span.slds-pill__icon_container').exists()).toBeTruthy();
    });

    it('emits click when clicked', () => {

        // shallow mount the button
        const wrapper = shallowMount(SldsPill, {
            propsData: {label}
        });

        // trigger click
        wrapper.find('span.slds-pill').trigger('click');

        // assert event has been emitted exactly once
        expect(wrapper.emitted().click).toBeTruthy();
        expect(wrapper.emitted().click.length).toBe(1);
    });

    it('does not emits click when clicked and clickable is set to false', () => {

        // shallow mount the button
        const clickable = false;
        const wrapper = shallowMount(SldsPill, {
            propsData: {label, clickable}
        });

        // trigger click
        wrapper.find('span.slds-pill').trigger('click');

        // assert event has not been emitted
        expect(wrapper.emitted().click).toBeFalsy();
    });

    it('emits remove when clicked the remove button', () => {

        // shallow mount the button
        const wrapper = shallowMount(SldsPill, {
            propsData: {label}
        });

        // trigger click
        wrapper.find('button.slds-pill__remove').trigger('click');

        // assert remove event has been emitted exactly once
        expect(wrapper.emitted().remove).toBeTruthy();
        expect(wrapper.emitted().remove.length).toBe(1);

        // assert click event has not been emitted
        expect(wrapper.emitted().click).toBeFalsy();
    });

    it('emits remove when clicked the remove button with payload', () => {

        // shallow mount the button
        const name = 'test-name';
        const wrapper = shallowMount(SldsPill, {
            propsData: {label, name}
        });

        // trigger click
        wrapper.find('button.slds-pill__remove').trigger('click');

        // assert name payload
        expect(wrapper.emitted().remove[0]).toEqual([name]);
    });
});