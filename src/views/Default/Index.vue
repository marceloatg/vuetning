<template>
    <main>
        <slds-page-header/>
    </main>
</template>

<script>
    import SldsPageHeader from './PageHeader'

    export default {
        components: {
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
