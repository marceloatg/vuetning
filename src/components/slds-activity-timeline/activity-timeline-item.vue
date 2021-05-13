<template>
    <!--
      https://admin.salesforce.com/blog/2017/tailor-activity-timeline-lightning-experience-users
      https://help.salesforce.com/articleView?id=lex_pro_tips_activity_timeline.htm&type=5
      -->
    <li>
        <div class="slds-timeline__item_expandable slds-timeline__item_task">

            <!-- Assistive text -->
            <span v-if="assistiveText" class="slds-assistive-text">
                {{ assistiveText }}
            </span>

            <!-- Media object -->
            <slds-media-object>

                <template #figure>

                    <slds-button-icon
                        icon="utility:switch"
                        icon-class="slds-timeline__details-action-icon"
                        :title="`Toggle details for ${subject}`"
                        :assistive-text="`Toggle details for ${subject}`"
                        aria-controls="task-item-base"
                    />

                    <slds-icon
                        :icon="icon"
                        small
                        class="slds-timeline__icon"
                    />

                </template>

                <template #default>

                    <div class="slds-grid slds-grid_align-spread slds-timeline__trigger">

                        <div class="slds-grid slds-grid_vertical-align-center slds-truncate_container_75 slds-no-space">
                            <div class="slds-checkbox">
                                <input id="checkbox-unique-id-51" type="checkbox" name="options" value="checkbox-unique-id-51">
                                <label class="slds-checkbox__label" for="checkbox-unique-id-51">
                                    <span class="slds-checkbox_faux"/>
                                    <span class="slds-form-element__label slds-assistive-text">Mark Review proposals
                                        for EBC deck with larger team and have marketing review this complete</span>
                                </label>
                            </div>

                            <h3 class="slds-truncate" :title="subject">
                                <a href="javascript:void(0);">
                                    <strong>{{ subject }}</strong>
                                </a>
                            </h3>

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

                        <div class="slds-timeline__actions slds-timeline__actions_inline">
                            <p class="slds-timeline__date">
                                9:00am | 3/20/17
                            </p>
                            <button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" title="More Options for this item">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                                </svg>
                                <span class="slds-assistive-text">More Options for this item</span>
                            </button>
                        </div>

                    </div>

                    <!-- Activity -->
                    <p class="slds-m-horizontal_xx-small">
                        <slot name="activity"/>
                    </p>

                    <article id="task-item-base" class="slds-box slds-timeline__item_details slds-theme_shade slds-m-top_x-small slds-m-horizontal_xx-small" aria-hidden="true">
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
    name: "SldsActivityTimelineItem",

    components: {
        SldsButtonIcon,
        SldsIcon,
        SldsMediaObject
    },

    props: {
        assistiveText: String,
        icon: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        subjectIcons: [String, Array]
    },

    computed: {
        formattedSubjectIcons() {
            const icons = []

            if (this.subjectIcons == null) return icons
            if (Array.isArray(this.subjectIcons)) return this.subjectIcons
            if (typeof this.subjectIcons === "string") icons.push(this.subjectIcons)

            return icons
        }
    }
}
</script>
