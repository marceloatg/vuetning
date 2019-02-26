<!--
    @Description: An illustration is an src and inline text that work in tandem to communicate a store in a more friendly way.
    @Documentation: https://www.lightningdesignsystem.com/components/illustration/
-->

<template>
    <div class="slds-illustration" :class="['slds-illustration_' + size]">

        <img :src="src" class="slds-illustration__svg">

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
        props: {
            src: {
                type: String,
                note: 'Image path.'
            },
            heading: {
                type: String,
                note: 'Heading text.'
            },
            message: {
                type: String,
                note: 'Message text.'
            },
            size: {
                type: String,
                default: 'small',
                note: 'Illustration size. Check the validator for available options.',
                validator(value) {
                    return [
                        'x-small',
                        'small',
                        'large',
                    ].indexOf(value) !== -1
                }
            }
        }
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