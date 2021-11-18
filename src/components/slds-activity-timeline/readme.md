# Activity Timeline ![avaliability](https://img.shields.io/badge/avaliability-alpha-yellow.svg)  ![testing](https://img.shields.io/badge/coverage-0%25-red.svg) ![documentation](https://img.shields.io/badge/documentation-draft-red.svg)

The activity timeline displays each of the user’s upcoming, current, and past activities.

## Props

None.

## Slots

| Name    | Optional | Description |
| ------- | -------- | ----------- |
| default | true     | The slot to place the activity items. |


## Events

None.

## Examples

```vue
<!-- Passing sections via prop -->
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
```

## Salesforce documentation
[SLDS documentation](https://www.lightningdesignsystem.com/components/activity-timeline/)
