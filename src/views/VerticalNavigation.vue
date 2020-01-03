<template>
    <main class="demo-only">
        <slds-vertical-navigation
            has-quickfind
            :sections="sections"
            :active-item="activeItem"
            @click="onClick"/>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                activeItem: '4f338522-a6f7-4cd0-b829-f58f74126310',
                sections: [
                    {
                        key: 'user',
                        heading: 'My Files',
                        items: [
                            {
                                key: '4f338522-a6f7-4cd0-b829-f58f74126310',
                                label: 'Recent',
                                icon: 'utility:clock',
                            },
                            {
                                key: 'ee822d5f-4bbc-4c45-aec9-497a584d770f',
                                label: 'Starred',
                                icon: 'utility:favorite',
                            },
                            {
                                key: '99c1b25e-f1e4-45c7-9952-3006ac878838',
                                label: 'Created by Me',
                                icon: 'utility:user',
                            },
                            {
                                key: 'ef7c46a2-211c-42df-ae6f-c1b1737fd3ac',
                                label: 'Shared with Me',
                                icon: 'utility:groups',
                            },
                            {
                                key: '34cea076-2fd2-411e-9170-a35fa38ced34',
                                label: 'Recycle Bin',
                                icon: 'utility:delete',
                            },
                        ],
                    },
                    {
                        key: 'system',
                        heading: 'System Files',
                        items: [
                            {
                                key: '00e39c20-98d1-4e77-95b9-f85b54628480',
                                label: 'Comparisons',
                            },
                            {
                                key: '3e5bccdb-ae24-440f-9bd2-6df46b4ca46b',
                                label: 'Deployments',
                            },
                            {
                                key: '3e8fe01a-6ade-4296-afef-d9619f0e5d1d',
                                label: 'Smart Packages',
                            },
                            {
                                key: '3e0ca9f8-8110-4ddc-8cfa-a456a31be493',
                                label: 'Apex Execution',
                            },
                            {
                                key: 'aac3b4df-9ded-490d-ae5c-0aea01b4c29b',
                                label: 'SOQL Query',
                            },
                            {
                                key: 'c0887e11-8511-491b-b22c-9814941f48cb',
                                label: 'SOSL Search',
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