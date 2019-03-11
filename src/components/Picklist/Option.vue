<template>
    <li role="presentation" class="slds-listbox__item" @mousedown.stop="selected">
        <div
            role="option"
            class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center"
            :class="[{'slds-is-selected': isSelected}, {'slds-is-disabled': disabled}]">

            <!-- Figure -->
            <span class="slds-media__figure">
                <slds-svg icon-name="utility:check" class="slds-icon slds-icon_x-small slds-listbox__icon-selected"/>
            </span>

            <!-- Body -->
            <span class="slds-media__body">

                <span class="slds-truncate" :title="label">
                    {{ label }}
                </span>

                <span v-if="meta != null" class="slds-listbox__option-meta">
                    {{ meta }}
                </span>

            </span>

        </div>
    </li>
</template>

<script>
    export default {
        name: 'SldsPicklistOption',
        props: {
            disabled: {
                type: Boolean,
                default: false,
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
        methods: {
            selected() {
                if (this.disabled) return;
                this.$emit('selected', this.value, this.label);
            }
        },
    }
</script>

<style scoped lang="scss">
    .slds-is-disabled {
        color: #c9c7c5;
        cursor: not-allowed;
        user-select: none;
    }
</style>