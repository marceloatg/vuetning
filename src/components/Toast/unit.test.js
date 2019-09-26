import {mount} from '@vue/test-utils'
import SldsToast from './index'
import SldsButtonIcon from '../ButtonIcon/index'
import SldsIcon from '../Icon/index'

describe('SldsModal', () => {
    const iconName = 'utility:check';
    const heading = '<p class="test-heading">Test heading</p>';
    const details = '<p class="test-details">Test details</p>';

    // Testing props
    it('renders props.iconName', () => {
        const wrapper = mount(SldsToast, {
            propsData: {iconName}
        });

        const icon = wrapper.find(SldsIcon);
        expect(icon.exists()).toBeTruthy();
        expect(icon.props().iconName).toBe(iconName);
    });

    it('does not render props.iconName if not passed', () => {
        const wrapper = mount(SldsToast);

        expect(wrapper.find(SldsIcon).exists()).toBeFalsy();
    });

    test.each`
        variant
        ${'base'}
        ${'error'}
        ${'success'}
        ${'warning'}
    `('renders $expected class when prop.variant variant is set', ({variant}) => {
        const wrapper = mount(SldsToast, {
            propsData: {variant},
        });

        expect(wrapper.find(`.slds-theme_${variant}`).exists()).toBeTruthy();
    });

    // Testing events
    it('emits close when close button is clicked', () => {

        const wrapper = mount(SldsToast);

        const closeButton = wrapper.find(SldsButtonIcon);
        closeButton.trigger('click');

        expect(wrapper.emitted().close).toBeTruthy();
        expect(wrapper.emitted().click).toBeFalsy();
    });

    // Testing slots
    it('renders heading slot when passed', () => {

        const wrapper = mount(SldsToast, {
            slots: {heading},
        });

        expect(wrapper.find('.test-heading').exists()).toBeTruthy();
    });

    it('renders details slot when passed', () => {

        const wrapper = mount(SldsToast, {
            slots: {details},
        });

        expect(wrapper.find('.test-details').exists()).toBeTruthy();
    });
});
