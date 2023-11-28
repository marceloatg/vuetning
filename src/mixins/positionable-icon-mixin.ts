import { defineComponent } from "vue"

export default defineComponent({
    props: {
        /**
         * Indicates whether the icon is left positioned.
         */
        iconLeft: Boolean,

        /**
         * The Lightning Design System name of the icon.
         * Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         */
        iconName: String,

        /**
         * Indicates whether the icon is right positioned.
         */
        iconRight: Boolean,
    },

    computed: {
        /**
         * Indicates whether this component has a left positioned icon.
         */
        hasLeftPositionedIcon(): boolean {
            return Boolean(this.iconName && (this.iconLeft || (!this.iconLeft && !this.iconRight)))
        },

        /**
         * Indicates whether this component has a right positioned icon.
         */
        hasRightPositionedIcon(): boolean {
            return Boolean(this.iconName && this.iconRight)
        },
    },
})
