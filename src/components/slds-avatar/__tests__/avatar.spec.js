import {mount} from '@vue/test-utils'
import SldsAvatar from '../avatar.vue'

describe('SldsAvatar', () => {
    const src = 'https://s3-sa-east-1.amazonaws.com/bluebear.app/logo.svg'
    const initials = 'MG'
    const fallbackIcon = 'standard:account'
    const alternativeText = 'alternative text'

    describe('Image', () => {

        it('should not render when invalid', () => {
            const wrapper = mount(SldsAvatar, {
                propsData: {src: null, fallbackIcon}
            })

            expect(wrapper.find('img').exists()).toBeFalsy()
        })

        it('should render when valid', () => {
            const wrapper = mount(SldsAvatar, {
                propsData: {src}
            })

            expect(wrapper.find('img').exists()).toBeTruthy()
        })

        it('should correct image src when changed', async () => {
            const wrapper = mount(SldsAvatar, {
                propsData: {src}
            })

            expect(wrapper.element).toMatchSnapshot()
            await wrapper.setProps({src: 'https://s3-sa-east-1.amazonaws.com/bluebear.app/logo-name.png'})
            expect(wrapper.element).toMatchSnapshot()
        })

        it('should render alternative text when set', () => {
            const wrapper = mount(SldsAvatar, {
                propsData: {src, alternativeText}
            })

            expect(wrapper.element).toMatchSnapshot()
        })

        it('should correct alternative text when changed', async () => {
            const wrapper = mount(SldsAvatar, {
                propsData: {alternativeText}
            })

            expect(wrapper.element).toMatchSnapshot()
            await wrapper.setProps({alternativeText: 'new alternative text'})
            expect(wrapper.element).toMatchSnapshot()
        })

    })

    describe('Initials', () => {

        it('should not render when invalid', () => {
            const wrapper = mount(SldsAvatar, {
                propsData: {initials: null, fallbackIcon}
            })

            expect(wrapper.find('abbr').exists()).toBeFalsy()
        })

        it('should render when valid', () => {
            const wrapper = mount(SldsAvatar, {
                propsData: {initials, fallbackIcon}
            })

            expect(wrapper.find('abbr').exists()).toBeTruthy()
        })

        it('should render class slds-icon-standard-account when fallbackIconName is standard:account', () => {
            const wrapper = mount(SldsAvatar, {
                propsData: {initials, fallbackIcon}
            })

            expect(wrapper.find('.slds-icon-standard-account').exists()).toBeTruthy()
        })

    })

    describe('Variant', () => {

    })

    describe('Size', () => {

    })
})
