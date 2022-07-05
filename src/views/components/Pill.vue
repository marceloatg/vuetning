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
                non-removable
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />

            <slds-pill
                label="Pill label"
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />

            <slds-pill
                label="Pill label"
                link
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />

        </slds-card>

        <slds-card class="slds-m-top_medium" title="Icon">

            <slds-pill
                icon="standard:user"
                label="Pill label"
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />

            <slds-pill
                icon="standard:user"
                label="Pill label"
                link
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />

        </slds-card>

        <slds-card class="slds-m-top_medium" title="Avatar">

            <slds-pill
                label="Pill label"
                src="https://i.picsum.photos/id/323/200/200.jpg?hmac=EoedzCHJZRv1-7_RBKDcba4cXIfclsicfsYbW3-VEsA"
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />

            <slds-pill
                label="Pill label"
                link
                src="https://i.picsum.photos/id/323/200/200.jpg?hmac=EoedzCHJZRv1-7_RBKDcba4cXIfclsicfsYbW3-VEsA"
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />

        </slds-card>

        <slds-card class="slds-m-top_medium" title="Error">

            <slds-pill
                has-error
                icon="utility:error"
                label="Pill label"
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />

            <slds-pill
                has-error
                icon="utility:error"
                label="Pill label"
                link
                title="Full pill label verbiage mirrored here"
                @remove="onRemove"
                @click="onClickPill"
            />

        </slds-card>

        <slds-card class="slds-m-top_medium" title="Container">
            <slds-pill-container>

                <slds-pill
                    label="Pill label"
                    title="Full pill label verbiage mirrored here"
                    @remove="onRemove"
                    @click="onClickPill"
                />

                <slds-pill
                    label="Pill label"
                    link
                    title="Full pill label verbiage mirrored here"
                    @remove="onRemove"
                    @click="onClickPill"
                />

            </slds-pill-container>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'PillView',

    methods: {
        onRemove() {
            alert('Pill removed')
        },

        onClickPill() {
            alert('Pill clicked')
        }
    }
}


</script>
