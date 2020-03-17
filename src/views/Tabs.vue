<template>
    <article class="slds-card">

        <!-- Body -->
        <div class="slds-card__body slds-card__body_inner">
            <slds-tabs :items="items" :active-item="activeItem" @click="onClickTab">

                <template #1>
                    <h2>Item One Content</h2>
                </template>

                <template #2>
                    <h2>Item Two Content</h2>
                </template>

                <template #3>
                    <h2>Item Three Content</h2>
                </template>

                <template #4>
                    <h2>Item Four Content</h2>
                </template>

            </slds-tabs>

        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                activeItem: '1',
                items: [
                    {key: '1', label: 'Item One', icon: 'standard:opportunity'},
                    {key: '2', label: 'Item Two', icon: 'standard:lead'},
                    {key: '3', label: 'Item Three'},
                    {key: '4', label: 'Item Four', error: true},
                ],
            }
        },
        methods: {
            onClickTab(tabKey) {
                this.activeItem = tabKey;
            },
        },
    }
</script>
