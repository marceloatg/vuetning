<template>
    <li class="slds-accordion__list-item">
        <section class="slds-accordion__section" :class="{'slds-is-open': isOpen}">

            <!-- Summary -->
            <div class="slds-accordion__summary">
                <h2 class="slds-accordion__summary-heading">
                    <button
                        :aria-expanded="isOpen"
                        class="slds-button slds-button_reset slds-accordion__summary-action"
                        @click="onClickLabel"
                    >

                        <!-- Chevron -->
                        <slds-svg
                            class="slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left"
                            icon="utility:switch"
                        />

                        <!-- Content -->
                        <span class="slds-accordion__summary-content">
                            <slot name="summary">
                                {{ label }}
                            </slot>
                        </span>

                    </button>
                </h2>
            </div>

            <!-- Content -->
            <div class="slds-accordion__content">
                <slot>
                    {{ content }}
                </slot>
            </div>

        </section>
    </li>
</template>

<!--suppress JSValidateTypes -->
<script>
import SldsSvg from '../slds-svg/slds-svg'

export default {
    name: 'SldsAccordionSection',

    components: {
        SldsSvg
    },

    props: {
        /**
         * @description The content in the accordion section.
         * @type {String}
         */
        content: String,

        /**
         * @description The text that displays as the title of the section.
         * @type {String}
         */
        label: String,

        /**
         * @description The unique section name to use with the active-section-name attribute in the accordion component.
         * @type {String}
         */
        name: String,
    },

    computed: {
        /**
         * @description Gets the single active section name or list of section names.
         * @return {Boolean}
         */
        isOpen() {
            const activeSectionName = this.$parent.$data.$_activeSectionName

            if (typeof (activeSectionName) === 'string') return activeSectionName === this.name
            if (Array.isArray(activeSectionName)) return activeSectionName.includes(this.name)
            return false
        },
    },

    methods: {
        /**
         * @description Handles the click event on the section label.
         */
        onClickLabel() {
            this.$parent.onActiveSectionChange(this.name)
            this.$emit('active-section-change', this.name)
        },
    },
}
</script>
