import {mount} from '@vue/test-utils'
import SldsModal from './Index'
import SldsFooter from './Footer'
import SldsHeader from './Header'

describe('SldsModal', () => {
    const heading = 'test heading';
    const primaryButtonLabel = 'Primary button test label';
    const secondaryButtonLabel = 'Secondary button test label';

    // Testing props
    it('renders props.bodyClass', () => {
        const bodyClass = 'slds-p-around_none';
        const wrapper = mount(SldsModal, {
            propsData: {
                heading,
                bodyClass
            },
            slots: {
                body: '<p>Test</p>'
            }
        });

        expect(wrapper.find('.slds-p-around_none').exists()).toBeTruthy();
    });

    it('renders props.heading', () => {
        const wrapper = mount(SldsModal, {
            propsData: {heading},
        });

        expect(wrapper.find('h2.slds-text-heading_medium').text()).toMatch(heading);
    });

    it('renders props.headerEmpty', () => {
        const headerEmpty = true;
        const wrapper = mount(SldsModal, {
            propsData: {headerEmpty}
        });

        expect(wrapper.find('h2.slds-text-heading_medium').exists()).toBeFalsy();
    });

    it('renders props.primaryButtonLabel', () => {
        const wrapper = mount(SldsModal, {
            propsData: {
                heading,
                primaryButtonLabel
            },
        });

        const primaryButton = wrapper.find(SldsFooter).find({ref: 'primaryButton'});
        expect(primaryButton.text()).toBe(primaryButtonLabel);
    });

    it('renders props.secondaryButtonLabel', () => {
        const wrapper = mount(SldsModal, {
            propsData: {
                heading,
                secondaryButtonLabel: secondaryButtonLabel
            },
        });

        const secondaryButton = wrapper.find(SldsFooter).find({ref: 'secondaryButton'});
        expect(secondaryButton.text()).toBe(secondaryButtonLabel);
    });

    // Test destroyed
    it('test destroy', () => {
        mount(SldsModal, {
            propsData: {heading}, destroyed() {
            }
        }).destroy();
    });

    test.each`
        size
        ${'default'}
        ${'small'}
        ${'medium'}
        ${'large'}
    `('renders $expected class when prop.size $size is set', ({size}) => {
        const wrapper = mount(SldsModal, {
            propsData: {
                heading,
                size
            },
        });

        expect(wrapper.find(`.slds-modal_${size}`).exists()).toBeTruthy();
    });

    // Testing slots

    // Testing events
    it('emits close when close button is clicked', () => {

        const wrapper = mount(SldsModal, {
            propsData: {heading}
        });

        const closeButton = wrapper.find(SldsHeader).find('.slds-modal__close');
        closeButton.trigger('click');

        expect(wrapper.emitted().close).toBeTruthy();
        expect(wrapper.emitted().click).toBeFalsy();
    });

    it('emits primaryclick when primary button is clicked', () => {
        const wrapper = mount(SldsModal, {
            propsData: {
                heading,
                primaryButtonLabel
            },
        });

        const primaryButton = wrapper.find(SldsFooter).find({ref: 'primaryButton'});
        primaryButton.trigger('click');

        expect(wrapper.emitted().primaryclick).toBeTruthy();
        expect(wrapper.emitted().click).toBeFalsy();
    });

    it('emits secondaryclick when secondary button is clicked', () => {
        const wrapper = mount(SldsModal, {
            propsData: {
                heading,
                secondaryButtonLabel
            },
        });

        const secondaryButton = wrapper.find(SldsFooter).find({ref: 'secondaryButton'});
        secondaryButton.trigger('click');

        expect(wrapper.emitted().secondaryclick).toBeTruthy();
        expect(wrapper.emitted().click).toBeFalsy();
    });

    // Testing keyboard interactions
    it('emits close when Esc key is pressed', () => {
        const wrapper = mount(SldsModal, {
            propsData: {heading}
        });

        wrapper.vm.onKeyUp({key: 'Escape'});

        expect(wrapper.emitted().close).toBeTruthy();
    });

    it('emits primaryclick when Enter key is pressed', () => {
        const wrapper = mount(SldsModal, {
            propsData: {heading}
        });

        wrapper.vm.onKeyUp({key: 'Enter'});

        expect(wrapper.emitted().primaryclick).toBeTruthy();
    });

    it('does not emit primaryclick when Enter key is pressed and the slot.footer is set', () => {
        const wrapper = mount(SldsModal, {
            propsData: {heading},
            slots: {
                footer: '<p>Test</p>'
            }
        });

        wrapper.vm.onKeyUp({key: 'Enter'});

        expect(wrapper.emitted().primaryclick).toBeFalsy();
    });
});