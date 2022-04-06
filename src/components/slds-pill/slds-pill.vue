<template>
    <span
        class="slds-pill slds-pill_link"
        :class="{'slds-has-error': hasError}"
        @click="onClickPill"
    >
        <span v-if="icon" class="slds-pill__icon_container">
            <slds-icon
                aria-hidden="true"
                :icon="icon"
                :error="hasError"
            />
        </span>

        <span v-if="src" class="slds-pill__icon_container">
            <slds-avatar circle :src="src"/>
        </span>

        <a class="slds-pill__action" :title="title">
            <span class="slds-pill__label">
                {{ label }}
            </span>
        </a>

        <button
            class="slds-button slds-button_icon slds-button_icon slds-pill__remove"
            title="Remove"
            @click.stop="onClickRemove"
        >
            <slds-svg aria-hidden="true" class="slds-button__icon" icon="utility:close"/>
        </button>

    </span>
</template>

<!--suppress JSValidateTypes -->
<script>
import SldsSvg from '@/components/slds-svg'
import SldsIcon from '@/components/slds-icon'
import SldsAvatar from '@/components/slds-avatar'

export default {
    name: 'SldsPill',

    components: [
        SldsSvg,
        SldsIcon,
        SldsAvatar,
    ],

    props: {
        /**
         * @description Specifies whether the element uses the bare pill variant.
         * @type {boolean}
         */
        bare: Boolean,

        /**
         * @description If present, the pill is shown with a red border and an error icon on the left of the label.
         * @type {boolean}
         */
        hasError: Boolean,

        /**
         * @description The Lightning Design System name of the icon. Names are written in the format
         * 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         * @type {string}
         */
        icon: String,

        /**
         * @description Specifies whether the element variant is a link.
         * @type {boolean}
         */
        link: Boolean,

        /**
         * @description The text label that displays in the pill.
         * @type {string}
         */
        label: {Type: String, required: true},

        /**
         * @description The name for the pill, used to identify the pill in a callback.
         * @type {string}
         */
        name: {Type: String, required: true},

        /**
         * @description The URL for the image.
         * @type {string}
         */
        src: String,

        /**
         * @description The title text containing full pill label verbiage.
         * @type {string}
         */
        title: String,
    },

    methods: {
        /**
         * @description Fires a remove event when the remove button is clicked.
         */
        onClickRemove() {
            this.$emit('remove', this.name)
        },

        /**
         * @description Fires a click event when the pill link is clicked.
         */
        onClickPill() {
            this.$emit('click', this.name)
        }
    },
}
</script>

