<template>
    <article class="slds-card">
        <div class="slds-card__header slds-grid">

            <!-- Header -->
            <header class="slds-media slds-media_center slds-has-flexi-truncate">

                <!-- Figure -->
                <div class="slds-media__figure">
                    <span class="slds-icon_container slds-icon-standard-text">
                        <svg class="slds-icon slds-icon_small">
                            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#text"/>
                        </svg>
                    </span>
                </div>

                <!-- Title -->
                <div class="slds-media__body">
                    <h2 class="slds-card__header-title">
                        <span class="slds-card__header-link slds-truncate" title="Input">
                            <span>Counter</span>
                        </span>
                    </h2>
                </div>

            </header>
        </div>

        <!-- Body -->
        <div class="slds-card__body slds-card__body_inner">

            <slds-counter v-model="input" label="max 5" min="1" max="5"/>

        </div>

    </article>
</template>

<script>
    export default {
        data() {
            return {
                input: 7,
            }
        },
    }
</script>
