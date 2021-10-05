<template>
    <li>
        <div class="slds-timeline__item_expandable" :class="itemClass">

            <!-- Assistive text -->
            <span v-if="assistiveText" class="slds-assistive-text">
                {{ assistiveText }}
            </span>

            <!-- Media object -->
            <slds-media-object>

                <template #figure>

                    <!-- Switch -->
                    <slds-button-icon
                        v-if="expandable"
                        icon="utility:switch"
                        icon-class="slds-timeline__details-action-icon"
                        :title="`Toggle details for ${subject}`"
                        :assistive-text="`Toggle details for ${subject}`"
                        aria-controls="task-item-base"
                    />

                    <!-- Switch placeholder -->
                    <div v-else class="switch-placeholder slds-button_icon"/>

                    <!--  Icon -->
                    <slds-icon
                        :icon="icon"
                        small
                        class="slds-timeline__icon"
                        :class="iconClass"
                    />

                </template>

                <template #default>

                    <!-- Subject -->
                    <div class="slds-grid slds-grid_align-spread slds-timeline__trigger">

                        <div class="slds-grid slds-grid_vertical-align-center slds-truncate_container_75 slds-no-space">

                            <h3 class="slds-truncate" :title="subject">

                                <a v-if="expandable">
                                    <strong>{{ subject }}</strong>
                                </a>

                                <span v-else>
                                    <strong>{{ subject }}</strong>
                                </span>

                            </h3>

                            <!-- Subject icons -->
                            <div class="slds-no-flex">
                                <slot name="subject-icons">
                                    <slds-icon
                                        v-for="(icon, index) in formattedSubjectIcons"
                                        :key="index"
                                        :icon="icon"
                                        xx-small
                                        class="slds-m-left_x-small"
                                    />
                                </slot>
                            </div>

                        </div>

                        <!-- Actions -->
                        <div class="slds-timeline__actions slds-timeline__actions_inline">

                            <p class="slds-timeline__date">
                                {{ date }}
                            </p>

                            <slot name="subject-action"/>

                        </div>

                    </div>

                    <!-- Activity -->
                    <p class="slds-m-horizontal_xx-small">
                        <slot name="activity"/>
                    </p>

                    <!-- Expandable section -->
                    <article
                        v-if="expandable"
                        class="slds-box slds-timeline__item_details slds-theme_shade slds-m-top_x-small slds-m-horizontal_xx-small"
                        aria-hidden="true"
                    >

                        <ul class="slds-list_horizontal slds-wrap">
                            <li class="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
                                <span class="slds-text-title slds-p-bottom_x-small">Name</span>
                                <span class="slds-text-body_medium slds-truncate" title="Charlie Gomez">
                                    <a href="javascript:void(0);">Charlie Gomez</a>
                                </span>
                            </li>
                            <li class="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
                                <span class="slds-text-title slds-p-bottom_x-small">Related To</span>
                                <span class="slds-text-body_medium slds-truncate" title="Tesla Cloudhub + Anypoint Connectors">
                                    <a href="javascript:void(0);">Tesla Cloudhub + Anypoint Connectors</a>
                                </span>
                            </li>
                        </ul>

                        <div>
                            <span class="slds-text-title">Description</span>
                            <p class="slds-p-top_x-small">Need to finalize proposals and brand details before the
                                meeting</p>
                        </div>

                    </article>

                </template>

            </slds-media-object>

        </div>
    </li>
</template>

<script>
import SldsButtonIcon from '@/components/slds-button-icon/button-icon'
import SldsIcon from '@/components/slds-icon/icon'
import SldsMediaObject from '@/components/slds-media-object/media-object'

export default {
    name: 'SldsActivityTimelineItem',

    components: {
        SldsButtonIcon,
        SldsIcon,
        SldsMediaObject
    },

    props: {
        assistiveText: String,
        date: String,
        expandable: Boolean,
        icon: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        subjectIcons: [String, Array],
        type: String,
    },

    computed: {
        formattedSubjectIcons() {
            const icons = []

            if (this.subjectIcons == null) return icons
            if (Array.isArray(this.subjectIcons)) return this.subjectIcons
            if (typeof this.subjectIcons === 'string') icons.push(this.subjectIcons)

            return icons
        },

        iconClass() {
            switch (this.type) {
                case 'call':
                    return 'slds-icon-standard-log-a-call'

                case 'email':
                    return 'slds-icon-standard-email'

                case 'event':
                    return 'slds-icon-standard-event'

                case 'task':
                    return 'slds-icon-standard-task'

                default:
                    return 'slds-icon-standard-generic-loading'
            }
        },

        itemClass() {
            return `slds-timeline__item_${this.type}`
        },
    }
}
</script>

<style scoped lang="scss">
.switch-placeholder {
    padding: .5rem;
    position: relative;
    display: inline-flex;
}
</style>
