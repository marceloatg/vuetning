<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Scoped Notification"
            details="Components"
        >
            <template #details>
                Scoped notifications serve advisory information for the user that is not important enough to justify an
                alert. It is often presented as a status bar scoped to the container. They are not dismissible.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium" title="Base">
            <slds-scoped-notification>
                <p>It looks as if duplicates exist for this lead.
                    <a href="javascript:void(0);">
                        View Duplicates.
                    </a>
                </p>
            </slds-scoped-notification>
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Informational">
            <slds-scoped-notification info>
                <p>It looks as if duplicates exist for this lead.
                    <a href="javascript:void(0);">
                        View Duplicates.
                    </a>
                </p>
            </slds-scoped-notification>
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Success">
            <slds-scoped-notification success>
                <p>It looks as if duplicates exist for this lead.
                    <a href="javascript:void(0);">
                        View Duplicates.
                    </a>
                </p>
            </slds-scoped-notification>
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Warning">
            <slds-scoped-notification warning>
                <p>It looks as if duplicates exist for this lead.
                    <a href="javascript:void(0);">
                        View Duplicates.
                    </a>
                </p>
            </slds-scoped-notification>
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Error">
            <slds-scoped-notification error>
                <p>It looks as if duplicates exist for this lead.
                    <a href="javascript:void(0);">
                        View Duplicates.
                    </a>
                </p>
            </slds-scoped-notification>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'ScopedNotification',
}
</script>
