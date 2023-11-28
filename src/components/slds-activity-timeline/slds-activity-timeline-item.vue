<template>
    <div :class="itemClassNames">

        <!-- Assistive Text -->
        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

        <!-- Item -->
        <slds-media-object>

            <!-- Switch and Activity Icon -->
            <template #figure>

                <!-- Switch -->
                <slds-grid align-middle>

                    <slds-button-icon
                        v-if="expandable"
                        aria-controls="task-item-base"
                        :assistive-text="`Toggle details for ${subject}`"
                        bare
                        icon-name="utility:switch"
                        icon-class="slds-timeline__details-action-icon"
                        :title="`Toggle details for ${subject}`"
                        @click="toggle"
                    />

                    <!-- Switch Placeholder -->
                    <div v-else class="switch-placeholder slds-button_icon"/>

                    <!-- Item Icon -->
                    <slds-icon
                        class="slds-timeline__icon"
                        :class="iconClassNames"
                        :icon-name="iconName"
                        small
                        :title="type"
                    />

                </slds-grid>

            </template>

            <!-- Subject and Expandable box -->
            <template #default>

                <!-- Subject -->
                <slds-grid :class="subjectClassNames" align-spread>

                    <!-- Left Content -->
                    <slds-column-grid align-bottom class="slds-truncate_container_75">

                        <slds-checkbox
                            v-if="isTask"
                            v-model="checkbox"
                            class="slds-p-right_xx-small slds-p-bottom_xxx-small"
                            label=""
                        />

                        <!-- Tile title (subject) -->
                        <h3 class="slds-truncate" :title="subject">

                            <a v-if="expandable">
                                <strong>{{ subject }}</strong>
                            </a>

                            <span v-else>
                                <strong>{{ subject }}</strong>
                            </span>

                        </h3>

                        <!-- Subject icon, stackable -->
                        <div class="slds-no-flex">
                            <slot name="subject-action-icons">
                                <slds-icon
                                    v-for="(subjectIconName, index) in normalizedSubjectIconNames"
                                    :key="index"
                                    :icon-name="subjectIconName"
                                    xx-small
                                    class="slds-m-left_x-small"
                                />
                            </slot>
                        </div>

                    </slds-column-grid>

                    <!-- Right Content -->
                    <slds-column class="slds-timeline__actions slds-timeline__actions_inline">

                        <!-- Date -->
                        <p class="slds-timeline__date">
                            {{ date }}
                        </p>

                        <!-- Actions -->
                        <slot name="actions"/>

                    </slds-column>

                </slds-grid>

                <!-- Activity -->
                <p class="slds-m-horizontal_xx-small">
                    <slot name="activity"/>
                </p>

                <!-- Expandable Section -->
                <article
                    v-if="expandable && isOpen"
                    class="slds-box slds-timeline__item_details slds-theme_shade slds-m-top_x-small slds-m-horizontal_xx-small"
                    aria-hidden="true"
                >
                    <slot/>
                </article>

            </template>

        </slds-media-object>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SldsMediaObject from "../slds-media-object/slds-media-object.vue"
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import SldsIcon from "../slds-icon/slds-icon.vue"
import SldsGrid from "../slds-grid/slds-grid.vue"
import SldsColumnGrid from "../slds-grid/slds-column-grid.vue"
import SldsColumn from "../slds-grid/slds-column.vue"
import SldsCheckbox from "../slds-checkbox/slds-checkbox.vue"

export default defineComponent({
    name: "slds-activity-timeline-item",

    components: {
        SldsButtonIcon,
        SldsCheckbox,
        SldsColumn,
        SldsColumnGrid,
        SldsGrid,
        SldsIcon,
        SldsMediaObject,
    },

    props: {
        assistiveText: String,

        /**
         * Activity icon name.
         */
        iconName: { type: String, required: true },

        /**
         * Activity type.
         */
        type: { type: String, required: true },

        call: Boolean,

        date: String,

        default: Boolean,

        email: Boolean,

        event: Boolean,

        expandable: Boolean,

        task: Boolean,

        subject: String,

        /**
         * Subject icon names.
         */
        subjectIconsNames: [String, Array],
    },

    data() {
        return {
            isOpen: false,

            checkbox: false,
        }
    },

    computed: {
        /**
         * The CSS class names for the item.
         */
        itemClassNames(): string {
            let classNames = "slds-timeline__item_expandable"

            // setting item type
            classNames += ` slds-timeline__item_${this.type}`

            if (this.isOpen) classNames += " slds-is-open"

            return classNames
        },

        /**
         * The CSS class names for the icon.
         */
        iconClassNames() {
            let classNames = "slds-timeline__icon"

            if (this.call) classNames += " slds-icon-standard-log-a-call"
            else if (this.default) classNames += " slds-icon-standard-generic-loading"
            else if (this.email) classNames += " slds-icon-standard-email"
            else if (this.event) classNames += " slds-icon-standard-event"
            else if (this.task) classNames += " slds-icon-standard-task"

            return classNames
        },

        isTask() {
            return this.type === "task"
        },

        normalizedSubjectIconNames(): string[] {
            let iconNames = [] as string[]

            // Check subjectIcon is empty then returns empty array
            if (!this.subjectIconsNames) return iconNames

            // Check and returns string array
            if (this.isStringArray(this.subjectIconsNames)) return this.subjectIconsNames as string[]

            // If it's just one string, add it to array
            if (typeof this.subjectIconsNames === "string") iconNames.push(this.subjectIconsNames)

            return iconNames
        },

        subjectClassNames() {
            let classNames = "slds-timeline__trigger"

            if (!this.expandable) classNames += " non-hoverable"

            return classNames
        },
    },

    methods: {
        /**
         * Check if a variable and its elements is of type Array.
         * @param variable Variable to be checked.
         */
        isStringArray(variable: any): boolean {
            if (!Array.isArray(variable)) return false

            return variable.every((item) => typeof item === "string")
        },

        toggle() {
            this.isOpen = !this.isOpen
        },
    },
})
</script>

<style scoped lang="scss">

.non-hoverable {
    pointer-events: none;
}

.switch-placeholder {
    padding: .5rem;
    position: relative;
    display: inline-flex;
}

</style>
