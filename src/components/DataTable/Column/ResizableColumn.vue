<template>

    <!-- Resizable column -->
    <th v-if="column.resizable"
        scope="col"
        class="slds-is-resizable"
        :class="[{'slds-is-sortable': isSortable}]"
        :style="{ width: `${column.initialWidth}px` }">
        <div class="slds-cell-fixed"
             :style="{ width: `${column.initialWidth}px`, left: `${column.left}px` }">

            <!-- Column name -->
            <a class="slds-th__action slds-text-link_reset" role="button" tabindex="-1">
                <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">

                    <!-- Label -->
                    <span class="slds-truncate" :title="column.label">
                        {{ column.label }}
                    </span>

                    <!-- Sort icon -->
                    <span v-if="sortable" class="slds-icon_container slds-icon-utility-arrowdown">
                        <slds-svg icon-name="utility:arrowdown" class="slds-icon slds-icon-text-default slds-is-sortable__icon"/>
                    </span>

                </div>
            </a>

            <!-- Column resizer -->
            <div v-if="column.resizable" class="slds-resizable">

                <!-- Input -->
                <input tabindex="-1" type="range" class="slds-resizable__input slds-assistive-text"/>

                <!-- Handle -->
                <span class="slds-resizable__handle"
                      :style="{transform: `translateX(${column.resizerTranslation}px)`}"
                      @mousedown.prevent.stop="onResizerMouseDown(column, $event)">

                    <!-- Divider -->
                    <span class="slds-resizable__divider"></span>

                </span>

            </div>

        </div>
    </th>

    <!-- Fixed column -->
    <th :key="column.fieldName" v-else scope="col"
        :style="{ width: `${column.fixedWidth}px` }">
        <div class="slds-cell-fixed" :style="{ left: `${column.left}px` }">
            <div class="slds-truncate" :title="column.label" style="display: flex;padding: .25rem .5rem;height: 2rem;align-items: center;">
                {{ column.label }}
            </div>
        </div>
    </th>

</template>

<script>
    import SldsColumn from './Column';

    export default {
        extends: SldsColumn,
        props: {
            column: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                startX: null,
                currentX: null,
                touchingResizer: false,
            }
        },
        methods: {
            onResizerMouseDown(column, event) {
                this.column = column;
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
                if (this.column.initialWidth + delta < this.column.minimumWidth) {
                    delta = this.column.minimumWidth - this.column.initialWidth;
                }

                this.column.resizerTranslation = delta;
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
                if (this.column.initialWidth + delta < this.column.minimumWidth) {
                    delta = this.column.minimumWidth - this.column.initialWidth;

                    if (delta === 0) {
                        this.column = null;
                        return;
                    }
                }

                // Update table and column widths
                this.column.initialWidth += delta;
                this.column.resizerTranslation = 0;

                this.$emit('resize', this.column, delta);
            },
        },
    }
</script>
