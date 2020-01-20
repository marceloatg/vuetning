<template>
    <div
        role="alert"
        class="slds-notify slds-notify_alert slds-theme_alert-texture"
        :class="['slds-theme_' + theme]">

        <!-- Icon -->
        <span v-if="hasIcon" class="slds-icon_container slds-icon-utility-user slds-m-right_x-small">
            <slds-svg :icon="`${iconCategory}:${iconName}`" class="slds-icon slds-icon_x-small"/>
        </span>

        <h2>
            {{ message }}
        </h2>

        <!-- Close button -->
        <div class="slds-notify__close">
            <slds-button-icon
                icon="utility:close"
                inverse
                bare
                small
                title="Close"
                @click="$emit('close')"/>
        </div>

    </div>
</template>

<script>
    import SldsSvg from '../../shared/svg/index'

    export default {
        name: 'SldsAlert',
        components: {
            SldsSvg,
        },
        props: {
            theme: {
                type: String,
                default: 'info'
            },
            iconCategory: {
                type: String,
                default: null,
                note: 'Alert icon category.'
            },
            iconName: {
                type: String,
                default: null,
                note: 'Alert icon name.'
            },
            message: {
                type: String,
                required: true,
                note: 'Alert message.'
            },
        },
        computed: {
            hasIcon() {
                return (this.iconCategory != null && this.iconName != null)
            }
        }
    }
</script>
