<template>
    <div :class="mediaObjectClassNames">

        <!-- Figure -->
        <div v-if="$slots['figure']" :class="figureClassNames" data-testid="mediaObjectFigure">
            <slot name="figure"/>
        </div>

        <!-- Body -->
        <div :class="bodyClassNames" data-testid="mediaObjectBody">
            <slot/>
        </div>

        <!-- Figure reverse -->
        <div v-if="$slots['figure-reverse']" :class="figureReverseClassNames" data-testid="mediaObjectFigureReverse">
            <slot name="figure-reverse"/>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsMediaObject",

    props: {
        bodyClass: String,

        center: Boolean,

        figureClass: String,

        figureReverseClass: String,

        large: Boolean,

        responsive: Boolean,

        small: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the body.
         */
        bodyClassNames(): string {
            let classNames = "slds-media__body"

            if (this.bodyClass && this.bodyClass.length > 0) {
                classNames += ` ${this.bodyClass}`
            }

            return classNames
        },

        /**
         * The CSS class names for the figure.
         */
        figureClassNames(): string {
            let classNames = "slds-media__figure"

            if (this.figureClass && this.figureClass.length > 0) {
                classNames += ` ${this.figureClass}`
            }

            return classNames
        },

        /**
         * The CSS class names for the figure reverse.
         */
        figureReverseClassNames(): string {
            let classNames = "slds-media__figure slds-media__figure_reverse"

            if (this.figureReverseClass && this.figureReverseClass.length > 0) {
                classNames += ` ${this.figureReverseClass}`
            }

            return classNames
        },

        /**
         * The CSS class names for the media object.
         */
        mediaObjectClassNames(): string {
            let classNames = "slds-media"

            if (this.center) classNames += " slds-media_center"
            if (this.responsive) classNames += " slds-media_responsive"

            // Size
            if (this.large) classNames += " slds-media_large"
            else if (this.small) classNames += " slds-media_small"

            return classNames
        },
    },
})
</script>
