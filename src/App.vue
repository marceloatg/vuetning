<template>
    <div id="app">
        <slds-button label="My button"/>
        <slds-button label="My brand button" variant="brand"/>
        <slds-button label="Add" icon-name="utility:add"/>
        <slds-button label="Delete" icon-name="utility:delete" icon-position="right"/>
        <slds-button label="My button" :show-spinner="true"/>
        <br>
        <br>
        <slds-avatar src="/assets/images/avatar1.jpg"/>
        <slds-avatar src="/assets/images/avatar1.jpg" variant="circle" class="slds-m-left_medium"/>
        <slds-avatar initials="MA" fallback-icon-name="standard:account" class="slds-m-left_medium"/>
        <slds-avatar initials="MA" fallback-icon-name="standard:lead" variant="circle" class="slds-m-left_medium"/>
        <slds-avatar initials="MA" fallback-icon-name="standard:lead" variant="circle" :inverse="true" class="slds-m-left_medium"/>
        <br><br>
        <slds-icon icon-name="utility:down" variant="default" size="small"/>
        <slds-icon icon-name="utility:check" variant="success"/>
        <slds-icon icon-name="standard:account" size="large"/>
    </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style lang="scss">
    #app {
        padding: 16px;
    }
</style>