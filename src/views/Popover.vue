<template>
    <article class="slds-card">

        <!-- Header -->
        <div class="slds-card__header slds-grid">
            <header class="slds-media slds-media_center slds-has-flexi-truncate">

                <!-- Figure -->
                <div class="slds-media__figure">
                    <span class="slds-icon_container slds-icon-standard-actions-and-buttons">
                        <svg class="slds-icon slds-icon_small">
                            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#actions_and_buttons"/>
                        </svg>
                    </span>
                </div>

                <!-- Title -->
                <div class="slds-media__body">
                    <h2 class="slds-card__header-title">
                        <span class="slds-card__header-link slds-truncate" title="Tooltips">
                            <span>Popover</span>
                        </span>
                    </h2>
                </div>

            </header>
        </div>

        <!-- Body -->
        <div class="slds-card__body slds-card__body_inner">

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Base
            </h2>

            <slds-popover left-top-nubbin max-height>

                <template #trigger>
                    <slds-button-icon icon="utility:info" bordered-filled class="slds-popover-trigger_click"/>
                </template>

                <template #header>
                    <h2 class="slds-text-heading_small">
                        Header Title
                    </h2>
                </template>

                <div class="slds-text-longform">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua.</p>
                </div>

                <template #footer>
                    <p>Footer Item</p>
                </template>

            </slds-popover>

            <br>

            <slds-popover bottom-left-nubbin>

                <template #trigger>
                    <slds-button-icon icon="utility:info" bordered-filled class="slds-popover-trigger_click"/>
                </template>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

            </slds-popover>

        </div>

    </article>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            onBlur() {
                console.log('blur')
            }
        },
    }
</script>
