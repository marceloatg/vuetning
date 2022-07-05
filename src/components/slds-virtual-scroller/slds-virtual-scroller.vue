<!--
    Code adapted from Guillaume Chau @Akryum
    Original repo: https://github.com/Akryum/vue-virtual-scroller
-->

<template>
    <div
        v-observe-visibility="handleVisibilityChange"
        class="virtual-scroller"
        :class="{ ready, 'page-mode': pageMode }"
        @scroll.passive="handleScroll"
    >
        <div
            ref="wrapper"
            :style="{ minHeight: totalSize + 'px' }"
            class="virtual-scroller__item-wrapper"
        >
            <div
                v-for="view of mountedViews"
                :key="view.nr.id"
                :style="ready ? { transform: `translateY(${view.position}px)` } : null"
                class="virtual-scroller__item-view"
                @mouseenter="$event.target.classList.add('hover')"
                @mouseleave="$event.target.classList.remove('hover')"
            >
                <slot :item="view.item" :index="view.nr.index" :active="view.nr.used"/>
            </div>
        </div>
    </div>
</template>

<script>
import {ObserveVisibility} from 'vue-observe-visibility'
import ScrollParent from 'scrollparent'
import {supportsPassive} from './utils'

let uid = 0
const ITEMS_LIMIT = 1000

export default {
    name: 'SldsVirtualScroller',

    directives: {
        ObserveVisibility,
    },

    props: {
        items: {
            type: Array,
            required: true,
        },

        keyField: {
            type: String,
            default: 'id',
        },

        itemSize: {
            type: Number,
            required: true,
        },

        sizeField: {
            type: String,
            default: 'size',
        },

        buffer: {
            type: Number,
            default: 200,
        },

        pageMode: Boolean,

        prerender: {
            type: Number,
            default: 0,
        },

        emitUpdate: Boolean,
    },

    data() {
        return {
            hoverKey: null,
            itemCount: null,
            mountedViews: [],
            ready: false,
            scrollLeft: 0,
            totalSize: 0,
        }
    },

    computed: {
        mountedViewsThreshold() {
            if (!this.ready) return null
            return (this.$_endIndex - this.$_startIndex) * 2
        },

        simpleArray() {
            return this.items.length && typeof this.items[0] !== 'object'
        },
    },

    watch: {
        async items(items) {
            this.updateVisibleItems(true)

            await this.$nextTick()

            if (items.length !== this.itemCount) {
                this.itemCount = items.length
                ScrollParent(this.$el).scrollTop = 0

                await this.$nextTick()

                this.updateVisibleItems(true)
            }
        },

        pageMode() {
            this.applyPageMode()
            this.updateVisibleItems(false)
        },
    },

    created() {
        this.$_startIndex = 0
        this.$_endIndex = 0
        this.$_views = new Map()
        this.$_unusedViews = []
        this.$_scrollAnimationRequest = null
        this.$_lastUpdateScrollPosition = 0

        // In SSR mode, we also prerender the same number of item for the first render
        // to avoid mismatch between server and client templates
        if (this.prerender) {
            this.$_prerender = true
            this.updateVisibleItems(false)
        }
    },

    async mounted() {
        this.applyPageMode()
        await this.$nextTick()

        // In SSR mode, render the real number of visible items
        this.$_prerender = false
        this.updateVisibleItems(true)
        this.ready = true
    },

    beforeDestroy() {
        this.removeListeners()
    },

    methods: {
        addListeners() {
            this.listenerTarget = this.getListenerTarget()
            this.listenerTarget.addEventListener('scroll', this.handleScroll, supportsPassive ? {
                passive: true,
            } : false)
            this.listenerTarget.addEventListener('resize', this.handleResize)
        },

        addView(mountedViews, index, item, key) {
            const view = {
                item,
                position: 0,
            }

            const nonReactive = {
                id: uid++,
                index,
                used: true,
                key,
            }

            Object.defineProperty(view, 'nr', {
                configurable: false,
                value: nonReactive,
            })

            mountedViews.push(view)
            return view
        },

        applyPageMode() {
            if (this.pageMode) this.addListeners()
            else this.removeListeners()
        },

        getListenerTarget() {
            let target = ScrollParent(this.$el)
            // Fix global scroll target for Chrome and Safari
            if (window.document && (target === window.document.documentElement || target === window.document.body)) {
                target = window
            }
            return target
        },

        getScroll() {
            const {$el: el} = this

            if (this.pageMode) {
                const bounds = el.getBoundingClientRect()
                const boundsSize = bounds.height
                const originalStart = -(bounds.top)
                const originalSize = window.innerHeight
                let start = originalStart
                let size = originalSize

                if (start < 0) {
                    size += start
                    start = 0
                }

                if (start + size > boundsSize) {
                    size = boundsSize - start
                }

                return {
                    originalStart,
                    start,
                    end: start + size,
                }
            }

            return {
                originalStart: el.scrollTop,
                start: el.scrollTop,
                end: el.scrollTop + el.clientHeight,
            }
        },

        handleResize() {
            this.$emit('resize')
            if (this.ready) this.updateVisibleItems(false)
        },

        handleScroll(event) {
            if (event && event.target.scrollLeft !== this.scrollLeft) {
                this.scrollLeft = event.target.scrollLeft
                return
            }

            cancelAnimationFrame(this.$_scrollAnimationRequest)
            this.$_scrollAnimationRequest = requestAnimationFrame(() => {
                this.$_scrollAnimationRequest = false
                const {continuous} = this.updateVisibleItems(false, true)

                // It seems sometimes chrome doesn't fire scroll event :/
                // When non continuous scrolling is ending, we force a refresh
                if (!continuous) {
                    clearTimeout(this.$_refreshTimout)
                    this.$_refreshTimout = setTimeout(this.handleScroll, 100)
                }
            })
        },

        handleVisibilityChange(isVisible, entry) {
            if (!this.ready) return

            if (isVisible || entry.boundingClientRect.width !== 0 || entry.boundingClientRect.height !== 0) {
                this.$emit('visible')
                requestAnimationFrame(() => {
                    this.updateVisibleItems(false)
                })
            }
            else {
                this.$emit('hidden')
            }
        },

        itemsLimitError() {
            throw new Error('Rendered items limit reached. Rendering all items at once.')
        },

        removeListeners() {
            if (!this.listenerTarget) return

            this.listenerTarget.removeEventListener('scroll', this.handleScroll)
            this.listenerTarget.removeEventListener('resize', this.handleResize)
            this.listenerTarget = null
        },

        scrollToItem(index) {
            const {viewport, scrollDirection, scrollDistance} = this.scrollToPosition(index)
            viewport[scrollDirection] = scrollDistance
        },

        scrollToPosition(index) {
            const getPositionOfItem = (index) => {
                return index * this.itemSize
            }

            const position = getPositionOfItem(index)
            const direction = {scroll: 'scrollTop', start: 'top'}

            if (this.pageMode) {
                const viewportEl = ScrollParent(this.$el)
                // HTML doesn't overflow like other elements
                const scrollTop = viewportEl.tagName === 'HTML' ? 0 : viewportEl[direction.scroll]
                const viewport = viewportEl.getBoundingClientRect()
                const scroller = this.$el.getBoundingClientRect()
                const scrollerPosition = scroller[direction.start] - viewport[direction.start]
                return {
                    viewport: viewportEl,
                    scrollDirection: direction.scroll,
                    scrollDistance: position + scrollTop + scrollerPosition,
                }
            }

            return {
                viewport: this.$el,
                scrollDirection: direction.scroll,
                scrollDistance: position,
            }
        },

        unuseView(view, fake = false) {
            const unusedViews = this.$_unusedViews || []
            unusedViews.push(view)

            if (!fake) {
                view.nr.used = false
                view.position = -9999
                this.$_views.delete(view.nr.key)
            }
        },

        updateVisibleItems(checkItem, checkPositionDiff = false) {
            const itemSize = this.itemSize
            const keyField = this.simpleArray ? null : this.keyField
            const items = this.items
            const count = items.length
            const views = this.$_views
            const unusedViews = this.$_unusedViews
            const mountedViews = this.mountedViews
            let startIndex, endIndex
            let totalSize
            let scroll

            if (count && !this.$_prerender) {
                scroll = this.getScroll()

                // Skip update if user hasn't scrolled enough
                if (checkPositionDiff) {
                    const positionDiff = Math.abs(scroll.originalStart - this.$_lastUpdateScrollPosition)
                    if (itemSize === null && positionDiff < itemSize) {
                        return {continuous: true}
                    }
                }
            }

            // Sets start index, end index, and total size
            if (!count) {
                startIndex = endIndex = totalSize = 0
            }
            else if (this.$_prerender) {
                startIndex = 0
                endIndex = this.prerender
                totalSize = null
            }
            else {
                this.$_lastUpdateScrollPosition = scroll.originalStart

                const buffer = this.buffer
                scroll.start -= buffer
                scroll.end += buffer

                // Fixed size mode
                startIndex = ~~(scroll.start / itemSize)
                endIndex = Math.ceil(scroll.end / itemSize)

                // Bounds
                startIndex < 0 && (startIndex = 0)
                endIndex > count && (endIndex = count)

                totalSize = count * itemSize
            }

            if (endIndex - startIndex > ITEMS_LIMIT) this.itemsLimitError()
            this.totalSize = totalSize

            // ???
            let view
            const continuous = startIndex <= this.$_endIndex && endIndex >= this.$_startIndex

            if (this.$_continuous !== continuous) {
                if (continuous) {
                    views.clear()
                    unusedViews.splice(0, unusedViews.length)
                    for (let i = 0, l = mountedViews.length; i < l; i++) {
                        view = mountedViews[i]
                        this.unuseView(view)
                    }
                }
                this.$_continuous = continuous
            }
            else if (continuous) {
                for (let i = 0, l = mountedViews.length; i < l; i++) {
                    view = mountedViews[i]

                    if (view.nr.used) {

                        // Update view item index
                        if (checkItem) {
                            view.nr.index = items.findIndex(
                                item => keyField ? item[keyField] === view.item[keyField] : item === view.item,
                            )
                        }

                        // Check if index is still in visible range
                        if (
                            view.nr.index === -1 ||
                            view.nr.index < startIndex ||
                            view.nr.index >= endIndex
                        ) {
                            this.unuseView(view)
                        }
                    }
                }
            }

            // ???
            const unusedIndex = continuous ? null : []

            let item
            let v
            for (let i = startIndex; i < endIndex; i++) {
                item = items[i]
                const key = keyField ? item[keyField] : item
                if (key == null) throw new Error(`Key is ${key} on item (keyField is '${keyField}')`)

                view = views.get(key)

                if (!itemSize) {
                    if (view) this.unuseView(view)
                    continue
                }

                // No view assigned to item
                if (!view) {
                    if (continuous) {
                        // Reuse existing view
                        if (unusedViews && unusedViews.length) {
                            view = unusedViews.pop()
                            view.item = item
                            view.nr.used = true
                            view.nr.index = i
                            view.nr.key = key
                        }
                        else {
                            view = this.addView(mountedViews, i, item, key)
                        }
                    }
                    else {
                        // Use existing view
                        // We don't care if they are already used
                        // because we are not in continuous scrolling
                        v = unusedIndex?.length || 0

                        if (!unusedViews || v >= unusedViews.length) {
                            view = this.addView(mountedViews, i, item, key)
                            this.unuseView(view, true)
                        }

                        view = unusedViews[v]
                        view.item = item
                        view.nr.used = true
                        view.nr.index = i
                        view.nr.key = key
                        unusedIndex.push(v + 1)
                        v++
                    }
                    views.set(key, view)
                }
                else {
                    view.nr.used = true
                    view.item = item
                }

                // Update position
                view.position = i * itemSize
            }

            this.$_startIndex = startIndex
            this.$_endIndex = endIndex

            if (this.emitUpdate) this.$emit('update', startIndex, endIndex)

            return {
                continuous,
            }
        },
    },
}
</script>

<style scoped lang="scss">

.virtual-scroller {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;

    &:not(.page-mode) {
        overflow-y: auto;
    }

    &.ready {
        .virtual-scroller__item-view {
            position: absolute;
            top: 0;
            left: 0;
            will-change: transform;
            width: 100%;
        }

        .virtual-scroller__item-wrapper {
            overflow-x: auto;
            position: static;
        }
    }

    .virtual-scroller__item-wrapper {
        width: 100%;
    }
}

.virtual-scroller__item-wrapper {
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
}

</style>
