<template>
    <article class="slds-card">

        <!-- Header -->
        <div class="slds-card__header slds-grid">
            <header class="slds-media slds-media_center slds-has-flexi-truncate">

                <!-- Figure -->
                <div class="slds-media__figure">
                    <span class="slds-icon_container slds-icon-standard-picklist-type">
                        <svg class="slds-icon slds-icon_small">
                            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#picklist_type"/>
                        </svg>
                    </span>
                </div>

                <!-- Title -->
                <div class="slds-media__body">
                    <h2 class="slds-card__header-title">
                        <span class="slds-card__header-link slds-truncate" title="Combobox">
                            <span>Lookup</span>
                        </span>
                    </h2>
                </div>

            </header>
        </div>

        <!-- Body -->
        <div class="slds-card__body slds-card__body_inner">

            <slds-lookup
                v-model="input"
                :options="options"
                label="My awesome Lookup"
                placeholder="Select an option"
                search-source="Users"
                class="slds-m-bottom_small"
                @input="onChange"/>

            <p class="slds-border_bottom slds-p-bottom_medium">
                Value input is: {{ input }}
            </p>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Spinner
            </h2>

            <slds-lookup
                v-model="input"
                :options="options"
                label="Spinner active Combobox"
                placeholder="Select an option"
                search-source="Users"
                class="slds-m-bottom_small"
                spinner/>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Required
            </h2>

            <slds-lookup
                :options="options"
                label="Required Combobox"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                required/>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Error
            </h2>

            <slds-lookup
                :options="options"
                label="Combobox with error"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                error>
                <template #error>
                    This field is required
                </template>
            </slds-lookup>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Disabled
            </h2>

            <slds-lookup
                :options="options"
                label="Disabled Combobox"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                disabled/>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Size
            </h2>
            <p class="slds-text-body_regular slds-m-bottom_small">
                To change the input size, append one of the following attributes to the combobox:
                <b>xx-small, x-small, small, medium, large, x-large, xx-large</b>.
            </p>

            <slds-lookup
                :options="options"
                label="xx-small"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                xx-small/>

            <slds-lookup
                :options="options"
                label="x-small"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                x-small/>

            <slds-lookup
                :options="options"
                label="small"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                small/>

            <slds-lookup
                :options="options"
                label="medium"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                medium/>

            <slds-lookup
                :options="options"
                label="large"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                large/>

            <slds-lookup
                :options="options"
                label="x-large"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                x-large/>

            <slds-lookup
                :options="options"
                label="xx-large"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                xx-large/>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Length
            </h2>
            <p class="slds-text-body_regular slds-m-bottom_small">
                To change the dropdown length, append one of the length attributes to the combobox with the following
                numeric values: <b>5, 7, 10</b>.
            </p>

            <slds-lookup
                :options="options"
                label="Length 5"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                :length="5"/>

            <slds-lookup
                :options="options"
                label="Length 7"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                :length="7"/>

            <slds-lookup
                :options="options"
                label="Length 10"
                placeholder="Select an option"
                class="slds-m-bottom_small"
                :length="10"/>

        </div>

    </article>
</template>

<script>
    export default {
        data() {
            return {
                options: [
                    {icon: 'standard:user', label: 'John Doe', meta: "General Operations • john.doe@bluebear.app", value: '28d56658-5005-440b-b5e4-eb6e5f661d04'},
                    {icon: 'standard:user', label: 'Jane Doe', meta: "General Operations • jane.doe@bluebear.app", value: 'ed691c6f-44b9-4850-91ca-caec35b49922'},
                ],
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
