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
                            <span>Dueling-Picklist</span>
                        </span>
                    </h2>
                </div>

            </header>
        </div>

        <!-- Body -->
        <div class="slds-card__body slds-card__body_inner">
            <slds-dueling-picklist
                v-model="input"
                label="Select Options (at least 5 and at most 10)"
                source-label="Available"
                selected-label="Selected"
                :options="options"
                :min="3"
                reorderable/>
        </div>

        <p class="slds-p-around_medium">
            Input: {{ input }}
        </p>

    </article>
</template>

<script>
    export default {
        data() {
            return {
                options: [
                    {label: 'New', meta: "Creates a new record from zero. Totally fresh!", value: 'new'},
                    {label: 'In Progress', value: 'inProgress'},
                    {label: 'Finished', value: 'finished'},
                    {label: 'Banana', meta: "BA-NA-NA", value: 'ed691c6f-44b9-4850-91ca-caec35b49922', disabled: true},
                    {label: 'Pear', value: '4f639702-72fc-455c-8dc9-10610c919d8a'},
                    {label: 'Apple', value: '28d56658-5005-440b-b5e4-eb6e5f661d04'},
                ],
                input: ['ed691c6f-44b9-4850-91ca-caec35b49922'],
            }
        },
        methods: {
            onChange() {
                console.log(this.input)
            }
        },
    }
</script>
