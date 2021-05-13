<template>
    <div
        class='slds-panel slds-panel_docked slds-is-open'
        :class='panelClass'
        aria-hidden='false'
    >

        <!-- Custom header -->
        <div
            v-if='$slots.header'
            class='slds-panel__header slds-panel__header_custom'
            :class="headerClass"
        >
            <slot name='header'/>
        </div>

        <!-- Header -->
        <div class='slds-panel__header' :class="headerClass">

            <!-- Back button -->
            <slds-button-icon
                v-if='backButton'
                icon='utility:back'
                small
                class='slds-panel__back'
                title='Collapse Panel Header'
                @click='onClickBack'
            />

            <!-- Title -->
            <h2 class='slds-panel__header-title slds-text-heading_small slds-truncate' :title='title'>
                {{ title }}
            </h2>

            <!-- Close button -->
            <slds-button-icon
                v-if='closeButton'
                icon='utility:close'
                small
                class='slds-panel__close'
                :assistive-text='assistiveText'
                title='Collapse Panel Header'
                @click='onClickClose'
            />

        </div>

        <!-- Body -->
        <div class='slds-panel__body'>
            <slot/>
        </div>

    </div>
</template>

<script>
import SldsButtonIcon from '@/components/slds-button-icon/button-icon'

export default {
    name: 'SldsPanel',

    components: {
        SldsButtonIcon
    },

    props: {
        assistiveText: String,
        backButton: Boolean,
        centeredHeader: Boolean,
        closeButton: {type: Boolean, default: true},
        full: Boolean,
        large: Boolean,
        left: Boolean,
        medium: Boolean,
        right: Boolean,
        small: Boolean,
        title: String,
        xLarge: Boolean,
    },

    data() {
        return {
            $_isOpen: false,
        }
    },

    computed: {
        headerClass() {
            return {'slds-panel__header_align-center': this.centeredHeader}
        },

        panelClass() {
            const classNames = []

            // Size
            if (this.small) classNames.push('slds-size_small')
            else if (this.medium) classNames.push('slds-size_medium')
            else if (this.large) classNames.push('slds-size_large')
            else if (this.xLarge) classNames.push('slds-size_x-large')
            else if (this.full) classNames.push('slds-size_full')
            else classNames.push('slds-size_medium')

            // position
            if (this.right) classNames.push('slds-panel_docked-right')
            else if (this.left) classNames.push('slds-panel_docked-left')
            else throw '[slds-panel] Specify panel side (left or right)'

            return classNames
        }
    },

    methods: {
        onClickBack() {
            this.$emit('back')
        },

        onClickClose() {
            this.$emit('close')
        }
    }
}
</script>
