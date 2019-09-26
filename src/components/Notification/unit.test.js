import {mount} from '@vue/test-utils'
import SldsNotification from './index'
import SldsIcon from '../Icon/index'
import SldsButtonIcon from '../ButtonIcon/index'

describe('SldsNotification', () => {
    const iconClass = 'my-custom-icon-class';
    const iconName = 'standard:event';
    const subject = 'Meeting';
    const message = 'Event at 11:00am on Jan 8';

    it('renders props for notification', () => {
        const wrapper = mount(SldsNotification, {
            propsData: {
                iconClass,
                iconName,
                subject,
                message,
            },
        });

        const icon = wrapper.find(SldsIcon);

        expect(icon.exists()).toBeTruthy();
        expect(icon.vm.iconName).toBe(iconName);
        expect(wrapper.find('.slds-media__body').find('h2').text()).toBe(subject);
        expect(wrapper.find('.slds-media__body').find('p').text()).toBe(message);
    });

    it('emits close when close button is clicked', () => {
        const wrapper = mount(SldsNotification, {
            propsData: {
                iconName,
                subject,
                message,
            },
        });

        wrapper.find(SldsButtonIcon).trigger('click');

        expect(wrapper.emitted().close).toBeTruthy();
        expect(wrapper.emitted().click).toBeFalsy();
    });

    it('emits close when close button is clicked', () => {
        const wrapper = mount(SldsNotification, {
            propsData: {
                iconName,
                subject,
                message,
            },
        });

        wrapper.find('a.slds-notification__target').trigger('click');

        expect(wrapper.emitted().click).toBeTruthy();
        expect(wrapper.emitted().close).toBeFalsy();
    });
});
