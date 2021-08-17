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
                v-for="view of pool"
                :key="view.nr.id"
                :style="ready ? { transform: `translateY(${view.position}px)` } : null"
                class="virtual-scroller__item-view"
                @mouseenter="$event.target.classList.add('hover')"
                @mouseleave="$event.target.classList.remove('hover')"
            >
                <slot
                    :item="view.item"
                    :index="view.nr.index"
                    :active="view.nr.used"
                />
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
            default: null,
        },

        minItemSize: {
            type: [Number, String],
            default: null,
        },

        sizeField: {
            type: String,
            default: 'size',
        },

        typeField: {
            type: String,
            default: 'type',
        },

        buffer: {
            type: Number,
            default: 200,
        },

        pageMode: {
            type: Boolean,
            default: false,
        },

        prerender: {
            type: Number,
            default: 0,
        },

        emitUpdate: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            hoverKey: null,
            pool: [],
            ready: false,
            scrollLeft: 0,
            totalSize: 0,
        }
    },

    computed: {
        sizes() {
            if (this.itemSize === null) {
                const sizes = {'-1': {accumulator: 0}}
                const items = this.items
                const field = this.sizeField
                const minItemSize = this.minItemSize
                let computedMinSize = 10000
                let accumulator = 0
                let current

                for (let i = 0, l = items.length; i < l; i++) {
                    current = items[i][field] || minItemSize
                    if (current < computedMinSize) {
                        computedMinSize = current
                    }
                    accumulator += current
                    sizes[i] = {accumulator, size: current}
                }

                // eslint-disable-next-line
                this.$_computedMinItemSize = computedMinSize
                return sizes
            }

            return []
        },

        simpleArray() {
            return this.items.length && typeof this.items[0] !== 'object'
        },
    },

    watch: {
        items() {
            this.updateVisibleItems(true)
        },

        pageMode() {
            this.applyPageMode()
            this.updateVisibleItems(false)
        },

        sizes: {
            handler() {
                this.updateVisibleItems(false)
            },
            deep: true,
        },
    },

    created() {
        this.$_startIndex = 0
        this.$_endIndex = 0
        this.$_views = new Map()
        this.$_unusedViews = new Map()
        this.$_scrollAnimationRequest = null
        this.$_lastUpdateScrollPosition = 0

        // In SSR mode, we also prerender the same number of item for the first render
        // to avoir mismatch between server and client templates
        if (this.prerender) {
            this.$_prerender = true
            this.updateVisibleItems(false)
        }
    },

    mounted() {
        this.applyPageMode()
        this.$nextTick(() => {
            // In SSR mode, render the real number of visible items
            this.$_prerender = false
            this.updateVisibleItems(true)
            this.ready = true
        })
    },

    beforeDestroy() {
        this.removeListeners()
    },

    methods: {
        addView(pool, index, item, key, type) {
            const view = {
                item,
                position: 0,
            }

            const nonReactive = {
                id: uid++,
                index,
                used: true,
                key,
                type,
            }

            Object.defineProperty(view, 'nr', {
                configurable: false,
                value: nonReactive,
            })

            pool.push(view)
            return view
        },

        unuseView(view, fake = false) {
            const unusedViews = this.$_unusedViews
            const type = view.nr.type

            if (!unusedViews.get(type)) unusedViews.set(type, [])

            const unusedPool = unusedViews.get(type)
            unusedPool.push(view)

            if (!fake) {
                view.nr.used = false
                view.position = -9999
                this.$_views.delete(view.nr.key)
            }
        },

        handleResize() {
            this.$emit('resize')
            if (this.ready) this.updateVisibleItems(false)
        },

        handleScroll(event) {
            if (event && event.target.scrollLeft !== this.scrollLeft) {
                this.scrollLeft = event.target.scrollLeft;
                return;
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
            if (!this.ready) return;

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

        updateVisibleItems(checkItem, checkPositionDiff = false) {
            const itemSize = this.itemSize
            const minItemSize = this.$_computedMinItemSize
            const typeField = this.typeField
            const keyField = this.simpleArray ? null : this.keyField
            const items = this.items
            const count = items.length
            const sizes = this.sizes
            const views = this.$_views
            const unusedViews = this.$_unusedViews
            const pool = this.pool
            let startIndex, endIndex
            let totalSize

            let scroll
            if (count && !this.$_prerender) {
                scroll = this.getScroll()

                // Skip update if use hasn't scrolled enough
                if (checkPositionDiff) {
                    const positionDiff = Math.abs(scroll.originalStart - this.$_lastUpdateScrollPosition)
                    if ((itemSize === null && positionDiff < minItemSize) || positionDiff < itemSize) {
                        return {
                            continuous: true,
                        }
                    }
                }
            }
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

                // Variable size mode
                if (itemSize === null) {
                    let h
                    let a = 0
                    let b = count - 1
                    let i = ~~(count / 2)
                    let oldI

                    // Searching for startIndex
                    do {
                        oldI = i
                        h = sizes[i].accumulator
                        if (h < scroll.start) {
                            a = i
                        }
                        else if (i < count - 1 && sizes[i + 1].accumulator > scroll.start) {
                            b = i
                        }
                        i = ~~((a + b) / 2)
                    } while (i !== oldI)
                    i < 0 && (i = 0)
                    startIndex = i

                    // For container style
                    totalSize = sizes[count - 1].accumulator

                    // Searching for endIndex
                    for (endIndex = i; endIndex < count && sizes[endIndex].accumulator < scroll.end; endIndex++) ;
                    if (endIndex === -1) {
                        endIndex = items.length - 1
                    }
                    else {
                        endIndex++
                        // Bounds
                        endIndex > count && (endIndex = count)
                    }
                }
                else {
                    // Fixed size mode
                    startIndex = ~~(scroll.start / itemSize)
                    endIndex = Math.ceil(scroll.end / itemSize)

                    // Bounds
                    startIndex < 0 && (startIndex = 0)
                    endIndex > count && (endIndex = count)

                    totalSize = count * itemSize
                }
            }

            if (endIndex - startIndex > ITEMS_LIMIT) this.itemsLimitError()
            this.totalSize = totalSize

            let view
            const continuous = startIndex <= this.$_endIndex && endIndex >= this.$_startIndex

            if (this.$_continuous !== continuous) {
                if (continuous) {
                    views.clear()
                    unusedViews.clear()
                    for (let i = 0, l = pool.length; i < l; i++) {
                        view = pool[i]
                        this.unuseView(view)
                    }
                }
                this.$_continuous = continuous
            }
            else if (continuous) {
                for (let i = 0, l = pool.length; i < l; i++) {
                    view = pool[i]
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

            const unusedIndex = continuous ? null : new Map()

            let item, type, unusedPool
            let v
            for (let i = startIndex; i < endIndex; i++) {
                item = items[i]
                const key = keyField ? item[keyField] : item
                if (key == null) {
                    throw new Error(`Key is ${key} on item (keyField is '${keyField}')`)
                }
                view = views.get(key)

                if (!itemSize && !sizes[i].size) {
                    if (view) this.unuseView(view)
                    continue
                }

                // No view assigned to item
                if (!view) {
                    type = item[typeField]
                    unusedPool = unusedViews.get(type)

                    if (continuous) {
                        // Reuse existing view
                        if (unusedPool && unusedPool.length) {
                            view = unusedPool.pop()
                            view.item = item
                            view.nr.used = true
                            view.nr.index = i
                            view.nr.key = key
                            view.nr.type = type
                        }
                        else {
                            view = this.addView(pool, i, item, key, type)
                        }
                    }
                    else {
                        // Use existing view
                        // We don't care if they are already used
                        // because we are not in continous scrolling
                        v = unusedIndex.get(type) || 0

                        if (!unusedPool || v >= unusedPool.length) {
                            view = this.addView(pool, i, item, key, type)
                            this.unuseView(view, true)
                            unusedPool = unusedViews.get(type)
                        }

                        view = unusedPool[v]
                        view.item = item
                        view.nr.used = true
                        view.nr.index = i
                        view.nr.key = key
                        view.nr.type = type
                        unusedIndex.set(type, v + 1)
                        v++
                    }
                    views.set(key, view)
                }
                else {
                    view.nr.used = true
                    view.item = item
                }

                // Update position
                if (itemSize === null) {
                    view.position = sizes[i - 1].accumulator
                }
                else {
                    view.position = i * itemSize
                }
            }

            this.$_startIndex = startIndex
            this.$_endIndex = endIndex

            if (this.emitUpdate) this.$emit('update', startIndex, endIndex)

            return {
                continuous,
            }
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

        applyPageMode() {
            if (this.pageMode) {
                this.addListeners()
            }
            else {
                this.removeListeners()
            }
        },

        addListeners() {
            this.listenerTarget = this.getListenerTarget()
            this.listenerTarget.addEventListener('scroll', this.handleScroll, supportsPassive ? {
                passive: true,
            } : false)
            this.listenerTarget.addEventListener('resize', this.handleResize)
        },

        removeListeners() {
            if (!this.listenerTarget) {
                return
            }

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
                if (this.itemSize === null) return index > 0 ? this.sizes[index - 1].accumulator : 0
                else return index * this.itemSize
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

        itemsLimitError() {
            setTimeout(() => {
                console.log('It seems the scroller element isn\'t scrolling, so it tries to render all the items at once.', 'Scroller:', this.$el)
                console.log('Make sure the scroller has a fixed height (or width) and \'overflow-y\' (or \'overflow-x\') set to \'auto\' so it can scroll correctly and only render the items visible in the scroll viewport.')
            })
            throw new Error('Rendered items limit reached')
        },
    },
}
</script>

<style scoped lang="scss">
.virtual-scroller {
    position: relative;

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
