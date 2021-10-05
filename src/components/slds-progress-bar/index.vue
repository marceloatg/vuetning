<template>
    <div>

        <!-- Label -->
        <div v-if="label || showPercentage" class="slds-grid slds-grid_align-spread slds-p-bottom_x-small">

            <span v-if="label">
                {{ label }}
            </span>

            <span v-if="showPercentage">
                <strong>{{ progress }}% Complete</strong>
            </span>

        </div>

        <!-- Bar -->
        <div
            class="slds-progress-bar"
            :class="[{'slds-progress-bar_circular': circular}, thickness]"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-valuenow="progress"
            role="progressbar">
            <span class="slds-progress-bar__value" :class="color" :style="{width:`${progress}%`}"/>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'SldsProgressBar',
        props: {
            circular: {
                type: Boolean,
            },
            error: {
                type: Boolean,
            },
            label: {
                type: String,
            },
            showPercentage: {
                type: Boolean,
            },
            progress: {
                type: Number,
                default: 0,
            },
            large: {
                type: Boolean,
            },
            medium: {
                type: Boolean,
                default: true,
            },
            success: {
                type: Boolean,
            },
            small: {
                type: Boolean,
            },
            xSmall: {
                type: Boolean,
            },
        },
        computed: {
            color() {
                if (this.error) return 'slds-progress-bar__value_error'
                if (this.success) return 'slds-progress-bar__value_success'
                return null
            },
            thickness() {
                if (this.xSmall) return 'slds-progress-bar_x-small'
                if (this.small) return 'slds-progress-bar_small'
                if (this.medium) return 'slds-progress-bar_medium'
                if (this.large) return 'slds-progress-bar_large'
                return null
            },
        },
    }
</script>

<style scoped lang="scss">
    .slds-progress-bar__value {
        transition: all 300ms ease-in-out;
    }

    .slds-progress-bar__value_error {
        background: #c23934;
    }
</style>
