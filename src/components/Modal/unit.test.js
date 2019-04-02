import {mount} from '@vue/test-utils'
import SldsModal from './Index'

describe('SldsModal', () => {

    // Testing props
    it('renders props.contentClass', () => {
        const contentClass = 'slds-p-around_none';
        const wrapper = mount(SldsModal, {
            propsData: {contentClass},
            slots: {
                body: '<p>Test</p>'
            }
        });

        expect(wrapper.find('.slds-p-around_none').exists()).toBeTruthy();
    });

    // Test destroyed
    it('test destroy', () => {
        mount(SldsModal, {
            destroyed() {
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
            propsData: {size},
        });

        expect(wrapper.find(`.slds-modal_${size}`).exists()).toBeTruthy();
    });

    // Testing events
    it('emits close when close button is clicked', () => {

        const wrapper = mount(SldsModal);

        const closeButton = wrapper.find('.slds-modal__close');
        closeButton.trigger('click');

        expect(wrapper.emitted().close).toBeTruthy();
        expect(wrapper.emitted().click).toBeFalsy();
    });

    // Testing keyboard interactions
    it('emits close when Esc key is pressed', () => {
        const wrapper = mount(SldsModal);

        wrapper.vm.onKeyUp({key: 'Escape'});

        expect(wrapper.emitted().close).toBeTruthy();
    });
});
