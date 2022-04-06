<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Pill"
            details="Components"
        >
            <template #details>
                A pill represents an object that can be viewed with or without an icon.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium" title="Base">
            <slds-pill
                label="Pill label"
                name="pill"
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Icon">
            <slds-pill
                icon="standard:user"
                label="Pill label"
                name="pill"
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Avatar">
            <slds-pill
                label="Pill label"
                name="pill"
                src="https://i.picsum.photos/id/323/200/200.jpg?hmac=EoedzCHJZRv1-7_RBKDcba4cXIfclsicfsYbW3-VEsA"
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Error">
            <slds-pill
                :has-error="true"
                icon="utility:error"
                label="Pill label"
                name="pill"
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Pill',

    methods: {
        onRemove(name) {
            console.log("EVENTO DE REMOVE")
        },

        onClickPill(name) {
            console.log("EVENTO DE CLICK")
        }
    }
}


</script>
