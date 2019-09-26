import {mount} from '@vue/test-utils'
import SldsDockedComposer from './index'
import SldsIcon from '../Icon/index'

describe('SldsDockedComposer', () => {
    const heading = 'test heading';
    const iconName = 'utility:chat';

    // Testing props
    it('renders props.heading', () => {
        const wrapper = mount(SldsDockedComposer, {
            propsData: {heading, iconName},
        });

        expect(wrapper.find('header h2').text()).toMatch(heading);
    });

    it('renders props.iconName', () => {
        const wrapper = mount(SldsDockedComposer, {
            propsData: {heading, iconName},
        });

        const icon = wrapper.find(SldsIcon);
        expect(icon.vm.iconName).toMatch(iconName);
    });

    it('renders expand button by default', () => {
        const wrapper = mount(SldsDockedComposer, {
            propsData: {heading, iconName},
        });

        expect(wrapper.find({ref: 'expandButton'}).exists()).toBeTruthy();
    });

    it('does not render expand button when props.hasExpandButton is false', () => {
        const hasExpandButton = false;
        const wrapper = mount(SldsDockedComposer, {
            propsData: {heading, iconName, hasExpandButton},
        });

        expect(wrapper.find({ref: 'expandButton'}).exists()).toBeFalsy();
    });

    it('renders minimize button by default', () => {
        const wrapper = mount(SldsDockedComposer, {
            propsData: {heading, iconName},
        });

        expect(wrapper.find({ref: 'minimizeButton'}).exists()).toBeTruthy();
        expect(wrapper.find({ref: 'erectButton'}).exists()).toBeFalsy();
    });

    it('does not render minimize button when props.hasMinimizeButton is false', () => {
        const hasMinimizeButton = false;
        const wrapper = mount(SldsDockedComposer, {
            propsData: {heading, iconName, hasMinimizeButton},
        });

        expect(wrapper.find({ref: 'minimizeButton'}).exists()).toBeFalsy();
        expect(wrapper.find({ref: 'erectButton'}).exists()).toBeFalsy();
    });

    it('does not render minimize button when the docked composer is minimized', () => {
        const wrapper = mount(SldsDockedComposer, {
            propsData: {heading, iconName},
        });

        wrapper.setData({state: 'close'});

        expect(wrapper.find({ref: 'minimizeButton'}).exists()).toBeFalsy();
        expect(wrapper.find({ref: 'erectButton'}).exists()).toBeTruthy();
    });

    // Testing events
    it('emits close when close button is clicked', () => {
        const wrapper = mount(SldsDockedComposer, {
            propsData: {heading, iconName},
        });

        wrapper.find({ref: 'closeButton'}).trigger('click');

        expect(wrapper.emitted().close).toBeTruthy();
        expect(wrapper.emitted().click).toBeFalsy();
    });

    it('emits expand when expand button is clicked', () => {
        const wrapper = mount(SldsDockedComposer, {
            propsData: {heading, iconName},
        });

        wrapper.find({ref: 'expandButton'}).trigger('click');

        expect(wrapper.emitted().expand).toBeTruthy();
        expect(wrapper.emitted().click).toBeFalsy();
    });

    it('emits minimize when minimize button is clicked', () => {
        const wrapper = mount(SldsDockedComposer, {
            propsData: {heading, iconName},
        });

        wrapper.find({ref: 'minimizeButton'}).trigger('click');

        expect(wrapper.emitted().minimize).toBeTruthy();
        expect(wrapper.emitted().click).toBeFalsy();
        expect(wrapper.find('.slds-is-close')).toBeTruthy();
    });

    it('emits erect when erect button is clicked', () => {
        const wrapper = mount(SldsDockedComposer, {
            propsData: {heading, iconName},
        });

        wrapper.setData({state: 'close'});
        wrapper.find({ref: 'erectButton'}).trigger('click');

        expect(wrapper.emitted().erect).toBeTruthy();
        expect(wrapper.emitted().click).toBeFalsy();
    });
});
