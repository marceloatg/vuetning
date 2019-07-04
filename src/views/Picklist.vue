<template>
    <article class="slds-card">
        <div class="slds-card__header slds-grid">

            <!-- Header -->
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
                        <span class="slds-card__header-link slds-truncate" title="Picklist">
                            <span>Picklist</span>
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

        </div>

    </article>
</template>

<script>
    export default {
        data() {
            return {
                options: [
                    {group: 'Status'},
                    {label: 'New', meta: "Creates a new record from zero. Totally fresh!", value: 'new'},
                    {label: 'In Progress', value: 'inProgress'},
                    {label: 'Finished', value: 'finished'},
                    {group: 'Fruits'},
                    {label: 'Banana', meta: "BA-NA-NA", value: 'ed691c6f-44b9-4850-91ca-caec35b49922', disabled: true},
                    {label: 'Pear', value: '4f639702-72fc-455c-8dc9-10610c919d8a'},
                    {label: 'Apple', value: '28d56658-5005-440b-b5e4-eb6e5f661d04'},
                ],
                selection: null,
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
