<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Modal"
            details="Components"
        >
            <template #details>
                Modals are used to display content in a layer above the app. This paradigm is used in cases such as the
                creation or editing of a record, as well as various types of messaging and wizards.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-modal>

                <template #header>
                    Modal header
                </template>

                <template #content>
                    <slds-tooltip>

                        <template #trigger>
                            <slds-icon icon="utility:info" x-small/>
                        </template>

                        <template #default>
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
                            veniam incididunt duis in sint irure nisi.
                        </template>

                    </slds-tooltip>

                    Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
                    veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
                    officia tempor esse quis. Cillum sunt ad dolore quis aute consequat ipsum magna exercitation
                    reprehenderit magna. Tempor cupidatat consequat elit dolor adipisicing.

                    Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit officia. Lorem aliqua enim
                    laboris do dolor eiusmod officia. Mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                    proident. Eiusmod et adipisicing culpa deserunt nostrud ad veniam nulla aute est. Labore esse esse
                    cupidatat amet velit id elit consequat minim ullamco mollit enim excepteur ea.
                </template>

                <template #footer>
                    <button class="slds-button slds-button_neutral">
                        Cancel
                    </button>
                    <button class="slds-button slds-button_brand">
                        Save
                    </button>
                </template>

            </slds-modal>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Modal',
}
</script>
