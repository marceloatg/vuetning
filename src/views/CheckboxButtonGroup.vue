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
                        <span class="slds-card__header-link slds-truncate" title="Checkbox Button Group">
                            <span>Checkbox Button Group</span>
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

            <slds-checkbox-button-group label="Scheduled Day(s)" :options="options"/>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Required
            </h2>

            <slds-checkbox-button-group label="Scheduled Day(s)" :options="options" required/>

            <br>

            <slds-checkbox-button-group
                label="Scheduled Day(s)"
                :options="options"
                required
                error>
                <template #error>
                    <p>This field is required.</p>
                </template>
            </slds-checkbox-button-group>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Disabled
            </h2>

            <slds-checkbox-button-group label="Scheduled Day(s)" :options="disabledOptions"/>

            <br>

            <slds-checkbox-button-group label="Scheduled Day(s)" :options="options" disabled/>

        </div>

    </article>
</template>

<script>
    export default {
        data() {
            return {
                disabledOptions: [
                    {label: 'Mon', value: 'monday'},
                    {label: 'Tue', value: 'tuesday'},
                    {label: 'Wed', value: 'wednesday'},
                    {label: 'Thu', value: 'thursday'},
                    {label: 'Fri', value: 'friday'},
                    {label: 'Sat', value: 'saturday', disabled: true},
                    {label: 'Sun', value: 'sunday', disabled: true},
                ],
                options: [
                    {label: 'Mon', value: 'monday'},
                    {label: 'Tue', value: 'tuesday'},
                    {label: 'Wed', value: 'wednesday'},
                    {label: 'Thu', value: 'thursday'},
                    {label: 'Fri', value: 'friday'},
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
