<template>
    <div ref="root" class="slds-grid slds-virtual-table">
        <div ref="dynamic" class="slds-col slds-shrink-none slds-virtual-table_container">

            <!-- Header -->
            <div class="slds-virtual-table_header">
                3
            </div>

            <!-- Body -->
            <recycle-scroller
                class="slds-virtual-table_body"
                :items="rows"
                :item-size="rowHeight"
                :key-field="keyField">
                <template v-slot="{ item, index }">
                    <div class="slds-virtual-table_row" :class="{'is-selected': item.isSelected}">

                        <!-- Line number cell -->
                        <div v-if="!hideLineNumber" class="slds-virtual-table_cell slds-virtual-table_cell-line-number">
                            {{ getLineNumber(index) }}
                        </div>

                        <!-- Selection cell -->
                        <div class="slds-virtual-table_cell">
                            <div class="slds-checkbox" @click="onClickSelect(item.id)">
                                <input type="checkbox" :checked="item.isSelected">
                                <label class="slds-checkbox__label">
                                    <span class="slds-checkbox_faux"/>
                                </label>
                            </div>
                        </div>

                        <!-- Dynamic cell -->
                        <template v-for="column in columns">
                            <div :key="column.id" class="slds-virtual-table_cell">
                                <span class="slds-grid slds-grid_align-spread slds-virtual-table_cell-content">

                                    <!-- Text -->
                                    <span
                                        v-if="column.type === 'text'"
                                        :title="item.id"
                                        class="slds-truncate">
                                        {{ item.id }}
                                    </span>

                                </span>
                            </div>
                        </template>

                        <!-- Actions cell -->
                        <div v-if="hasActions" class="slds-virtual-table_cell slds-virtual-table_cell-actions">
                            <div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

                                <!-- Button -->
                                <button
                                    class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
                                    title="Actions">
                                    <svg
                                        class="slds-button__icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        <path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z"/>
                                    </svg>
                                </button>

                            </div>
                        </div>

                    </div>
                </template>
            </recycle-scroller>

        </div>
    </div>
</template>

<script>
    import {RecycleScroller} from 'vue-virtual-scroller'
    import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
    import 'numeral/locales/pt-br'
    import numeral from "numeral";

    export default {
        name: 'SldsVirtualTable',
        components: {
            RecycleScroller,
        },
        props: {
            actions: Array,
            columns: {type: Array, required: true},
            filter: {type: String, default: null},
            keyField: {type: String, default: 'id'},
            rows: {type: Array, required: true},
            hideLineNumber: Boolean,
        },
        data() {
            return {
                scrollTop: 0,
            }
        },
        computed: {
            /*
            filteredRows() {
                console.log('filteredRows')
                if (this.filter == null) return this.rows;

                return this.rows.filter((row) => {
                    for (let column of this.columns) {
                        const value = String(this.getFieldValue(column, row)).toLowerCase();
                        if (value.indexOf(this.filter.toLowerCase()) !== -1) return true;
                    }

                    return false;
                })
            },
*/
            hasActions() {
                if (this.actions == null) return false;
                return (this.actions.length > 0);
            },

            rowHeight() {
                const rowHeight = this.columns.some(column => column.type === 'avatar') ? 40 : 28;
                const virtualScrollerElement = this.$refs.virtualScroller;

                if (virtualScrollerElement != null) virtualScrollerElement.style.setProperty('--row-height', `${rowHeight}px`);
                return rowHeight;
            },
        },
        created() {
            numeral.locale('pt-br');
        },
        mounted() {
            this.$refs.root.style.setProperty('--row-height', `${this.rowHeight}px`);
        },
        beforeDestroy() {
        },
        methods: {
            getLineNumber(index) {
                return numeral(index + 1).format('0,0');
            },

            onClickSelect(id) {
                this.$emit('select', id);
            },
        },
    }
</script>

<style lang="scss">
    $header-height: 2rem;
    $table-color-background: #fafaf9;
    $table-color-hover: #f3f2f2;

    .slds-virtual-table {
        --row-height: 1.75rem;

        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        background-color: $table-color-background;

        &_header {
            display: flex;
            position: static;
            height: $header-height;
            color: #514f4d;
            font-weight: 700;
            background-color: $table-color-background;
        }

        &_body {
            height: calc(100% - #{$header-height});
            overflow-x: auto;
            border-top: 1px solid #dddbda;
        }

        &_row {
            display: flex;
            height: var(--row-height);
            align-items: center;
            border-bottom: 1px solid #dddbda;
            background-color: white;

            &.is-selected {
                background-color: $table-color-hover;
            }
        }

        &_cell {
            padding: .25rem .5rem;

            &.slds-virtual-table_cell-line-number {
                width: 3.75rem;
                font-size: .75rem;
                text-align: center;
                color: #3e3e3c;
            }

            &-content {
                height: 100%;
                align-items: center;
            }

            &.slds-virtual-table_cell-actions {
                width: 3rem;

                .slds-dropdown-trigger {
                    margin: 0;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);

                    .slds-button {
                        margin-top: -2px;

                        &:active {
                            animation: click-effect 120ms cubic-bezier(1, 1.9, 0.94, 0.98);
                        }

                        // Prevent focus appearing in random recycled buttons
                        &:focus {
                            box-shadow: none;
                            color: #706e6b;
                        }
                    }
                }
            }
        }

        .hover {
            .slds-virtual-table_row {
                background-color: $table-color-hover;
                box-shadow: #dddbda 0 -1px 0 inset, #dddbda 0 1px 0 inset;
            }
        }

        &_line-counter {
            min-width: 3.75rem;
        }

        &_selection {
            min-width: 2rem;
        }

        &_container {
            .slds-virtual-table_body {
            }
        }

        &_actions {
            width: 3rem;
        }
    }

    .vue-recycle-scroller.ready.direction-vertical {
        .vue-recycle-scroller__item-wrapper {
            overflow-x: auto;
            position: static;
        }
    }

    @keyframes click-effect {

        25% {
            transform: scale(0.94, 0.94);
        }

        100% {
            transform: scale(0.98, 0.98);
        }
    }

</style>
