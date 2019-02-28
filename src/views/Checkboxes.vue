<template>
    <main>
        <slds-checkbox label="My checkbox" variant="inline"/>
        <br>
        <slds-checkbox label="My stacked checkbox" variant="stacked"/>
        <br>
        <slds-checkbox label="My checkbox" :read-only="true"/>
        <br>
        <slds-checkbox label="My checkbox" :read-only="true" :checked="true"/>
        <br>
        <slds-checkbox label="My checkbox" variant="stacked" :required="true"/>
        <br>
        <slds-checkbox label="My checkbox" :has-error="true" error-message="Nope!"/>
        <br>
        <slds-checkbox label="My checkbox" variant="inline" :disabled="true"/>
        <br>
        <slds-checkbox label="My checkbox" variant="stacked" :disabled="true"/>
    </main>
</template>

<script>
    export default {
        name: "Checkboxes"
    }
</script>

<style scoped>

</style>