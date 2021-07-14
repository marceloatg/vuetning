<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Expandable Section"
            details="Components"
        >
            <template #details>
                Toggle visibility of section content.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-expandable-section title="My Expandable Section">
                Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac
                cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla
                vitae elit libero, a pharetra augue.
                <slds-picklist :options="['lorem ipsum', 'lorem ipsum', 'lorem ipsum', 'lorem ipsum']"/>
                <slds-button-icon brand icon="utility:add" @click="onAdd"/>
                <p v-for="(item, index) in items" :key="index">
                    {{ item }}
                </p>
            </slds-expandable-section>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "ExpandableSection",

    data() {
        return {
            items: []
        }
    },

    methods: {
        onAdd() {
            this.items.push('Lorem ipsum dolor sit amet.')
        }
    }
}
</script>
