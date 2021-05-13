<template>
    <ul class="slds-timeline">

        <slds-activity-timeline-item
            icon="standard:task"
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
        </slds-activity-timeline-item>

        <li>
            <div class="slds-timeline__item_expandable slds-timeline__item_call">
                <span class="slds-assistive-text">log_a_call</span>
                <div class="slds-media">
                    <div class="slds-media__figure">
                        <button class="slds-button slds-button_icon" title="Toggle details for Mobile conversation on Monday" aria-controls="call-item-base">
                            <svg class="slds-button__icon slds-timeline__details-action-icon" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#switch"/>
                            </svg>
                            <span class="slds-assistive-text">Toggle details for Mobile conversation on Monday</span>
                        </button>
                        <div class="slds-icon_container slds-icon-standard-log-a-call slds-timeline__icon" title="call">
                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#log_a_call"/>
                            </svg>
                        </div>
                    </div>
                    <div class="slds-media__body">
                        <div class="slds-grid slds-grid_align-spread slds-timeline__trigger">
                            <div class="slds-grid slds-grid_vertical-align-center slds-truncate_container_75 slds-no-space">
                                <h3 class="slds-truncate" title="Mobile conversation on Monday">
                                    <a href="javascript:void(0);">
                                        <strong>Mobile conversation on Monday</strong>
                                    </a>
                                </h3>
                            </div>
                            <div class="slds-timeline__actions slds-timeline__actions_inline">
                                <p class="slds-timeline__date">
                                    10:00am | 3/23/17
                                </p>
                                <button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" title="More Options for this item">
                                    <svg class="slds-button__icon" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                                    </svg>
                                    <span class="slds-assistive-text">More Options for this item</span>
                                </button>
                            </div>
                        </div>
                        <p class="slds-m-horizontal_xx-small">
                            <a href="javascript:void(0);">
                                You
                            </a> logged a call with
                            <a href="javascript:void(0);">
                                Adam Chan
                            </a>
                        </p>
                        <article id="call-item-base" class="slds-box slds-timeline__item_details slds-theme_shade slds-m-top_x-small slds-m-horizontal_xx-small" aria-hidden="true">
                            <ul class="slds-list_horizontal slds-wrap">
                                <li class="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
                                    <span class="slds-text-title slds-p-bottom_x-small">Name</span>
                                    <span class="slds-text-body_medium slds-truncate" title="Adam Chan">
                                        <a href="javascript:void(0);">Adam Chan</a>
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
                                <p class="slds-p-top_x-small">Adam seemed interested in closing this deal quickly! Let’s
                                    move.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </li>

        <li>
            <div class="slds-timeline__item_expandable slds-timeline__item_email">
                <span class="slds-assistive-text">email</span>
                <div class="slds-media">
                    <div class="slds-media__figure">
                        <button class="slds-button slds-button_icon" title="Toggle details for Re: Mobile conversation on Monday with the new global team" aria-controls="email-item-base">
                            <svg class="slds-button__icon slds-timeline__details-action-icon" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#switch"/>
                            </svg>
                            <span class="slds-assistive-text">Toggle details for Re: Mobile conversation on Monday with
                                the new global team</span>
                        </button>
                        <div class="slds-icon_container slds-icon-standard-email slds-timeline__icon" title="email">
                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#email"/>
                            </svg>
                        </div>
                    </div>
                    <div class="slds-media__body">
                        <div class="slds-grid slds-grid_align-spread slds-timeline__trigger">
                            <div class="slds-grid slds-grid_vertical-align-center slds-truncate_container_75 slds-no-space">
                                <h3 class="slds-truncate" title="Re: Mobile conversation on Monday with the new global team">
                                    <a href="javascript:void(0);">
                                        <strong>Re: Mobile conversation on Monday with the new global team</strong>
                                    </a>
                                </h3>
                                <div class="slds-no-flex">
                                    <span class="slds-icon_container slds-icon-utility-groups" title="Group email">
                                        <svg class="slds-icon slds-icon_xx-small slds-icon-text-default slds-m-left_x-small" aria-hidden="true">
                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#groups"/>
                                        </svg>
                                        <span class="slds-assistive-text">Group email</span>
                                    </span>
                                    <span class="slds-icon_container slds-icon-utility-attach" title="Has attachments">
                                        <svg class="slds-icon slds-icon_xx-small slds-icon-text-default slds-m-left_x-small" aria-hidden="true">
                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#attach"/>
                                        </svg>
                                        <span class="slds-assistive-text">Has attachments</span>
                                    </span>
                                </div>
                            </div>
                            <div class="slds-timeline__actions slds-timeline__actions_inline">
                                <p class="slds-timeline__date">
                                    10:00am | 3/24/17
                                </p>
                                <button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" title="More Options for this item">
                                    <svg class="slds-button__icon" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                                    </svg>
                                    <span class="slds-assistive-text">More Options for this item</span>
                                </button>
                            </div>
                        </div>
                        <p class="slds-m-horizontal_xx-small">
                            <a href="javascript:void(0);">
                                You
                            </a> emailed
                            <a href="javascript:void(0);">
                                Lea Chan
                            </a>
                        </p>
                        <article id="email-item-base" class="slds-box slds-timeline__item_details slds-theme_shade slds-m-top_x-small slds-m-horizontal_xx-small" aria-hidden="true">
                            <ul class="slds-list_horizontal slds-wrap">
                                <li class="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
                                    <span class="slds-text-title slds-p-bottom_x-small">From Address</span>
                                    <span class="slds-text-body_medium slds-truncate" title="Jackie Dewar">
                                        <a href="javascript:void(0);">Jackie Dewar</a>
                                    </span>
                                </li>
                                <li class="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
                                    <span class="slds-text-title slds-p-bottom_x-small">To Address</span>
                                    <span class="slds-text-body_medium slds-truncate" title="Lea Chan">
                                        <a href="javascript:void(0);">Lea Chan</a>
                                    </span>
                                </li>
                            </ul>
                            <div>
                                <span class="slds-text-title">Text Body</span>
                                <p class="slds-p-top_x-small">Hi everyone, Thanks for meeting with the team today and
                                    going through the proposals we saw. This goes on and wraps if needed.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </li>

        <slds-activity-timeline-item
            icon="standard:email"
            subject="Re: Mobile conversation on Monday with the new global team"
            subject-icons="utility:rotate"
            assistive-text="email"
        >
            <template #activity>
                <a href="javascript:void(0);">
                    You
                </a> emailed
                <a href="javascript:void(0);">
                    Lea Chan
                </a>
            </template>
        </slds-activity-timeline-item>

        <li>
            <div class="slds-timeline__item_expandable slds-timeline__item_event">
                <span class="slds-assistive-text">event</span>
                <div class="slds-media">
                    <div class="slds-media__figure">
                        <button class="slds-button slds-button_icon" title="Toggle details for EBC Follow up call" aria-controls="event-item-base">
                            <svg class="slds-button__icon slds-timeline__details-action-icon" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#switch"/>
                            </svg>
                            <span class="slds-assistive-text">Toggle details for EBC Follow up call</span>
                        </button>
                        <div class="slds-icon_container slds-icon-standard-event slds-timeline__icon" title="event">
                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#event"/>
                            </svg>
                        </div>
                    </div>
                    <div class="slds-media__body">
                        <div class="slds-grid slds-grid_align-spread slds-timeline__trigger">
                            <div class="slds-grid slds-grid_vertical-align-center slds-truncate_container_75 slds-no-space">
                                <h3 class="slds-truncate" title="EBC Follow up call">
                                    <a href="javascript:void(0);">
                                        <strong>EBC Follow up call</strong>
                                    </a>
                                </h3>
                                <div class="slds-no-flex">
                                    <span class="slds-icon_container slds-icon-utility-world" title="Public sharing">
                                        <svg class="slds-icon slds-icon_xx-small slds-icon-text-default slds-m-left_x-small" aria-hidden="true">
                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#world"/>
                                        </svg>
                                        <span class="slds-assistive-text">Public sharing</span>
                                    </span>
                                </div>
                            </div>
                            <div class="slds-timeline__actions slds-timeline__actions_inline">
                                <p class="slds-timeline__date">
                                    10:30am | 3/24/17
                                </p>
                                <button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" title="More Options for this item">
                                    <svg class="slds-button__icon" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                                    </svg>
                                    <span class="slds-assistive-text">More Options for this item</span>
                                </button>
                            </div>
                        </div>
                        <p class="slds-m-horizontal_xx-small">
                            <a href="javascript:void(0);">
                                You
                            </a> created an event with
                            <a href="javascript:void(0);">
                                Aida Lee
                            </a> and 5 others</p>
                        <article id="event-item-base" class="slds-box slds-timeline__item_details slds-theme_shade slds-m-top_x-small slds-m-horizontal_xx-small" aria-hidden="true">
                            <ul class="slds-list_horizontal slds-wrap">
                                <li class="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
                                    <span class="slds-text-title slds-p-bottom_x-small">Location</span>
                                    <span class="slds-text-body_medium slds-truncate" title="Westen St. Francis, San Francisco, CA, 94622">
                                        <a href="javascript:void(0);">Westen St. Francis, San Francisco, CA, 94622</a>
                                    </span>
                                </li>
                                <li class="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
                                    <span class="slds-text-title slds-p-bottom_x-small">Attendees</span>
                                    <span class="slds-text-body_medium slds-truncate" title="Jason Dewar (Organizer) + 5 others">
                                        <a href="javascript:void(0);">Jason Dewar (Organizer) + 5 others</a>
                                    </span>
                                </li>
                                <li class="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
                                    <span class="slds-text-title slds-p-bottom_x-small">When</span>
                                    <span class="slds-text-body_medium slds-truncate" title="March 26, 10:00 AM - 11:00 AM">
                                        <a href="javascript:void(0);">March 26, 10:00 AM - 11:00 AM</a>
                                    </span>
                                </li>
                            </ul>
                            <div>
                                <span class="slds-text-title">Description</span>
                                <p class="slds-p-top_x-small">Let&#x27;s discuss the 2017 product roadmap and address
                                    any questions</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </li>

    </ul>
</template>

<script>
import SldsActivityTimelineItem from "@/components/slds-activity-timeline/activity-timeline-item";

export default {
    name: "SldsActivityTimeline",

    components: {SldsActivityTimelineItem}
}
</script>
