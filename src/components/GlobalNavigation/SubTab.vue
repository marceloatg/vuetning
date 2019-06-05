<template>
    <li
        class="slds-tabs_default__item slds-sub-tabs__item slds-grid slds-grid_vertical-align-center"
        :class="[{'slds-active': isActive}]"
        role="presentation"
        @click.prevent="onClickTab"
        @click.middle="onClickClose">

        <!-- Identification -->
        <a role="tab" class="slds-tabs_default__link slds-p-horizontal_xx-small" :title="title">

            <!-- Indicator -->
            <span class="slds-indicator-container"/>

            <!-- Icon -->
            <span class="slds-icon_container">
                <slds-svg :icon-name="iconName" :class="adjustmentClass" class="slds-icon slds-icon_small slds-icon-text-default"/>
            </span>

            <!-- Text -->
            <span class="slds-truncate">
                {{ title }}
            </span>

        </a>

        <!-- Close button -->
        <div v-if="!isMain" class="slds-col_bump-left slds-p-left_none slds-p-right_none">
            <slds-button-icon
                icon-name="utility:close"
                size="x-small"
                container="bare"
                title="Close"
                class="slds-button_icon-current-color"
                @click.prevent="onClickClose"/>
        </div>

    </li>
</template>

<script>
    export default {
        props: {
            iconName: {
                type: String,
                required: true,
            },
            isActive: {
                type: Boolean,
                default: false,
            },
            isMain: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                required: true,
            },
        },
        computed: {
            adjustmentClass() {
                const iconName = this.iconName;
                if (iconName.startsWith('utility')) return 'utility-category-adjustment';
                return null;
            },
        },
        methods: {
            onClickTab() {
                this.$emit('click');
            },
            onClickClose() {
                this.$emit('close');
            },
        },
    }
</script>


<style scoped lang="scss">
    .slds-sub-tabs__item {
        min-width: 12rem;
        width: 12rem;
        max-width: 15rem;
    }
</style>
