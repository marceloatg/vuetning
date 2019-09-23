<template>
    <slds-modal size="small">

        <template #header>
            <h2 class="slds-text-heading_medium slds-hyphenate">
                Select Something
            </h2>
        </template>

        <template #content>

            <slds-wide-radio-group
                v-model="option"
                label="My wide radio group"
                :options="options"
                disabled/>

            Selected option: {{ option }}

        </template>

        <template #footer>

            <!-- Cancel button -->
            <slds-button label="Cancel" neutral/>

            <!-- Save button -->
            <slds-button label="Save" variant="brand" brand/>

        </template>

    </slds-modal>
</template>

<script>
    export default {
        data() {
            return {
                options: [
                    {
                        value: 'my-first-option',
                        label: 'My first option',
                        meta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at dolor in enim suscipit semper. Duis eget eros dignissim, rhoncus tellus vitae, maximus nibh.'
                    },
                    {
                        value: 'my-second-option',
                        label: 'My second option',
                        meta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at dolor in enim suscipit semper. Duis eget eros dignissim, rhoncus tellus vitae, maximus nibh.'
                    }
                ],
                option: null,
            }
        },
        methods: {
            onSaveAndNewClick() {

            },
            onSaveClick() {

            },
        },
    }
</script>
