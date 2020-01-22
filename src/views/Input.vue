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
                            <span>Input</span>
                        </span>
                    </h2>
                </div>

            </header>
        </div>

        <!-- Body -->
        <div class="slds-card__body slds-card__body_inner">
            <!--
        <slds-picklist
            v-model="selection"
            label="My awesome picklist"
            :options="options"
            size="medium"
            :length="7"
            :required="true"/>
        <br>
        <p>
            Value selected is: {{ selection }}
        </p>
        <br>
        -->
            <slds-input
                v-model="input"
                label="My input"
                placeholder="Type at most 10 characters"
                maxlength="10"
                class="slds-m-bottom_small"
                @input="onChange"/>
            <p class="slds-border_bottom slds-p-bottom_medium">
                Value input is: {{ input }}
            </p>
            <br>

            <slds-input label="Readonly input" value="My input value" readonly/>
            <br>

            <slds-input v-model="input" label="Required input" required/>
            <br>

            <slds-input v-model="input" label="Disabled input" disabled/>
            <br>

            <slds-input
                v-model="input"
                label="Fixed text input"
                addon-pre="$"
                addon-post="euro"/>
            <br>

            <slds-input v-model="input" label="Icon input" icon="utility:search"/>
            <br>

            <slds-input v-model="input" label="Spinner input" spinner/>
            <br>

            <slds-input v-model="input" label="Inline Help input" inline-help>
                <template #inline-help>
                    ex: (415)111-2222
                </template>
            </slds-input>
            <br>

            <slds-input v-model="input" label="Error input" error>
                <template #error>
                    This field is required
                </template>
            </slds-input>
            <br>

            <slds-counter label="Counter" min-value="0"/>
        </div>

    </article>
</template>

<script>
    export default {
        data() {
            return {
                input: null,
            }
        },
        methods: {
            onChange() {
                console.log(this.input)
            }
        },
    }
</script>
