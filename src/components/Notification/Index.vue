<template>
    <section class="slds-notification">
        <div class="slds-notification__body">

            <a class="slds-notification__target slds-media" @click="onClick">

                <!-- Icon -->
                <slds-icon
                    :icon-name="iconName"
                    size="small"
                    class="slds-media__figure"
                    :class="iconClass"/>

                <!-- Body -->
                <div class="slds-media__body">
                    <h2 class="slds-text-heading_small slds-m-bottom_xx-small">
                        {{ subject }}
                    </h2>
                    <p>
                        {{ message }}
                    </p>
                </div>

            </a>

            <!-- Close button -->
            <slds-button-icon
                icon-name="utility:close"
                container="bare"
                class="slds-notification__close"
                @click="onClose"/>

        </div>
    </section>
</template>

<script>
    import SldsIcon from '../Icon/Index'
    import SldsButtonIcon from '../ButtonIcon/Index'

    export default {
        components:{
            SldsIcon,
            SldsButtonIcon,
        },
        props: {
            iconClass: {
                type: String,
            },
            iconName: {
                type: String,
                required: true,
            },
            message:{
                type: String,
            },
            subject:{
              type: String,
            },
        },
        methods: {
            onClick() {
                this.$emit('click');
            },
            onClose() {
                this.$emit('close');
            },
        },
    }
</script>