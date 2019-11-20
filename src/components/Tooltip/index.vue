<template>
    <div class="slds-tooltip__container" :style="containerStyle">

        <slot name="trigger"/>

        <transition name="fade">
            <div
                v-if="tooltipVisible"
                ref="tooltip"
                class="slds-popover slds-popover_tooltip"
                :class="nubbinPlacements"
                :style="tooltipStyle"
                role="tooltip">
                <div class="slds-popover__body">
                    <slot/>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    export default {
        props: {
            bottom: {
                type: Boolean,
            },
            bottomLeft: {
                type: Boolean,
            },
            bottomRight: {
                type: Boolean,
            },
            left: {
                type: Boolean,
            },
            leftBottom: {
                type: Boolean,
            },
            leftTop: {
                type: Boolean,
            },
            right: {
                type: Boolean,
            },
            rightBottom: {
                type: Boolean,
            },
            rightTop: {
                type: Boolean,
            },
            top: {
                type: Boolean,
            },
            topLeft: {
                type: Boolean,
            },
            topRight: {
                type: Boolean,
            },
        },
        data() {
            return {
                containerStyle: {
                    position: 'relative',
                },
                tooltipStyle: {
                    position: 'absolute',
                    top: '-104px',
                    left: '-17px',
                },
                tooltipVisible: false,
                tooltipTrigger: null,
            }
        },
        computed: {
            clickable() {
                return this.triggerElement.classList.contains('slds-tooltip-trigger_click');
            },
            nubbinPlacements() {
                if (this.left) return 'slds-nubbin_left';
                else if (this.leftTop) return 'slds-nubbin_left-top';
                else if (this.leftBottom) return 'slds-nubbin_left-bottom';
                else if (this.top) return 'slds-nubbin_top';
                else if (this.topLeft) return 'slds-nubbin_top-left';
                else if (this.topRight) return 'slds-nubbin_top-right';
                else if (this.right) return 'slds-nubbin_right';
                else if (this.rightTop) return 'slds-nubbin_right-top';
                else if (this.rightBottom) return 'slds-nubbin_right-bottom';
                else if (this.bottom) return 'slds-nubbin_bottom';
                else if (this.bottomLeft) return 'slds-nubbin_bottom-left';
                else if (this.bottomRight) return 'slds-nubbin_bottom-right';
                else return null;
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
            hideTooltip() {
                this.tooltipVisible = false;
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
            showTooltip() {
                this.tooltipVisible = true;
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
</style>
