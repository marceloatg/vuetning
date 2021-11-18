<template>
    <div role="alert" class="slds-notify slds-notify_alert" :class="alertClass">

        <!-- Assistive text -->
        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

        <!-- Icon -->
        <slds-icon
            v-if="icon"
            :icon="icon"
            x-small
            current-color
            class="slds-m-right_x-small"
        />

        <!-- Content -->
        <h2 v-if="message">
            {{ message }}
        </h2>
        <slot v-else/>

        <!-- Close button -->
        <div v-if="closeable" class="slds-notify__close">
            <slds-button-icon
                icon="utility:close"
                small
                inverse
                title="Close"
                assistive-text="Close"
                @click="onClickClose"
            />
        </div>

    </div>
</template>

<script>
import SldsButtonIcon from '@/components/slds-button-icon/slds-button-icon'
import SldsIcon from '@/components/slds-icon/slds-icon'

export default {
    name: 'SldsAlert',

    components: {
        SldsButtonIcon,
        SldsIcon
    },

    props: {
        assistiveText: String,
        closeable: {
            type: Boolean,
            default: true
        },
        error: Boolean,
        icon: String,
        info: Boolean,
        message: String,
        offline: Boolean,
        texture: {
            type: Boolean,
            default: true
        },
        warning: Boolean
    },

    computed: {
        alertClass() {
            let classNames = ''

            // Alert texture
            if (this.texture) classNames += ' slds-theme_alert-texture'

            // Alert theme
            if (this.info) classNames += ' slds-theme_info'
            if (this.warning) classNames += ' slds-theme_warning'
            if (this.error) classNames += ' slds-theme_error'
            if (this.offline) classNames += ' slds-theme_offline'
            else classNames += ' slds-theme_info'

            return classNames
        }
    },

    methods: {
        onClickClose() {
            this.$emit('close')
        }
    }
}
</script>
