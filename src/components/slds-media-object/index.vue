<template>
    <div class="slds-media" :class="mediaObjectClass">

        <div v-if="$slots['figure']" class="slds-media__figure">
            <slot name="figure"/>
        </div>

        <div class="slds-media__body">
            <slot/>
        </div>

        <div v-if="$slots['figure-reverse']" class="slds-media__figure slds-media__figure_reverse">
            <slot name="figure-reverse"/>
        </div>

    </div>
</template>

<script>
export default {
    name: "SldsMediaObject",

    props: {
        center: {
            type: Boolean,
        },
        large: {
            type: Boolean,
        },
        responsive: {
            type: Boolean,
        },
        small: {
            type: Boolean,
        },
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
