import sldsActivityTimeline from './activity-timeline.vue'
import sldsActivityTimelineItem from './activity-timeline-item'

export default Vue => {
    Vue.component(sldsActivityTimeline.name, sldsActivityTimeline)
    Vue.component(sldsActivityTimelineItem.name, sldsActivityTimelineItem)
}
