<template>
    <div class="column" :style="{ width: `${initialWidth}px`, left: `${left}px` }">

        <!-- Label -->
        <span class="label slds-truncate" :title="label">
            {{ label }}
        </span>

        <!-- Handle -->
        <span class="handle" :style="{transform: `translateX(${resizerTranslation}px)`}" @mousedown.prevent.stop="onResizerMouseDown">
            <span class="divider"/>
        </span>

    </div>
</template>

<script>
    import Commons from "../DataTable/commons";

    export default {
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
            sortable: {
                type: Boolean,
                default: true,
            },
            type: {
                type: String,
                default: 'text',
                validator(value) {
                    return [
                        'text',
                        'event-link',
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
            resizing(delta) {
                if (this.initialWidth + delta < this.minimumWidth) delta = this.minimumWidth - this.initialWidth;
                this.resizerTranslation = delta;
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
        cursor: pointer;

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
            box-shadow: inset -0.25rem 0 0 #dddbda;
        }
    }
</style>
