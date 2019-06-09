<template>
    <main>
        <slds-page-header/>
        <slds-virtual-table class="slds-m-vertical_medium"/>
    </main>
</template>

<script>
    import SldsPageHeader from './PageHeader'
    import SldsVirtualTable from "./VirtualTable";

    export default {
        components: {
            SldsVirtualTable,
            SldsPageHeader,
        },
        data() {
            return {
                tabIcon: 'utility:settings',
                tabTitle: 'Settings',
            }
        },
    }
</script>