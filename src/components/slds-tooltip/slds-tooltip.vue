<template>
    <div class="trigger-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">

        <!-- Trigger -->
        <div ref="trigger" class="trigger-wrapper">
            <slot name="trigger"/>
        </div>

        <!-- Content -->
        <transition
            @before-enter="hideTooltip"
            @enter="positionTooltip"
            @after-enter="showTooltip"
            @leave="hideTooltip"
        >
            <div v-if="isVisible" ref="popoverWrapper" class="popover-wrapper">
                <div ref="popover" role="tooltip" :class="popoverClassNames">
                    <div class="slds-popover__body">
                        <slot/>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "SldsTooltip",

    props: {
        /**
         * Indicates whether the tooltip is disabled.
         */
        disabled: Boolean,

        /**
         * Indicates whether the tooltip is on bottom position.
         */
        bottom: Boolean,

        /**
         * Indicates whether the tooltip is on bottom left position.
         */
        bottomLeft: Boolean,

        /**
         * Indicates whether the tooltip is on bottom right position.
         */
        bottomRight: Boolean,

        /**
         * Indicates whether the tooltip is on left position.
         */
        left: Boolean,

        /**
         * Indicates whether the tooltip is on left bottom position.
         */
        leftBottom: Boolean,

        /**
         * Indicates whether the tooltip is on left top position.
         */
        leftTop: Boolean,

        /**
         * Indicates whether the tooltip is on right position.
         */
        right: Boolean,

        /**
         * Indicates whether the tooltip is on right bottom position.
         */
        rightBottom: Boolean,

        /**
         * Indicates whether the tooltip is on right top position.
         */
        rightTop: Boolean,

        /**
         * Indicates whether the tooltip is on top position.
         */
        top: Boolean,

        /**
         * Indicates whether the tooltip is on top left position.
         */
        topLeft: Boolean,

        /**
         * Indicates whether the tooltip is on top right position.
         */
        topRight: Boolean,

        /**
         * Indicates whether the tooltip is visible.
         */
        visible: Boolean,
    },

    data() {
        return {
            /**
             * Initial scroll value.
             */
            initialScroll: 0,

            /**
             * Indicates whether the tooltip is currently visible.
             */
            isVisible: false,

            /**
             * Mouse enter timeout.
             */
            mouseEnterTimeout: 0,

            /**
             * Mouse leave timeout.
             */
            mouseLeaveTimeout: 0,

            /**
             * Original popover top value.
             */
            originalPopoverTop: 0,
        }
    },

    computed: {
        /**
         * The CSS class names for the popover.
         */
        popoverClassNames(): string {
            let classNames = "slds-popover slds-popover_tooltip slds-input-has-icon"

            if (this.bottom) classNames += " slds-nubbin_top"
            else if (this.bottomLeft) classNames += " slds-nubbin_top-right"
            else if (this.bottomRight) classNames += " slds-nubbin_top-left"
            else if (this.left) classNames += " slds-nubbin_right"
            else if (this.leftBottom) classNames += " slds-nubbin_right-top"
            else if (this.leftTop) classNames += " slds-nubbin_right-bottom"
            else if (this.right) classNames += " slds-nubbin_left"
            else if (this.rightBottom) classNames += " slds-nubbin_left-top"
            else if (this.rightTop) classNames += " slds-nubbin_left-bottom"
            else if (this.top) classNames += " slds-nubbin_bottom"
            else if (this.topLeft) classNames += " slds-nubbin_bottom-right"
            else if (this.topRight) classNames += " slds-nubbin_bottom-left"
            else classNames += " slds-nubbin_bottom"

            return classNames
        },
    },

    watch: {
        async visible() {
            this.isVisible = this.visible
            await this.$nextTick()
            if (this.isVisible) this.positionTooltip()
        },
    },

    created() {
        this.isVisible = this.visible
        window.addEventListener("scroll", this.handleScroll)
    },

    mounted() {
        if (this.isVisible) this.positionTooltip()
    },

    updated() {
        if (this.isVisible) this.positionTooltip()
    },

    beforeUnmount() {
        window.removeEventListener(EVENTS.SCROLL, this.handleScroll)
    },

    methods: {
        /**
         * Handler for mouseenter event.
         */
        handleMouseEnter(): void {
            if (this.disabled) return
            if (this.mouseEnterTimeout) clearTimeout(this.mouseEnterTimeout)
            if (this.mouseLeaveTimeout) clearTimeout(this.mouseLeaveTimeout)

            this.mouseEnterTimeout = setTimeout(() => this.isVisible = true, 100)
        },

        /**
         * Handler for mouseleave event.
         */
        handleMouseLeave(): void {
            if (this.disabled) return
            if (this.mouseEnterTimeout) clearTimeout(this.mouseEnterTimeout)
            if (this.mouseLeaveTimeout) clearTimeout(this.mouseLeaveTimeout)

            this.mouseLeaveTimeout = setTimeout(() => this.isVisible = false, 100)
        },

        /**
         * Handle for scroll event.
         * @param event The scroll event.
         */
        handleScroll(event: Event) {
            if (!this.isVisible) return

            const target = event.target as Document
            const popoverWrapper = this.$refs.popoverWrapper as HTMLElement

            const popoverTop = this.initialScroll + this.originalPopoverTop - target.scrollingElement!.scrollTop
            popoverWrapper.style.setProperty("--top", `${popoverTop}px`)
        },

        /**
         * Positions the tooltip relative to its trigger.
         */
        positionTooltip() {
            const trigger = (this.$refs.trigger as HTMLElement).getBoundingClientRect()
            const popover = (this.$refs.popover as HTMLElement).getBoundingClientRect()
            const nubbin = { width: 24, height: 24, paddingX: 12, paddingY: 8 }

            const modalContainerLeftOffset = this.getModalContainerLeftOffset()
            const popoverTop = this.getPopoverTop(trigger, popover, nubbin)
            const popoverLeft = this.getPopoverLeft(trigger, popover, nubbin) - parseInt(modalContainerLeftOffset)

            this.initialScroll = window.scrollY
            this.originalPopoverTop = popoverTop

            const popoverWrapper = this.$refs.popoverWrapper as HTMLElement
            popoverWrapper.style.setProperty("--top", `${popoverTop}px`)
            popoverWrapper.style.setProperty("--left", `${popoverLeft}px`)
        },

        /**
         * Gets the left offset of the modal container.
         * @return The left offset value in px.
         */
        getModalContainerLeftOffset(): string {
            let modalContainerLeftOffset = "0"
            let currentElement = this.$refs.popover as HTMLElement

            while (currentElement.parentElement) {
                currentElement = currentElement.parentElement
                const currentElementClassList = currentElement.classList
                const currentElementStyle = window.getComputedStyle(currentElement)

                if (currentElementClassList.contains("slds-modal__container")) {
                    modalContainerLeftOffset = currentElementStyle.marginLeft
                    break
                }
            }

            return modalContainerLeftOffset
        },

        /**
         * Get the calculated popover left.
         * @param trigger The trigger DOMRect.
         * @param popover The popover DOMRect.
         * @param nubbin The nubbin object.
         * @return The calculated left.
         */
        getPopoverLeft(trigger: DOMRect, popover: DOMRect, nubbin: any): number {
            let popoverLeft = 0

            if (this.bottomLeft || this.topLeft) {
                popoverLeft = trigger.x + (trigger.width / 2) + nubbin.width - popover.width
            }
            else if (this.bottomRight || this.topRight) {
                popoverLeft = trigger.x + ((trigger.width - nubbin.width) / 2) - nubbin.paddingX
            }
            else if (this.left || this.leftBottom || this.leftTop) {
                popoverLeft = trigger.x - popover.width - (nubbin.width / 2)
            }
            else if (this.right || this.rightBottom || this.rightTop) {
                popoverLeft = trigger.x + trigger.width + (nubbin.width / 2)
            }
            else {
                popoverLeft = trigger.x - ((popover.width - trigger.width) / 2)
            }

            return popoverLeft
        },

        /**
         * Get the calculated popover top.
         * @param trigger The trigger DOMRect.
         * @param popover The popover DOMRect.
         * @param nubbin The nubbin object.
         * @return The calculated top.
         */
        getPopoverTop(trigger: DOMRect, popover: DOMRect, nubbin: any): number {
            let popoverTop = 0

            if (this.leftTop || this.rightTop) {
                popoverTop = trigger.y + (trigger.height / 2) - popover.height + nubbin.height
            }
            else if (this.left || this.right) {
                popoverTop = trigger.y - ((popover.height - trigger.height) / 2)
            }
            else if (this.bottom || this.bottomLeft || this.bottomRight) {
                popoverTop = trigger.y + trigger.height + (nubbin.height / 2)
            }
            else if (this.leftBottom || this.rightBottom) {
                popoverTop = trigger.y - ((trigger.height) / 2) + nubbin.paddingY
            }
            else {
                popoverTop = trigger.y - popover.height - (nubbin.height / 2)
            }

            return popoverTop
        },

        /**
         * Hides the tooltip.
         * @param element Tooltip wrapper element.
         */
        hideTooltip(element: HTMLElement): void {
            element.style.opacity = "0"
            element.style.transition = "transform 300ms, opacity 150ms"

            if (this.bottom || this.bottomLeft || this.bottomRight) element.style.transform = "translateY(-.5rem)"
            else if (this.top || this.topLeft || this.topRight) element.style.transform = "translateY(.5rem)"
            else if (this.left || this.leftBottom || this.leftTop) element.style.transform = "translateX(-.5rem)"
            else if (this.right || this.rightBottom || this.rightTop) element.style.transform = "translateX(.5rem)"
            else element.style.transform = "translateY(.5rem)"
        },

        /**
         * Shows the tooltip.
         * @param element Tooltip wrapper element.
         */
        showTooltip(element: HTMLElement): void {
            element.style.opacity = "1"
            element.style.transform = "translate(0, 0)"
            element.style.transition = "transform 300ms, opacity 150ms"
        },
    },
})
</script>

<style scoped lang="scss">

.trigger-wrapper {
    display: inline;
}

.popover-wrapper {
    --top: 0;
    --left: 0;

    position: fixed;
    top: var(--top);
    left: var(--left);
    will-change: transform;
    z-index: 100;
}

</style>
