<template>
    <li class="slds-global-actions__item">
        <div class="slds-dropdown-trigger slds-dropdown-trigger_click">
            <button
                class="slds-button slds-button_icon slds-button_icon slds-button_icon-container slds-button_icon-small slds-global-actions__setup slds-global-actions__item-action"
                aria-haspopup="true"
                :title="assistiveText"
                @click="onClick"
            >

                <!-- SVG -->
                <slds-svg
                    :icon="icon"
                    class="slds-button__icon slds-global-header__icon"
                />

                <!-- Assistive text -->
                <span class="slds-assistive-text">
                    {{ assistiveText }}
                </span>

            </button>
        </div>
    </li>
</template>

<script>
import SldsSvg from '@/components/slds-svg/slds-svg'

export default {
    name: 'SldsGlobalAction',

    components: {
        SldsSvg
    },

    props: {
        assistiveText: String,
        icon: {type: String, required: true}
    },

    methods: {
        onClick() {
            this.$emit('click')
        },
    },
}
</script>
