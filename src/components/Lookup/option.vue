<template>
    <li role="presentation" class="slds-listbox__item" @mousedown.stop="select">
        <div role="option" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" :class="{'slds-is-disabled': disabled}">

            <!-- Figure -->
            <span v-if="icon != null" class="slds-media__figure slds-listbox__option-icon">
                <slds-icon :icon="icon" small/>
            </span>

            <!-- Body -->
            <span class="slds-media__body">

                <span class="slds-listbox__option-text slds-listbox__option-text_entity" :title="label" v-html="filteredLabel"/>

                <span v-if="meta != null" class="slds-listbox__option-meta slds-listbox__option-meta_entity">
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
            icon: {
                type: String,
                default: 'standard:default'
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
    .slds-listbox__option_label {
        font-size: 13px;
    }

    .slds-is-disabled {
        color: #c9c7c5;
        cursor: not-allowed;
        user-select: none;

        .slds-listbox__option-meta {
            color: #c9c7c5;
        }
    }
</style>
