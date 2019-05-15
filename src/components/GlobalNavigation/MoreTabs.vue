<template>
    <li class="slds-context-bar__item slds-context-bar__dropdown-trigger">

        <!-- More tabs button -->
        <button class="slds-button slds-context-bar__label-action" title="More">

            <span class="slds-indicator-container"/>

            <span class="slds-truncate">
                More
            </span>

            <svg class="slds-button__icon slds-button__icon_small slds-button__icon_right">
                <slds-svg icon-name="utility:chevrondown"/>
            </svg>

        </button>

        <!-- More tabs dropdown -->
        <div v-if="false" class="slds-dropdown slds-dropdown_right">
            <ul class="slds-dropdown__list" role="menu">
                <li
                    v-for="(tab, index) in overflowedTabs"
                    :key="tab.id"
                    class="slds-dropdown__item"
                    @click="onClick(index, tab)">

                    <a role="menuitem" tabindex="-1">
                        <span class="slds-truncate" :title="tab.title">

                            <span class="slds-indicator-container"/>

                            <span class="slds-icon_container">
                                <slds-svg :icon-name="tab.icon" class="slds-icon slds-icon_small slds-icon-text-default"/>
                            </span>

                            <span>
                                {{ tab.title }}
                            </span>

                        </span>
                    </a>

                </li>
            </ul>
        </div>

    </li>
</template>

<script>
    export default {
        props: {
            overflowedTabs: {
                type: Array,
                required: true,
            },
        },
        methods: {
            onClick(index, tab) {
                this.$emit('click', index, tab);
            },
        },
    }
</script>

<style scoped>

</style>
