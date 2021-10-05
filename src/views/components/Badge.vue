<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Badge"
            details="Components"
        >
            <template #details>
                Badges are labels which hold small amounts of information.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium" title="Colors">
            <slds-badge label="Default Badge"/>
            <slds-badge label="Darker Badge" inverse/>
            <slds-badge label="Lightest Badge" lightest/>
            <slds-badge label="Success  Badge" success/>
            <slds-badge label="Warning  Badge" warning/>
            <slds-badge label="Error  Badge" error/>
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Icons">
            <slds-badge label="Default Badge" icon="utility:moneybag"/>
            <slds-badge label="Default Badge" left icon="utility:moneybag"/>
            <slds-badge label="Default Badge" right icon="utility:moneybag"/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Badge',
}
</script>
