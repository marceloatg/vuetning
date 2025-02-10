<template>
    <article class="slds-card">

        <!-- Header -->
        <div v-if="hasHeader" :class="headerClassNames">
            <header class="slds-media slds-media_center slds-has-flexi-truncate">

                <!-- Figure -->
                <div v-if="iconName" class="slds-media__figure">
                    <slds-icon
                        data-testid="cardIcon"
                        :icon-class="iconClass"
                        :icon-name="iconName"
                        small
                    />
                </div>

                <!-- Title -->
                <div class="slds-media__body">
                    <h2 class="slds-card__header-title slds-truncate" data-testid="cardTitle">
                        <slot name="title">
                            <span v-if="title">
                                {{ title }}
                            </span>
                        </slot>
                    </h2>
                </div>

                <!-- Actions -->
                <div v-if="$slots.actions" class="slds-no-flex" data-testid="cardActions">
                    <slot name="actions"/>
                </div>

            </header>
        </div>

        <!-- Body -->
        <div :class="bodyClassNames">
            <slot/>
        </div>

        <!-- Footer -->
        <footer v-if="$slots.footer" :class="footerClassNames">
            <slot name="footer"/>
        </footer>

    </article>
</template>

<script lang="ts">
import SldsIcon from "../slds-icon/slds-icon.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsCard",

    components: {
        SldsIcon,
    },

    props: {
        /**
         * The class names to be passed to the icon.
         */
        iconClass: String,

        /**
         * The name of the icon to display in the header.
         */
        iconName: String,

        /**
         * Indicates whether the body does not have the inner padding.
         */
        noInnerPadding: Boolean,

        /**
         * Indicates whether the body does not have the inner margin.
         */
        noInnerMargin: Boolean,

        /**
         * The title to display in the header.
         * When using the title slot this prop is ignored.
         */
        title: String,
    },

    computed: {
        /**
         * The CSS class names for the body.
         */
        bodyClassNames(): string {
            let classNames = "slds-card__body"

            if (!this.noInnerPadding) classNames += " slds-card__body_inner"
            if (this.noInnerMargin) classNames += " slds-card__body_inner-no-margin"

            return classNames
        },

        /**
         * The CSS class names for the footer.
         */
        footerClassNames(): string {
            let classNames = "slds-card__footer"

            if (this.noInnerMargin) classNames += " slds-card__footer_inner-no-margin"

            return classNames
        },

        /**
         * The CSS class names for the header.
         */
        headerClassNames(): string {
            let classNames = "slds-card__header slds-grid"

            if (this.noInnerMargin) classNames += " slds-card__header_inner-no-margin"

            return classNames
        },

        /**
         * Indicates whether the card has a header.
         */
        hasHeader(): boolean {
            return Boolean(this.iconName || this.title || this.$slots.title || this.$slots.actions)
        },
    },
})
</script>

<style scoped lang="scss">

.slds-card__body_inner-no-margin {
    margin: 0;
}

.slds-card__footer_inner-no-margin {
    margin-top: 0;
}

.slds-card__header_inner-no-margin {
    margin-bottom: 0;
}

</style>
