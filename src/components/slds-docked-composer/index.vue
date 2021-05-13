<template>
    <section
        v-on-clickaway="onBlur"
        role="dialog"
        class="slds-docked-composer slds-grid slds-grid_vertical"
        :class="[{'slds-has-focus': hasFocus}, `${isOpen ? 'slds-is-open' : 'slds-is-closed'}`]"
        @click="onFocus">

        <!-- Header -->
        <header class="slds-docked-composer__header slds-col slds-grid slds-grow-none">

            <!-- Title -->
            <div class="slds-media slds-media_center slds-no-space">

                <!-- Icon -->
                <div class="slds-media__figure slds-m-right_x-small">
                    <slds-icon x-small :icon="icon"/>
                </div>

                <!-- Heading -->
                <div class="slds-media__body">
                    <h2 class="slds-truncate" :title="heading">
                        {{ heading }}
                    </h2>
                </div>

            </div>

            <!-- Actions -->
            <div class="slds-col_bump-left slds-shrink-none">

                <!-- Minimize button -->
                <slds-button-icon
                    v-if="isOpen"
                    icon="utility:minimize_window"
                    title="Minimize window"
                    @click="onMinimize"/>

                <!-- Erect button -->
                <slds-button-icon
                    v-else
                    icon="utility:erect_window"
                    title="Erect window"
                    @click="onErect"/>

                <!-- Expand button -->
                <slds-button-icon
                    icon="utility:expand_alt"
                    title="Expand Composer"
                    @click="onExpand"/>

                <!-- Close button -->
                <slds-button-icon
                    icon="utility:close"
                    title="Close"
                    @click="onClose"/>

            </div>

        </header>

        <!-- Body -->
        <div class="slds-docked-composer__body slds-col slds-p-around_medium" @scroll="onFocus">
            <slot name="body"/>
        </div>

        <!-- Footer -->
        <footer v-if="$slots.footer" class="slds-docked-composer__footer slds-col slds-grow-none">
            <slot name="footer"/>
        </footer>

    </section>
</template>

<script>
import {mixin as clickAwayMixin} from 'vue-clickaway'
import SldsButtonIcon from '../slds-button-icon/button-icon'
import SldsIcon from '../slds-icon/icon'

export default {
    name: 'SldsDockedComposer',

    components: {
        SldsButtonIcon,
        SldsIcon,
    },

    mixins: [clickAwayMixin],

    props: {
        heading: String,
        icon: String,
    },

    data() {
        return {
            hasFocus: false,
            isOpen: true,
        }
    },

    methods: {
        onBlur() {
            this.hasFocus = false;
        },

        onClose() {
            this.$emit('close');
        },

        onErect() {
            this.isOpen = true;
            this.$emit('erect');
        },

        onExpand() {
            this.$emit('expand');
        },

        onFocus() {
            this.hasFocus = true;
        },

        onMinimize() {
            this.isOpen = false;
            this.$emit('minimize');
        },
    },
}
</script>
