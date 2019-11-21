<template>
    <div class="slds-tooltip__container">

        <slot name="trigger"/>

        <div
            v-if="visible"
            ref="tooltip"
            class="slds-popover slds-popover_tooltip"
            :class="nubbinPlacement"
            :style="style"
            role="tooltip">
            <div class="slds-popover__body">
                <slot/>
            </div>
        </div>

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
            leftNubbin: {
                type: Boolean,
            },
            leftBottomNubbin: {
                type: Boolean,
            },
            leftTopNubbin: {
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
            topNubbin: {
                type: Boolean,
            },
            topLeftNubbin: {
                type: Boolean,
            },
            topRightNubbin: {
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
                return this.triggerElement.classList.contains('slds-tooltip-trigger_click');
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
            triggerElement() {
                return this.$el.querySelector('.slds-tooltip-trigger_hover, .slds-tooltip-trigger_click');
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
                const tooltipElement = this.$refs.tooltip;
                let targetElement = event.target;

                do {
                    if ((targetElement === tooltipElement) || (targetElement === this.triggerElement)) return;
                    targetElement = targetElement.parentNode;
                } while (targetElement);

                this.hideTooltip();
            },
            async hideTooltip() {
                this.visible = false;
                await this.$nextTick();

                this.style.top = this.style.left = this.style.opacity = '0';
                if (this.clickable) document.removeEventListener("click", this.clickAwayDetector);
            },
            removeEventListeners() {
                if (this.triggerElement == null) return;

                if (this.clickable) {
                    this.triggerElement.removeEventListener("click", this.showTooltip);
                    document.addEventListener("click", this.clickAwayDetector);
                }
                else {
                    this.triggerElement.removeEventListener("mouseenter", this.showTooltip);
                    this.triggerElement.removeEventListener("mouseleave", this.hideTooltip);
                }
            },
            setupTriggerListener() {
                if (this.triggerElement == null) return;

                if (this.clickable) {
                    this.triggerElement.addEventListener("click", this.showTooltip);
                }
                else {
                    this.triggerElement.addEventListener("mouseenter", this.showTooltip);
                    this.triggerElement.addEventListener("mouseleave", this.hideTooltip);
                }
            },
            async showTooltip() {
                this.visible = true;
                await this.$nextTick();

                let tooltipRect = this.$refs.tooltip.getBoundingClientRect();
                let triggerRect = this.triggerElement.getBoundingClientRect();

                const nubbinHeightOffset = 16;
                const nubbinWidthOffset = 23;

                if (this.nubbinPlacement.startsWith('slds-nubbin_top')) {
                    this.style.top = `${triggerRect.height + nubbinHeightOffset}px`;
                }
                else if (this.nubbinPlacement.startsWith('slds-nubbin_bottom')) {
                    this.style.top = `-${tooltipRect.height + nubbinHeightOffset}px`;
                }
                else if (this.nubbinPlacement.startsWith('slds-nubbin_left')) {
                    this.style.left = `${triggerRect.width + nubbinHeightOffset}px`;
                }
                else if (this.nubbinPlacement.startsWith('slds-nubbin_right')) {
                    this.style.left = `${-tooltipRect.width - nubbinHeightOffset}px`;
                }

                if (this.nubbinPlacement.endsWith('-top')) {
                    this.style.top = `${(triggerRect.height / 2) - nubbinWidthOffset}px`;
                }
                else if (this.nubbinPlacement.endsWith('-bottom')) {
                    this.style.top = `${(triggerRect.height / 2) - (tooltipRect.height / 2) - nubbinWidthOffset}px`;
                }
                else if (this.nubbinPlacement.endsWith('-left')) {
                    this.style.left = `${(triggerRect.width / 2) - nubbinWidthOffset}px`;
                }
                else if (this.nubbinPlacement.endsWith('-right')) {
                    this.style.left = `${(triggerRect.width / 2) + nubbinWidthOffset - (tooltipRect.width)}px`;
                }

                if (this.topNubbin || this.bottomNubbin) {
                    this.style.left = `-${(tooltipRect.width / 2) - (triggerRect.width / 2) + tooltipRect.left - triggerRect.left}px`;
                }
                else if (this.leftNubbin || this.rightNubbin) {
                    this.style.top = `${(triggerRect.height / 2) - (tooltipRect.height / 2)}px`;
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

    .slds-tooltip__container {
        position: relative;
    }

    .slds-popover {
        transition: opacity 300ms ease-in-out;
    }
</style>
