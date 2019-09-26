<template>
    <div>

        <!-- Label -->
        <div v-if="label != null" class="slds-grid slds-grid_align-spread slds-p-bottom_x-small">

            <span>
                {{ label }}
            </span>

            <span>
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
        props: {
            circular: {
                type: Boolean,
                default: false,
            },
            error: {
                type: Boolean,
                default: false,
            },
            label: {
                type: String,
            },
            progress: {
                type: Number,
                default: 0,
            },
            large: {
                type: Boolean,
                default: false,
            },
            medium: {
                type: Boolean,
                default: true,
            },
            success: {
                type: Boolean,
                default: false,
            },
            small: {
                type: Boolean,
                default: false,
            },
            xSmall: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            color() {
                if (this.error) return 'slds-progress-bar__value_error';
                if (this.success) return 'slds-progress-bar__value_success';
                return null
            },
            thickness() {
                if (this.xSmall) return 'slds-progress-bar_x-small';
                if (this.small) return 'slds-progress-bar_small';
                if (this.medium) return 'slds-progress-bar_medium';
                if (this.large) return 'slds-progress-bar_large';
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
