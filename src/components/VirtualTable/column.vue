<template>
    <clicker :class="{unclickable: touchingResizer}" @single-click="onSingleClick" @double-click="onDoubleClick">
        <div
            class="column"
            :class="{'is-resizable': resizable,'slds-is-sortable':isSortable, 'slds-is-sorted slds-is-sorted_desc': sortedAscending, 'slds-is-sorted slds-is-sorted_asc': sortedDescending}"
            :style="{ width: `${initialWidth}px`, left: `${left}px` }">

            <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">

                <!-- Label -->
                <span class="label slds-truncate" :title="label">
                    {{ label }}
                </span>

                <!-- Sort icon -->
                <span v-if="isSortable" class="slds-icon_container slds-icon-utility-arrowup">
                    <slds-svg icon="utility:arrowup" class="slds-icon slds-icon-text-default slds-is-sortable__icon"/>
                </span>

            </div>

            <!-- Handle -->
            <span
                v-if="resizable"
                class="handle"
                :style="{transform: `translateX(${resizerTranslation}px)`}"
                @mousedown.prevent.stop="onResizerMouseDown"
                @click.stop>
                <span class="divider"/>
            </span>

        </div>
    </clicker>
</template>

<script>
    import Commons from "../DataTable/commons";
    import Clicker from "./clicker"

    export default {
        components: {
            Clicker,
        },
        props: {
            index: {
                type: Number,
                required: true,
            },
            initialWidth: {
                type: Number,
            },
            left: {
                type: Number,
            },
            label: {
                type: String,
            },
            minimumWidth: {
                type: Number,
                default: Commons.DEFAULT_MINIMUM_WIDTH,
            },
            resizable: {
                type: Boolean,
                default: true,
            },
            sortable: {
                type: Boolean,
                default: true,
            },
            sortedAscending: {
                type: Boolean,
            },
            sortedDescending: {
                type: Boolean,
            },
            type: {
                type: String,
                required: true,
                validator(value) {
                    return [
                        'action',
                        'badge',
                        'boolean',
                        'button',
                        'event-link',
                        'icon',
                        'text',
                    ].indexOf(value) !== -1
                },
            },
        },
        data() {
            return {
                startX: null,
                currentX: null,
                touchingResizer: false,
                resizerTranslation: 0,
            }
        },
        computed: {
            isSortable() {
                switch (this.type) {
                    case 'avatar':
                    case 'action':
                    case 'button':
                    case 'button-icon':
                        return false;

                    default:
                        return this.sortable;
                }
            }
        },
        methods: {
            onDoubleClick() {
                if (!this.resizable || (this.type !== 'text' && this.type !== 'event-link')) return;
                this.$emit('fullwidth');
            },
            onResizerMouseDown(event) {
                this.startX = event.pageX;
                this.currentX = this.startX;
                this.touchingResizer = true;

                document.body.addEventListener("mousemove", this.onResizerMove);
                document.body.addEventListener("mouseup", this.onResizerMoveEnd);
                document.body.addEventListener("mouseleave", this.onResizerMoveEnd);
            },
            onResizerMove(event) {
                if (!this.touchingResizer) return;
                if (this.currentX === event.pageX) return;

                this.currentX = event.pageX;
                const delta = this.currentX - this.startX;

                this.resizing(delta);
            },
            onResizerMoveEnd() {
                if (!this.touchingResizer) return;

                this.touchingResizer = false;
                document.body.removeEventListener("mousemove", this.onResizerMove);
                document.body.removeEventListener("mouseup", this.onResizerMoveEnd);
                document.body.removeEventListener("mouseleave", this.onResizerMoveEnd);

                const delta = this.currentX - this.startX;
                this.resize(delta);
            },
            onSingleClick() {
                if (!this.isSortable) return;

                if (this.sortedAscending) this.$emit('sort', 'desc');
                else this.$emit('sort', 'asc');
            },
            resize(delta) {

                // Apply column width validations to delta
                if (this.initialWidth + delta < this.minimumWidth) {
                    delta = this.minimumWidth - this.initialWidth;
                    if (delta === 0) return;
                }

                // Emit resize event with delta
                this.$emit('resize', this.index, delta);
                this.resizerTranslation = 0;
            },
            resizing(delta) {
                if (this.initialWidth + delta < this.minimumWidth) delta = this.minimumWidth - this.initialWidth;
                this.resizerTranslation = delta;
            },
        },
    }
</script>

<style scoped lang="scss">
    $color-background-button-brand: #0070d2;
    $spacing-xx-small: .25rem;

    .column {
        display: flex;
        height: 2rem;
        width: 100%;
        align-items: center;
        user-select: none;

        &.slds-is-sortable {
            cursor: pointer;
        }

        .label {
            padding: .25rem .5rem;
        }

        .handle {
            margin-left: auto;
            width: $spacing-xx-small;
            height: 100%;
            background: $color-background-button-brand;
            cursor: col-resize;
            opacity: 0;
            will-change: transform;
            z-index: 5000;

            &:hover,
            &:focus,
            &:active {
                opacity: 1;

                .divider {
                    position: absolute;
                    right: 0;
                    height: 100vh;
                    width: 1px;
                    background: $color-background-button-brand;
                }
            }
        }

        &:hover {
            background-color: white;
            color: currentColor;

            &.is-resizable {
                box-shadow: inset -0.25rem 0 0 #dddbda;
            }

            .slds-is-sortable__icon {
                display: inline-block;
                fill: #0070d2;
            }
        }
    }

    .unclickable {
        pointer-events: none;
    }
</style>
