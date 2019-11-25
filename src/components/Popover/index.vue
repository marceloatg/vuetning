<template>
    <div class="slds-popover__container">

        <slot name="trigger"/>

        <section
            v-if="visible"
            ref="popover"
            class="slds-popover"
            :class="[nubbinPlacement, size, state]"
            :style="style"
            role="dialog">

            <!-- Close button -->
            <slds-button-icon
                icon="utility:close"
                bare
                small
                :inverse="error || walkthrough || feature"
                class="slds-float_right slds-popover__close"
                title="Close"
                @click="hide"/>

            <!-- Header -->
            <header v-if="($slots.header || walkthrough) && !feature" class="slds-popover__header">
                <slot name="header"/>
            </header>

            <!-- Body -->
            <div class="slds-popover__body" :class="{'slds-popover__body_small': maxHeight}">
                <slot/>
            </div>

            <!-- Footer -->
            <footer v-if="$slots.footer" class="slds-popover__footer">
                <slot name="footer"/>
            </footer>

        </section>

    </div>
</template>

<script>
    export default {
        props: {
            bottomNubbin: {
                type: Boolean,
            },
            bottomLeftNubbin: {
                type: Boolean,
            },
            bottomRightNubbin: {
                type: Boolean,
            },
            error: {
                type: Boolean,
            },
            feature: {
                type: Boolean,
            },
            full: {
                type: Boolean,
            },
            large: {
                type: Boolean,
            },
            leftNubbin: {
                type: Boolean,
            },
            leftBottomNubbin: {
                type: Boolean,
            },
            leftTopNubbin: {
                type: Boolean,
            },
            maxHeight: {
                type: Boolean,
            },
            rightNubbin: {
                type: Boolean,
            },
            rightBottomNubbin: {
                type: Boolean,
            },
            rightTopNubbin: {
                type: Boolean,
            },
            small: {
                type: Boolean,
            },
            topNubbin: {
                type: Boolean,
            },
            topLeftNubbin: {
                type: Boolean,
            },
            topRightNubbin: {
                type: Boolean,
            },
            walkthrough: {
                type: Boolean,
            },
            warning: {
                type: Boolean,
            },
        },
        data() {
            return {
                style: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    opacity: '0'
                },
                visible: false,
                trigger: null,
            }
        },
        computed: {
            clickable() {
                return this.triggerElement.classList.contains('slds-popover-trigger_click');
            },
            nubbinPlacement() {
                if (this.leftNubbin) return 'slds-nubbin_left';
                else if (this.leftTopNubbin) return 'slds-nubbin_left-top';
                else if (this.leftBottomNubbin) return 'slds-nubbin_left-bottom';
                else if (this.rightNubbin) return 'slds-nubbin_right';
                else if (this.rightTopNubbin) return 'slds-nubbin_right-top';
                else if (this.rightBottomNubbin) return 'slds-nubbin_right-bottom';
                else if (this.bottomNubbin) return 'slds-nubbin_bottom';
                else if (this.bottomLeftNubbin) return 'slds-nubbin_bottom-left';
                else if (this.bottomRightNubbin) return 'slds-nubbin_bottom-right';
                else if (this.topNubbin) return 'slds-nubbin_top';
                else if (this.topLeftNubbin) return 'slds-nubbin_top-left';
                else if (this.topRightNubbin) return 'slds-nubbin_top-right';
                else return 'slds-nubbin_bottom-left';
            },
            size() {
                if (this.small) return 'slds-popover_small';
                else if (this.large) return 'slds-popover_large';
                else if (this.full) return 'slds-popover_full-width';
                else return 'slds-popover_medium';
            },
            state() {
                if (this.error) return 'slds-popover_error';
                else if (this.warning) return 'slds-popover_warning';
                else if (this.walkthrough) return 'slds-popover_walkthrough';
                else if (this.feature) return 'slds-popover_walkthrough slds-popover_feature';
                else return null;
            },
            triggerElement() {
                return this.$el.querySelector('.slds-popover-trigger_hover, .slds-popover-trigger_click');
            },
        },
        mounted() {
            this.setupTriggerListener();
        },
        beforeDestroy() {
            this.removeEventListeners();
        },
        methods: {
            clickAwayDetector(event) {
                const popoverElement = this.$refs.popover;
                let targetElement = event.target;

                do {
                    if ((targetElement === popoverElement) || (targetElement === this.triggerElement)) return;
                    targetElement = targetElement.parentNode;
                } while (targetElement);

                this.hide();
            },
            async hide() {
                this.visible = false;
                await this.$nextTick();

                this.style.top = this.style.left = this.style.opacity = '0';
                if (this.clickable) document.removeEventListener("click", this.clickAwayDetector);
            },
            removeEventListeners() {
                if (this.triggerElement == null) return;

                if (this.clickable) {
                    this.triggerElement.removeEventListener("click", this.show);
                    document.addEventListener("click", this.clickAwayDetector);
                }
                else {
                    this.triggerElement.removeEventListener("mouseenter", this.show);
                    this.triggerElement.removeEventListener("mouseleave", this.hide);
                }
            },
            setupTriggerListener() {
                if (this.triggerElement == null) return;

                if (this.clickable) {
                    this.triggerElement.addEventListener("click", this.show);
                }
                else {
                    this.triggerElement.addEventListener("mouseenter", this.show);
                    this.triggerElement.addEventListener("mouseleave", this.hide);
                }
            },
            async show() {
                this.visible = true;
                await this.$nextTick();

                let popoverRect = this.$refs.popover.getBoundingClientRect();
                let triggerRect = this.triggerElement.getBoundingClientRect();

                const nubbinHeightOffset = 16;
                const nubbinWidthOffset = 23;

                if (this.nubbinPlacement.startsWith('slds-nubbin_top')) {
                    this.style.top = `${triggerRect.height + nubbinHeightOffset}px`;
                }
                else if (this.nubbinPlacement.startsWith('slds-nubbin_bottom')) {
                    this.style.top = `-${popoverRect.height + nubbinHeightOffset}px`;
                }
                else if (this.nubbinPlacement.startsWith('slds-nubbin_left')) {
                    this.style.left = `${triggerRect.width + nubbinHeightOffset}px`;
                }
                else if (this.nubbinPlacement.startsWith('slds-nubbin_right')) {
                    this.style.left = `${-popoverRect.width - nubbinHeightOffset}px`;
                }

                if (this.nubbinPlacement.endsWith('-top')) {
                    this.style.top = `${(triggerRect.height / 2) - nubbinWidthOffset}px`;
                }
                else if (this.nubbinPlacement.endsWith('-bottom')) {
                    this.style.top = `${(triggerRect.height / 2) - (popoverRect.height / 2) - nubbinWidthOffset}px`;
                }
                else if (this.nubbinPlacement.endsWith('-left')) {
                    this.style.left = `${(triggerRect.width / 2) - nubbinWidthOffset}px`;
                }
                else if (this.nubbinPlacement.endsWith('-right')) {
                    this.style.left = `${(triggerRect.width / 2) + nubbinWidthOffset - (popoverRect.width)}px`;
                }

                if (this.topNubbin || this.bottomNubbin) {
                    this.style.left = `-${(popoverRect.width / 2) - (triggerRect.width / 2) + popoverRect.left - triggerRect.left}px`;
                }
                else if (this.leftNubbin || this.rightNubbin) {
                    this.style.top = `${(triggerRect.height / 2) - (popoverRect.height / 2)}px`;
                }

                this.style.opacity = '1';
                if (this.clickable) document.addEventListener("click", this.clickAwayDetector);
            },
        },
    }
</script>

<style scoped lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity 300ms;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .slds-popover__container {
        position: relative;
        display: inline;
    }

    .slds-popover {
        transition: opacity 300ms ease-in-out;
    }
</style>
