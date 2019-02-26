<template>
    <th
        scope="col"
        class="slds-is-resizable"
        :class="[{'slds-is-sortable': isSortable}]"
        :style="{ width: `${initialWidth}px` }">
        <div
            class="slds-cell-fixed"
            :style="{ width: `${initialWidth}px`, left: `${left}px` }">

            <!-- Column name -->
            <a class="slds-th__action slds-text-link_reset" role="button" tabindex="-1">
                <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">

                    <!-- Label -->
                    <span class="slds-truncate" :title="label">
                        {{ label }}
                    </span>

                    <!-- Sort icon -->
                    <span v-if="sortable" class="slds-icon_container slds-icon-utility-arrowdown">
                        <slds-svg icon-name="utility:arrowdown" class="slds-icon slds-icon-text-default slds-is-sortable__icon"/>
                    </span>

                </div>
            </a>

            <!-- Column resizer -->
            <div class="slds-resizable">

                <!-- Input -->
                <input tabindex="-1" type="range" class="slds-resizable__input slds-assistive-text">

                <!-- Handle -->
                <span
                    class="slds-resizable__handle"
                    :style="{transform: `translateX(${resizerTranslation}px)`}"
                    @mousedown.prevent.stop="onResizerMouseDown">

                    <!-- Divider -->
                    <span class="slds-resizable__divider"/>

                </span>

            </div>

        </div>
    </th>
</template>

<script>
    import Commons from '../commons'
    import SldsColumn from './Column';

    export default {
        extends: SldsColumn,
        props: {
            index: {
                type: Number,
                required: true,
            },
            initialWidth: {
                type: Number,
            },
            minimumWidth: {
                type: Number,
                default: Commons.DEFAULT_MINIMUM_WIDTH,
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
        methods: {
            onResizerMouseDown(event) {
                this.startX = event.pageX;
                this.currentX = this.startX;
                this.touchingResizer = true;

                document.body.addEventListener("mousemove", this.onResizerMove);
                document.body.addEventListener("mouseup", this.onResizerMoveEnd);
                document.body.addEventListener("mouseleave", this.onResizerMoveEnd);
            },
            onResizerMove() {
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
