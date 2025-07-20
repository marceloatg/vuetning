<template>
    <div>

        <slds-grid align-spread class="slds-p-bottom_x-small">

            <span>
                {{ label }}
            </span>

            <span aria-hidden="true">

                <span v-if="error">
                    Error
                </span>

                <strong v-else>
                    {{ proportion }}
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
         * Indicates when the progress bar should be in error mode.
         */
        error: Boolean,

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

        /**
         * Indicates when the progress bar should be in warning mode.
         */
        warning: Boolean,
    },

    computed: {
        /**
         * Proportion of current to total, normalized to a 100-base scale.
         */
        proportion(): string {
            if (!Number.isFinite(this.current) || !Number.isFinite(this.total) || this.total === 0) return

            const value = (this.current / this.total) * 100
            return `${Math.round(value)}/100`
        },

        /**
         * The progress percentage.
         */
        progress(): number {
            if (!Number.isFinite(this.current) || !Number.isFinite(this.total) || this.total === 0) return 0

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
            if (this.error) classNames += " error"
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
            if (this.error) classNames += " slds-progress-bar__value_error"
            else if (this.warning)  classNames += " slds-progress-bar__value_warning"

            return classNames
        },
    },
})
</script>

<style scoped lang="scss">

.slds-progress-bar__value_error {
    background: #EA001E;
    width: 100% !important;
}

.slds-progress-bar__value_warning {
    background: #FE9339;
    width: 100% !important;
}

</style>
