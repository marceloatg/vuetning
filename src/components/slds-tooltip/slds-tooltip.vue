<template>
    <div class="trigger-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">

        <!-- Trigger -->
        <div ref="trigger" class="trigger-wrapper">
            <slot name="trigger"/>
        </div>

        <!-- Content -->
        <transition :name="popoverTransitionName">
            <div v-if="isVisible" ref="popoverWrapper" class="popover-wrapper">
                <div ref="popover" role="tooltip" class="slds-popover slds-popover_tooltip" :class="popoverClass">
                    <div class="slds-popover__body">
                        <slot/>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
export default {
    name: 'SldsTooltip',

    props: {
        /**
         * @description Indicates whether the tooltip is disabled.
         * @type {boolean}
         */
        disabled: Boolean,

        /**
         * @description Indicates whether the tooltip is on bottom position.
         * @type {boolean}
         */
        bottom: Boolean,

        /**
         * @description Indicates whether the tooltip is on bottom left position.
         * @type {boolean}
         */
        bottomLeft: Boolean,

        /**
         * @description Indicates whether the tooltip is on bottom right position.
         * @type {boolean}
         */
        bottomRight: Boolean,

        /**
         * @description Indicates whether the tooltip is on left position.
         * @type {boolean}
         */
        left: Boolean,

        /**
         * @description Indicates whether the tooltip is on left bottom position.
         * @type {boolean}
         */
        leftBottom: Boolean,

        /**
         * @description Indicates whether the tooltip is on left top position.
         * @type {boolean}
         */
        leftTop: Boolean,

        /**
         * @description Indicates whether the tooltip is on right position.
         * @type {boolean}
         */
        right: Boolean,

        /**
         * @description Indicates whether the tooltip is on right bottom position.
         * @type {boolean}
         */
        rightBottom: Boolean,

        /**
         * @description Indicates whether the tooltip is on right top position.
         * @type {boolean}
         */
        rightTop: Boolean,

        /**
         * @description Indicates whether the tooltip is on top position.
         * @type {boolean}
         */
        top: Boolean,

        /**
         * @description Indicates whether the tooltip is on top left position.
         * @type {boolean}
         */
        topLeft: Boolean,

        /**
         * @description Indicates whether the tooltip is on top right position.
         * @type {boolean}
         */
        topRight: Boolean,

        /**
         * @description Indicates whether the tooltip is visible.
         * @type {boolean}
         */
        visible: Boolean,
    },

    data() {
        return {
            /**
             * @description Indicates whether the tooltip is currently visible.
             * @type {boolean}
             */
            isVisible: false,

            /**
             * @description Mouse enter timeout.
             * @type {NodeJS.Timeout}
             */
            mouseEnterTimeout: 0,

            /**
             * @description Mouse leave timeout.
             * @type {NodeJS.Timeout}
             */
            mouseLeaveTimeout: 0,
        }
    },

    computed: {
        /**
         * @description Popover class names.
         * @type {string[]}
         */
        popoverClass() {
            const classNames = ['slds-input-has-icon']

            if (this.bottom) classNames.push('slds-nubbin_top')
            else if (this.bottomLeft) classNames.push('slds-nubbin_top-right')
            else if (this.bottomRight) classNames.push('slds-nubbin_top-left')
            else if (this.left) classNames.push('slds-nubbin_right')
            else if (this.leftBottom) classNames.push('slds-nubbin_right-top')
            else if (this.leftTop) classNames.push('slds-nubbin_right-bottom')
            else if (this.right) classNames.push('slds-nubbin_left')
            else if (this.rightBottom) classNames.push('slds-nubbin_left-top')
            else if (this.rightTop) classNames.push('slds-nubbin_left-bottom')
            else if (this.top) classNames.push('slds-nubbin_bottom')
            else if (this.topLeft) classNames.push('slds-nubbin_bottom-right')
            else if (this.topRight) classNames.push('slds-nubbin_bottom-left')
            else classNames.push('slds-nubbin_bottom')

            return classNames
        },

        /**
         * @description Popover transition name.
         * @type {string}
         */
        popoverTransitionName() {
            let popoverTransitionName

            if (this.bottom || this.bottomLeft || this.bottomRight) popoverTransitionName = 'popover-bottom'
            else if (this.top || this.topLeft || this.topRight) popoverTransitionName = 'popover-top'
            else if (this.left || this.leftBottom || this.leftTop) popoverTransitionName = 'popover-left'
            else if (this.right || this.rightBottom || this.rightTop) popoverTransitionName = 'popover-right'
            else popoverTransitionName = 'popover-top'

            return popoverTransitionName
        },
    },

    watch: {
        async visible() {
            this.isVisible = this.visible
            await this.$nextTick()
            if (this.isVisible) this.positionTooltip()
        }
    },

    async created() {
        this.isVisible = this.visible
        await this.$nextTick()
        if (this.isVisible) this.positionTooltip()
    },

    mounted() {
        if (this.isVisible) this.positionTooltip()
    },

    updated() {
        if (this.isVisible) this.positionTooltip()
    },

    methods: {
        /**
         * @description Handler for mouseenter event.
         * @return {Promise<void>}
         */
        onMouseEnter() {
            if (this.disabled) return
            if (this.mouseEnterTimeout) clearTimeout(this.mouseEnterTimeout)
            if (this.mouseLeaveTimeout) clearTimeout(this.mouseLeaveTimeout)

            this.mouseEnterTimeout = setTimeout(async () => {
                this.isVisible = true
                await this.$nextTick()
                this.positionTooltip()
            }, 300)
        },

        /**
         * @description Handler for mouseleave event.
         */
        onMouseLeave() {
            if (this.disabled) return
            if (this.mouseEnterTimeout) clearTimeout(this.mouseEnterTimeout)
            if (this.mouseLeaveTimeout) clearTimeout(this.mouseLeaveTimeout)

            this.mouseLeaveTimeout = setTimeout(() => {
                this.isVisible = false
            }, 300)
        },

        /**
         * @description Positions the tooltip relative to its trigger.
         */
        positionTooltip() {
            const trigger = this.$refs.trigger.firstChild.getBoundingClientRect()
            const popover = this.$refs.popover.getBoundingClientRect()
            const nubbin = {width: 24, height: 24, paddingX: 12, paddingY: 8}

            const popoverTop = this.getPopoverTop(trigger, popover, nubbin)
            const popoverLeft = this.getPopoverLeft(trigger, popover, nubbin)

            this.$refs.popoverWrapper.style.setProperty('--top', `${popoverTop}px`)
            this.$refs.popoverWrapper.style.setProperty('--left', `${popoverLeft}px`)
        },

        /**
         * @description Get the calculated popover left.
         * @param {DOMRect} trigger - The trigger DOMRect.
         * @param {DOMRect} popover - The popover DOMRect.
         * @param {object} nubbin - The nubbin object.
         * @return {number} - The calculated left.
         */
        getPopoverLeft(trigger, popover, nubbin) {
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
         * @description Get the calculated popover top.
         * @param {DOMRect} trigger - The trigger DOMRect.
         * @param {DOMRect} popover - The popover DOMRect.
         * @param {object} nubbin - The nubbin object.
         * @return {number} - The calculated top.
         */
        getPopoverTop(trigger, popover, nubbin) {
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
    }
}
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
    z-index: 100;
}

.popover-bottom-enter-active,
.popover-bottom-leave-active {
    transition: transform 300ms, opacity 150ms;
}

.popover-bottom-enter,
.popover-bottom-leave-to {
    opacity: 0;
    transform: translateY(-.5rem);
    will-change: transform;
}

.popover-left-enter-active,
.popover-left-leave-active {
    transition: transform 300ms, opacity 150ms;
}

.popover-left-enter,
.popover-left-leave-to {
    opacity: 0;
    transform: translateX(-.5rem);
    will-change: transform;
}

.popover-right-enter-active,
.popover-right-leave-active {
    transition: transform 300ms, opacity 150ms;
}

.popover-right-enter,
.popover-right-leave-to {
    opacity: 0;
    transform: translateX(.5rem);
    will-change: transform;
}

.popover-top-enter-active,
.popover-top-leave-active {
    transition: transform 300ms, opacity 150ms;
}

.popover-top-enter,
.popover-top-leave-to {
    opacity: 0;
    transform: translateY(.5rem);
    will-change: transform;
}

</style>
