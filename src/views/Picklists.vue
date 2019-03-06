<template>
    <div>
        <slds-picklist
            v-model="selection"
            label="My awesome picklist"
            :options="options"
            size="medium"
            :required="true"/>
        <br>
        <p>
            Value selected is: {{ selection }}
        </p>
        <br>
        <slds-input
            v-model="input"
            label="My input"
            :required="true"
            placeholder="Type something nice!"
            :disabled="false"
            :read-only="false"
            :maxlength="10"/>
        <p>
            Value input is: {{ input }}
        </p>
        <br>
        <slds-input left-icon-name="utility:search"/>
        <br>
        <slds-input right-icon-name="utility:preview"/>
        <br>
        <slds-input left-icon-name="utility:search" right-icon-name="utility:preview"/>
        <br>
        <slds-input left-icon-name="utility:search" :has-clear-button="true"/>
        <br>
        <slds-input :has-clear-button="true"/>
        <br>
        <slds-input :has-clear-button="true" :spinner-active="true"/>
        <br>
        <slds-input pre-fixed-text="$"/>
        <br>
        <slds-input post-fixed-text="Euro"/>
        <br>
        <slds-input pre-fixed-text="$" post-fixed-text="Euro"/>
        <br>
        <slds-input
            pre-fixed-text="$"
            post-fixed-text="Euros"
            :has-clear-button="true"
            :spinner-active="true"/>
        <br>
        <slds-input label="Phone" inline-help="ex: (415)111-2222"/>
    </div>
</template>

<script>
    export default {
        name: "Picklists",
        data() {
            return {
                options: [
                    {group: 'Status'},
                    {label: 'New', value: 'new'},
                    {label: 'In Progress', value: 'inProgress'},
                    {label: 'Finished', value: 'finished'},
                    {group: 'Fruits'},
                    {label: 'Banana', value: 'ed691c6f-44b9-4850-91ca-caec35b49922'},
                    {label: 'Pear', value: '4f639702-72fc-455c-8dc9-10610c919d8a'},
                    {label: 'Apple', value: '28d56658-5005-440b-b5e4-eb6e5f661d04'},
                ],
                selection: null,
                input: null,
            }
        },
    }
</script>

<style scoped>

</style>