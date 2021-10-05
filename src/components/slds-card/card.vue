<template>
    <article class="slds-card">

        <!-- Header -->
        <div v-if="hasHeader" class="slds-card__header slds-grid">
            <header class="slds-media slds-media_center slds-has-flexi-truncate">

                <!-- Figure -->
                <div v-if="icon" class="slds-media__figure">
                    <slds-icon small :icon="icon"/>
                </div>

                <!-- Title -->
                <div class="slds-media__body">
                    <h2 class="slds-card__header-title slds-truncate">

                        <span v-if="title">
                            {{ title }}
                        </span>

                        <slot v-else-if="$slots.title" name="title"/>

                    </h2>
                </div>

                <!-- Actions -->
                <div v-if="$slots.actions" class="slds-no-flex">
                    <slot name="actions"/>
                </div>

            </header>
        </div>

        <!-- Body -->
        <div class="slds-card__body" :class="bodyClass">
            <slot/>
        </div>

        <!-- Footer -->
        <footer v-if="$slots.footer" class="slds-card__footer">
            <slot name="footer"/>
        </footer>

    </article>
</template>

<script>
import SldsIcon from '../slds-icon/icon.vue'

export default {
    name: 'SldsCard',

    components: {
        SldsIcon
    },

    props: {
        icon: String,
        noInnerPadding: Boolean,
        noInnerMargin: Boolean,
        title: String
    },

    computed: {
        bodyClass() {
            return {
                'slds-card__body_inner': !this.noInnerPadding,
                'slds-media__body-no-margin': this.noInnerMargin
            }
        },

        hasHeader() {
            return (
                this.icon ||
                this.title ||
                this.$slots.title ||
                this.$slots.actions
            )
        }
    }
}
</script>

<style scoped lang="scss">
.slds-media__body-no-margin {
    margin: 0;
}
</style>
