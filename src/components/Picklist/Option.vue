<template>
    <li role="presentation" class="slds-listbox__item" @mousedown.stop="selected">
        <div role="option"
             class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center"
             :class="[{'slds-is-selected': isSelected}]">

            <!-- Figure -->
            <span class="slds-media__figure">
                <slds-svg icon-name="utility:check" class="slds-icon slds-icon_x-small slds-listbox__icon-selected"/>
            </span>

            <!-- Body -->
            <span class="slds-media__body">
                <span class="slds-truncate" :title="label">
                    {{ label }}
                </span>
            </span>

        </div>
    </li>
</template>

<script>
    export default {
        name: 'SldsPicklistOption',
        props: {
            isSelected: {
                type: Boolean,
                default: false,
            },
            label: {
                type: String,
                required: true,
            },
            value: {
                required: true,
            },
        },
        methods: {
            selected() {
                this.$emit('selected', this.value, this.label);
            }
        },
    }
</script>