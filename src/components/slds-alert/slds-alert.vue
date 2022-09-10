<template>
    <div role="alert" class="slds-notify slds-notify_alert" :class="alertClass">

        <!-- Assistive text -->
        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

        <!-- Icon -->
        <slds-icon
            v-if="icon"
            :icon="icon"
            x-small
            current-color
            class="slds-m-right_x-small"
        />

        <!-- Content -->
        <slot>
            <h2>
                {{ message }}
            </h2>
        </slot>

        <!-- Close button -->
        <div v-if="!nonCloseable" class="slds-notify__close">
            <slds-button-icon
                icon="utility:close"
                small
                inverse
                title="Close"
                assistive-text="Close"
                @click="onClickClose"
            />
        </div>

    </div>
</template>

<!--suppress JSValidateTypes -->
<script>
import SldsButtonIcon from '@/components/slds-button-icon/slds-button-icon'
import SldsIcon from '@/components/slds-icon/slds-icon'

export default {
    name: 'SldsAlert',

    components: {
        SldsButtonIcon,
        SldsIcon
    },

    props: {
        /**
         * Hidden text used by a screen reader to read text.
         * @type {string}
         */
        assistiveText: String,

        /**
         * Indicates whether this alert is closeable.
         * @type {boolean}
         */
        nonCloseable: Boolean,

        /**
         * Indicates whether this alert has the error theme.
         * @type {boolean}
         */
        error: Boolean,

        /**
         * The Lightning Design System name of the icon.
         * Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         * @type {string}
         */
        icon: String,

        /**
         * Indicates whether this alert has the info theme.
         * If no other theme is set, this onw will be used by default.
         * @type {boolean}
         */
        info: Boolean,

        /**
         * Alert message.
         * When using the default slot this prop is ignored.
         * @type {string}
         */
        message: String,

        /**
         * Indicates whether this alert has the offline theme.
         * @type {boolean}
         */
        offline: Boolean,

        /**
         * Indicates whether this alert has texture.
         * @type {boolean}
         */
        noTexture: Boolean,

        /**
         * Indicates whether this alert has the warning theme.
         * @type {boolean}
         */
        warning: Boolean
    },

    computed: {
        /**
         * Returns the CSS class names for the alert.
         * @returns {string}
         */
        alertClass() {
            let classNames = ''

            // Alert texture
            if (!this.noTexture) classNames += ' slds-theme_alert-texture'

            // Alert theme
            if (this.error) classNames += ' slds-theme_error'
            else if (this.offline) classNames += ' slds-theme_offline'
            else if (this.warning) classNames += ' slds-theme_warning'
            else classNames += ' slds-theme_info'

            return classNames
        }
    },

    methods: {
        /**
         * Handles the click on the close button.
         * Emits a click event when the close button is clicked.
         */
        onClickClose() {
            this.$emit('close')
        }
    }
}
</script>
