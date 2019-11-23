<template>
    <li role="presentation" class="slds-listbox__item" @mousedown.stop="select">
        <div
            role="option"
            class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center"
            :class="[{'slds-is-selected': isSelected}, {'slds-is-disabled': disabled}]">

            <!-- Figure -->
            <span class="slds-media__figure">
                <slds-svg icon="utility:check" class="slds-icon slds-icon_x-small slds-listbox__icon-selected"/>
            </span>

            <!-- Body -->
            <span class="slds-media__body">

                <span class="slds-truncate" :title="label" v-html="filteredLabel"/>

                <span v-if="meta != null" class="slds-listbox__option-meta">
                    {{ meta }}
                </span>

            </span>

        </div>
    </li>
</template>

<script>
    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            filter: {
                type: String,
            },
            isSelected: {
                type: Boolean,
                default: false,
            },
            label: {
                type: String,
                required: true,
            },
            meta: {
                type: String,
            },
            value: {
                required: true,
            },
        },
        computed: {
            filteredLabel() {
                if (this.filter == null) return this.label;
                const indices = this.getIndicesOf(this.filter, this.label);

                let label = '';
                for (let i = 0; i < indices.length; i++) {
                    if (indices[i] > 0) {
                        const prefixStartIndex = (i === 0) ? 0 : indices[i - 1] + 1;
                        const prefixEndIndex = indices[i];
                        label += this.label.substring(prefixStartIndex, prefixEndIndex);
                    }

                    label += `<mark>${this.label.substring(indices[i], indices[i] + this.filter.length)}</mark>`;
                }

                if (indices[indices.length - 1] !== this.label.length - 1) {
                    const postfixStartIndex = indices[indices.length - 1] + this.filter.length;
                    const postfixEndIndex = this.label.length;
                    label += this.label.substring(postfixStartIndex, postfixEndIndex);
                }

                return label;
            }
        },
        methods: {
            select() {
                if (this.disabled) return;
                this.$emit('select', this.value, this.label);
            },
            getIndicesOf(filter, label) {
                const searchStrLen = filter.length;
                if (searchStrLen === 0) return [];

                let startIndex = 0, index, indices = [];
                label = label.toLowerCase();
                filter = filter.toLowerCase();

                while ((index = label.indexOf(filter, startIndex)) > -1) {
                    indices.push(index);
                    startIndex = index + searchStrLen;
                }

                return indices;
            }
        },
    }
</script>

<style scoped lang="scss">
    .slds-is-disabled {
        color: #c9c7c5;
        cursor: not-allowed;
        user-select: none;

        .slds-listbox__option-meta {
            color: #c9c7c5;
        }
    }
</style>
