<!--
    @Description: Toggle visibility of section content.
    @Documentation: https://www.lightningdesignsystem.com/components/expandable-section/
-->

<template>
    <div class="slds-section" :class="[{'slds-is-open': isOpen || !collapsible}]">

        <!-- Button title -->
        <h3 v-if="collapsible" class="slds-section__title">
            <button class="slds-button slds-section__title-action" @click="toggle">

                <slds-svg icon-name="utility:switch" class="slds-section__title-action-icon slds-button__icon slds-button__icon_left"/>

                <span class="slds-truncate" :title="title">
                    {{ title }}
                </span>

            </button>
        </h3>

        <!-- Span title -->
        <h3 v-else class="slds-section__title slds-theme_shade">
            <span class="slds-truncate slds-p-horizontal_small" :title="title">
                {{ title }}
            </span>
        </h3>

        <!-- content -->
        <div class="slds-section__content">
            <slot/>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true,
                note: 'Title of an expandable section.'
            },
            collapsible: {
                type: Boolean,
                default: true,
                note: 'Indicates if the content can be collapsed or not.'
            },
            expanded: {
                type: Boolean,
                default: false,
                note: 'Toggle visibility of section content'
            }
        },
        data() {
            return {
                isOpen: false,
            }
        },
        methods: {
            toggle() {
                this.isOpen = !this.isOpen;
            }
        },
        mounted() {
            this.isOpen = this.expanded;
        }
    }
</script>

<style scoped lang="scss">

    .slds-section__title-action-icon {
        transition: all .4s ease-in-out;
    }

    .slds-section__content {
        transition: all .4s ease-in-out;
    }

</style>