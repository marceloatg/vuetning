<template>
    <div>

        <slds-grid align-spread class="slds-p-bottom_x-small">

            <span>
                {{ label }}
            </span>

            <span aria-hidden="true">
                <strong>
                    {{ progress }}% {{ progressLabel }}
                </strong>
            </span>

        </slds-grid>

        <div
            aria-valuemin="0"
            :aria-valuemax="total"
            :aria-valuenow="current"
            :class="progressBarClasses"
            role="progressbar"
        >
            <span :class="progressBarValueClasses" :style="progressBarStyle">
                <span class="slds-assistive-text">
                    Progress: {{ progress }}%
                </span>
            </span>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SldsGrid from "../slds-grid/slds-grid.vue"

export default defineComponent({
    name: "slds-progress-bar",

    components: { SldsGrid },

    props: {
        /**
         * Current number.
         */
        current: {
            type: Number,
            required: true,
        },

        /**
         * Label.
         */
        label: String,

        /**
         * Indicates when the progress bar thickness should be large.
         */
        large: Boolean,

        /**
         * Indicates when the progress bar thickness should be medium.
         */
        medium: Boolean,

        /**
         * Progress label.
         */
        progressLabel: String,

        /**
         * Indicates when the progress bar has rounded edges.
         */
        radius: Boolean,

        /**
         * Indicates when the progress bar thickness should be small.
         */
        small: Boolean,

        /**
         * Total number.
         */
        total: {
            type: Number,
            required: true,
        },

        /**
         * Indicates when the progress bar thickness should be x-small.
         */
        xSmall: Boolean,
    },

    computed: {
        /**
         * Indicates the progress percentage.
         */
        progress(): number {
            const percent = (this.current / this.total) * 100
            return Math.min(Math.max(Math.round(percent), 0), 100)
        },

        /**
         * Progress bar style.
         */
        progressBarStyle(): string {
            return `width: ${this.progress}%`
        },

        /**
         * Progress bar classes.
         */
        progressBarClasses(): string {
            let classNames = "slds-progress-bar"

            if (this.radius) classNames += " slds-progress-bar_circular"
            if (this.large) classNames += " slds-progress-bar_large"
            else if (this.medium) classNames += " slds-progress-bar_medium"
            else if (this.small) classNames += " slds-progress-bar_small"
            else if (this.xSmall) classNames += " slds-progress-bar_x-small"

            return classNames
        },

        /**
         * Progress bar value classes.
         */
        progressBarValueClasses(): string {
            let classNames = "slds-progress-bar__value"

            if (this.current === this.total || this.current > this.total) classNames += " slds-progress-bar__value_success"

            return classNames
        },
    },
})
</script>
