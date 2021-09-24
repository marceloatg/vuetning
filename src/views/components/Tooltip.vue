<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Tooltip"
            details="Components"
        >
            <template #details>
                A Tooltip is a small piece of contextual information about an element on the screen, which is displayed
                when a user hovers or focuses on the element it is describing. It is not focusable and cannot contain
                focusable content.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-tooltip visible>

                <template #trigger>
                    <slds-icon icon="utility:info" x-small/>
                </template>

                <template #default>
                    Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
                    veniam incididunt duis in sint irure nisi.
                </template>

            </slds-tooltip>
        </slds-card>

        <slds-card class="slds-m-top_medium">
            <slds-tooltip>

                <template #trigger>
                    <slds-button neutral label="Help Text"/>
                </template>

                <template #default>
                    Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
                    veniam incididunt duis in sint irure nisi.
                </template>

            </slds-tooltip>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Tooltip",
}
</script>
