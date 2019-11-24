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
                            <span>Toast</span>
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

            <div class="slds-notify_container">
                <slds-toast icon="utility:success" warning>

                    <template #heading>
                        Nice
                    </template>

                </slds-toast>
            </div>
        </div>

    </article>
</template>
