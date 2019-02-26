<template>
    <main>
        <div class="slds-text-heading_large">
            Base
        </div>
        <br>
        <slds-pill label="Base pill"/>
        <slds-pill label="Unclickable pill" :clickable="false"/>
        <slds-pill label="Base pill" :has-error="true"/>
        <br>
        <br>
        <div class="slds-text-heading_large">
            Icon
        </div>
        <br>
        <slds-pill label="Account">
            <template #icon>
                <slds-icon icon-name="standard:account"/>
            </template>
        </slds-pill>
        <slds-pill label="Lead" :clickable="false">
            <template #icon>
                <slds-icon icon-name="standard:lead"/>
            </template>
        </slds-pill>

    </main>
</template>

<script>
    export default {
        name: "Pills"
    }
</script>

<style scoped>

</style>