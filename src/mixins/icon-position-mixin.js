// noinspection JSValidateTypes
export default {
    props: {
        /**
         * The Lightning Design System name of the icon.
         * Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         * @type {string}
         */
        icon: String,

        /**
         * Indicates whether the icon is left positioned.
         * @type {boolean}
         */
        left: Boolean,

        /**
         * Indicates whether the icon is right positioned.
         * @type {boolean}
         */
        right: Boolean,
    },

    computed: {
        /**
         * Indicates whether this component has a left positioned icon.
         * @returns {boolean}
         */
        hasLeftPositionedIcon() {
            return this.icon && (this.left || (!this.left && !this.right))
        },

        /**
         * Indicates whether this component has a right positioned icon.
         * @returns {boolean}
         */
        hasRightPositionedIcon() {
            return this.icon && this.right
        },
    },
}
