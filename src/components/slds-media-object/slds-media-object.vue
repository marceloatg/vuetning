<template>
    <div class="slds-media" :class="mediaObjectClass">

        <div v-if="$slots['figure']" class="slds-media__figure" :class="figureClass">
            <slot name="figure"/>
        </div>

        <div class="slds-media__body" :class="bodyClass">
            <slot/>
        </div>

        <div
            v-if="$slots['figure-reverse']"
            class="slds-media__figure slds-media__figure_reverse"
            :class="figureReverseClass"
        >
            <slot name="figure-reverse"/>
        </div>

    </div>
</template>

<script>
export default {
    name: 'SldsMediaObject',

    props: {
        bodyClass: {},
        center: Boolean,
        figureClass: {},
        figureReverseClass: {},
        large: Boolean,
        responsive: Boolean,
        small: Boolean,
    },

    computed: {
        mediaObjectClass() {
            return {
                'slds-media_center': this.center,
                'slds-media_large': this.large,
                'slds-media_responsive': this.responsive,
                'slds-media_small': this.small,
            }
        },
    },
}
</script>
