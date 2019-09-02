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
                            <span>Text Area</span>
                        </span>
                    </h2>
                </div>

            </header>
        </div>

        <!-- Body -->
        <div class="slds-card__body slds-card__body_inner">

            <slds-text-area v-model="textArea" label="My text area" placeholder="Placeholder Text"/>

            <slds-text-area v-model="textArea" label="My disabled text area" disabled/>

            <slds-text-area v-model="textArea" label="My required text area" required/>

            <slds-text-area v-model="textArea" label="My error text area" error>
                <template #error>
                    My error message.
                </template>
            </slds-text-area>

            <slds-text-area v-model="textArea" label="My read only text area" readonly/>

            <div class="slds-text-heading_medium slds-m-top_large">
                Output
            </div>
            <p>
                {{ textArea }}
            </p>

        </div>

    </article>
</template>

<script>
    export default {
        data() {
            return {
                textArea: null,
            }
        },
        methods: {
            onChange() {
                console.log(this.input)
            }
        },
    }
</script>
