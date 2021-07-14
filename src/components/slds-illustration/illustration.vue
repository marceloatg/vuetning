<template>
    <div class="slds-illustration" :class="illustrationClass">

        <!-- Image -->
        <img v-if="src" :src="src" :alt="alt" class="slds-illustration__svg">
        <slot v-else/>

        <!-- Text -->
        <div class="slds-text-longform">

            <!-- Heading -->
            <h3 class="slds-text-heading_medium">
                {{ heading }}
            </h3>

            <!-- Message -->
            <p class="slds-text-body_regular">
                {{ message }}
            </p>

        </div>
    </div>
</template>

<script>
export default {
    name: 'SldsIllustration',

    props: {
        alt: String,
        heading: String,
        large: Boolean,
        message: String,
        src: String,
        small: Boolean,
        xSmall: Boolean,
    },

    computed: {
        illustrationClass() {
            if (this.xSmall) return 'slds-illustration_x-small'
            if (this.small) return 'slds-illustration_small'
            if (this.large) return 'slds-illustration_large'
            return 'slds-illustration_small'
        },
    },
}
</script>

<style scoped lang="scss">

.slds-illustration.slds-illustration_x-small {
    .slds-illustration__svg {
        width: 100%;
        max-width: 182px;
        max-height: 120px;
        margin-bottom: 1rem;
    }
}
</style>
