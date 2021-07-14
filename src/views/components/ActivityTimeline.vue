<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Activity Timeline"
            details="Components"
        >
            <template #details>
                The activity timeline displays each of the user’s upcoming, current, and past activities.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-activity-timeline>
                <slds-activity-timeline-item
                    type="event"
                    icon="standard:logging"
                    date="9:00am | 3/20/21"
                    subject="Review proposals for EBC deck with larger team and have marketing review this"
                    subject-icons="utility:rotate"
                    assistive-text="task"
                >

                    <template #activity>
                        <a href="javascript:void(0);">
                            You
                        </a> created a task with
                        <a href="javascript:void(0);">
                            Charlie Gomez
                        </a>
                    </template>

                    <template #subject-action>
                        <slds-menu x-small bordered-filled/>
                    </template>

                </slds-activity-timeline-item>
            </slds-activity-timeline>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "ActivityTimeline",
}
</script>
