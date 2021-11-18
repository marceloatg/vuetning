import sldsActivityTimeline from './slds-activity-timeline.vue'
import sldsActivityTimelineItem from './slds-activity-timeline-item'

export default Vue => {
    Vue.component(sldsActivityTimeline.name, sldsActivityTimeline)
    Vue.component(sldsActivityTimelineItem.name, sldsActivityTimelineItem)
}
