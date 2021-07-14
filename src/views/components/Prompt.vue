<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Prompt"
            details="Components"
        >
            <template #details>
                Prompt notice grabs the user’s attention & alerts them of system-related issues/updates.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-prompt error-theme has-texture>

                <template #header>
                    <h2 class="slds-text-heading_medium">
                        Service unavailable
                    </h2>
                </template>

                <template #content>
                    Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
                    veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
                    officia tempor esse quis. Cillum sunt ad dolore quis aute consequat ipsum magna exercitation
                    reprehenderit magna. Tempor cupidatat consequat elit dolor adipisicing.
                </template>

            </slds-prompt>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Prompt",
}
</script>
