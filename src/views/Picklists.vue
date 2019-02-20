<template>
    <div>
        <slds-picklist label="My awesome picklist"
                       :options="options"
                       size="medium"
                       :required="true"
                       v-model="selection"/>
        <br>
        <p>
            Value selected is: {{ selection }}
        </p>
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
            }
        },
    }
</script>

<style scoped>

</style>