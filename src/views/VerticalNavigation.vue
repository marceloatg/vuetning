<template>
    <main class="demo-only">
        <slds-vertical-navigation
            :has-quickfind="true"
            :sections="sections"
            :active-item="activeItem"
            @click="onClick"/>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                activeItem: '99c1b25e-f1e4-45c7-9952-3006ac878838',
                sections: [
                    {
                        key: 'reports',
                        heading: 'Reports',
                        items: [
                            {
                                key: '99c1b25e-f1e4-45c7-9952-3006ac878838',
                                label: 'Recent',
                            },
                            {
                                key: '34cea076-2fd2-411e-9170-a35fa38ced34',
                                label: 'Created by Me',
                            },
                            {
                                key: 'ef7c46a2-211c-42df-ae6f-c1b1737fd3ac',
                                label: 'Private Reports',
                            },
                            {
                                key: '3e0b3a3c-c297-4830-9e48-151bf9b1ab58',
                                label: 'Public Reports',
                            },
                            {
                                key: '0c0f8153-7e20-4edc-a054-77cd10c48f4c',
                                label: 'All Reports',
                            },
                        ],
                    },
                    {
                        key: 'folders',
                        heading: 'Folders',
                        items: [
                            {
                                key: '00e39c20-98d1-4e77-95b9-f85b54628480',
                                label: 'Created by Me',
                            },
                            {
                                key: '3e5bccdb-ae24-440f-9bd2-6df46b4ca46b',
                                label: 'Shared with Me',
                            },
                        ],
                    },
                ],
            }
        },
        methods: {
            onClick(item) {
                if (this.activeItem === item.key) return;
                this.activeItem = item.key;
            },
        },
    }
</script>

<style scoped>
    main {
        margin: -12px;
        background: white;
        height: calc(100% + 24px);
        width: 320px;
    }
</style>