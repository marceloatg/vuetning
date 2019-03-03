<template>
    <section class="slds-docked-composer slds-grid slds-grid_vertical" :class="`slds-is-${state}`">

        <!-- Header -->
        <header class="slds-docked-composer__header slds-grid slds-shrink-none">

            <!-- Heading -->
            <div class="slds-media slds-media_center slds-no-space">

                <!-- Figure -->
                <slds-icon
                    :icon-name="iconName"
                    class="slds-media__figure slds-m-right_x-small"
                    icon-class="slds-icon-text-default"
                    size="x-small"/>

                <!-- Text -->
                <div class="slds-media__body">
                    <h2 class="slds-truncate" title="Header">
                        {{ heading }}
                    </h2>
                </div>

            </div>

            <!-- Actions -->
            <div class="slds-col_bump-left slds-shrink-none">

                <slds-button-icon
                    ref="erectButton"
                    v-if="hasMinimizeButton && state === 'close'"
                    icon-name="utility:erect_window"
                    container="none"
                    title="Erect window"
                    @click="onErect"/>

                <slds-button-icon
                    ref="minimizeButton"
                    v-if="hasMinimizeButton && state === 'open'"
                    icon-name="utility:minimize_window"
                    container="none"
                    title="Minimize window"
                    @click="onMinimize"/>

                <slds-button-icon
                    ref="expandButton"
                    v-if="hasExpandButton"
                    icon-name="utility:expand_alt"
                    container="none"
                    title="Expand Composer"
                    @click="onExpand"/>

                <slds-button-icon
                    ref="closeButton"
                    icon-name="utility:close"
                    container="none"
                    title="Close"
                    @click="onClose"/>

            </div>

        </header>

        <!-- Body -->
        <div class="slds-docked-composer__body">
            <slot name="body"/>
        </div>

        <!-- Footer -->
        <footer v-if="$slots.footer" class="slds-docked-composer__footer slds-shrink-none">
            <slot name="footer"/>
        </footer>

    </section>
</template>

<script>
    import SldsButtonIcon from '../ButtonIcon/Index'
    import SldsIcon from '../Icon/Index'

    export default {
        components: {
            SldsButtonIcon,
            SldsIcon,
        },
        props: {
            hasExpandButton: {
                type: Boolean,
                default: true,
            },
            hasMinimizeButton: {
                type: Boolean,
                default: true,
            },
            heading: {
                type: String,
                required: true,
            },
            iconName: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                state: 'open',
            }
        },
        methods: {
            onClose() {
                this.$emit('close');
            },
            onErect() {
                this.state = 'open';
                this.$emit('erect');
            },
            onExpand() {
                this.$emit('expand');
            },
            onMinimize() {
                this.state = 'close';
                this.$emit('minimize');
            },
        },
    }
</script>

<style scoped lang="scss">
    header {
        height: 42px;
    }
</style>
