<template>
    <li class="slds-global-actions__item">
        <div class="slds-global-actions__favorites slds-dropdown-trigger slds-dropdown-trigger_click">
            <div class="slds-button-group">

                <!-- Toggle button -->
                <button
                    class="slds-button slds-button_icon slds-global-actions__favorites-action slds-button_icon slds-button_icon-border slds-button_icon-small"
                    aria-pressed="false"
                    title="Toggle Favorites"
                >
                    <!-- SVG -->
                    <slds-svg
                        :icon="icon"
                        class="slds-button__icon"
                    />

                    <!-- Assistive text -->
                    <span class="slds-assistive-text">
                        Toggle Favorite
                    </span>

                </button>

                <!-- View Favorites button -->
                <button
                    class="slds-button slds-button_icon slds-global-actions__favorites-more slds-button_icon slds-button_icon-border slds-button_icon-small"
                    title="View Favorites"
                >
                    <!-- SVG -->
                    <slds-svg
                        icon="utility:down"
                        class="slds-button__icon slds-button__icon_small"
                    />

                    <!-- Assistive text -->
                    <span class="slds-assistive-text">
                        View Favorites
                    </span>

                </button>

            </div>
        </div>
    </li>
</template>

<script>
import SldsSvg from '@/components/slds-svg/slds-svg'

export default {
    name: 'SldsGlobalActionFavorites',

    components: {
        SldsSvg
    },

    props: {
        icon: {
            type: String,
            default: 'utility:favorite',
        }
    },
}
</script>
