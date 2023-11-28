<template>
    <section class="slds-notification slds-color__border_gray-5">
        <slds-media-object class="slds-notification__body">
            <a class="slds-notification__target slds-media" @click="onClick">

                <!-- Icon -->
                <slds-icon
                    v-if="iconName"
                    :icon-name="iconName"
                    :icon-class="iconClass"
                    class="slds-media__figure"
                    small
                />

                <!-- Body -->
                <div class="slds-media__body">
                    <h2 class="slds-m-bottom_xx-small">
                        {{ subject }}
                    </h2>
                    <p>
                        {{ message }}
                    </p>
                </div>

            </a>

            <!-- Close Button -->
            <slds-button-icon
                icon-name="utility:close"
                bare
                class="slds-notification__close slds-m-around--x-small"
                @click="onClose"
            />

        </slds-media-object>

    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SldsIcon from "../slds-icon/slds-icon.vue"
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import SldsMediaObject from "../slds-media-object/slds-media-object.vue"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "slds-notification",
    components: {
        SldsMediaObject,
        SldsButtonIcon,
        SldsIcon,
    },

    props: {

        /**
         * The Lightning Design System name of the icon.
         * Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         */
        iconName: String,

        /**
         * The class names to be passed to the icon.
         */
        iconClass: [String, Array],

        message: String,

        subject: String,
    },

    methods: {

        onClick() {
            this.$emit(EVENTS.CLICK)
        },

        onClose() {
            this.$emit(EVENTS.CLOSE)
        },
    },


})
</script>

<style scoped lang="scss">

.notification-closing {
    transition: transform 300ms ease-in;
    transform: translateX(100%);
}

</style>
