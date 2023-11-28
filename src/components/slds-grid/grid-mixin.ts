import { defineComponent } from "vue"

export default defineComponent({
    props: {
        /**
         * Indicates whether the grid content is bottom aligned.
         */
        alignBottom: Boolean,

        /**
         * Indicates whether the grid content is center aligned.
         */
        alignCenter: Boolean,

        /**
         * Indicates whether the grid content is right justified.
         */
        alignEnd: Boolean,

        /**
         * Indicates whether the grid content is vertically centered justified.
         */
        alignMiddle: Boolean,

        /**
         * Indicates whether the grid content is evenly spaced out.
         */
        alignSpaced: Boolean,

        /**
         * Indicates whether the grid content is evenly spread out from edges.
         */
        alignSpread: Boolean,

        /**
         * Indicates whether the grid content is top aligned.
         */
        alignStart: Boolean,

        /**
         * Indicates whether to add gutters to columns as well as align the outside of the grid.
         * Gutters will apply to direct child columns only, excluding inner grids.
         */
        directGutters: Boolean,

        /**
         * Indicates whether the grid should fill the remaining space.
         */
        fill: Boolean,

        /**
         * Indicates whether to add gutters to columns as well as align the outside of the grid.
         * Gutters will apply to any column nested within the grid.
         */
        gutters: Boolean,

        /**
         * Indicates whether the grid to flow top to bottom on the vertical axis.
         */
        vertical: Boolean,

        /**
         * Indicates whether to wrap columns if they exceed the width of the grid.
         */
        wrap: Boolean,
    },

    computed:{
        /**
         * The CSS class names for the grid.
         */
        gridClassNames(): string {
            let classNames = ""

            // column gutters
            if (this.gutters) classNames += " slds-gutters"
            else if (this.directGutters) classNames += " slds-gutters_direct"

            // Column wrapping
            if (this.wrap) classNames += " slds-wrap"

            // Grid flow
            if (this.vertical) classNames += " slds-grid_vertical"

            // Grid fill
            if (this.fill) classNames += " slds-grid_fill"

            // Grid horizontal alignment
            if (this.alignCenter) classNames += " slds-grid_align-center"
            else if (this.alignEnd) classNames += " slds-grid_align-end"
            else if (this.alignSpaced) classNames += " slds-grid_align-space"
            else if (this.alignSpread) classNames += " slds-grid_align-spread"

            // Grid vertical alignment
            if (this.alignBottom) classNames += " slds-grid_vertical-align-end"
            else if (this.alignMiddle) classNames += " slds-grid_vertical-align-center"
            else if (this.alignStart) classNames += " slds-grid_vertical-align-start"

            return classNames
        },
    },
})
