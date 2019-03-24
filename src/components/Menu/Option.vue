<template>
    <li role="presentation" class="slds-dropdown__item slds-is-selected" @mousedown.stop="onMouseDown">
        <a role="menuitemcheckbox" tabindex="0" :class="{'slds-is-disabled': disabled}">

            <!-- Left icon -->
            <span v-if="prefixIconName != null" class="slds-truncate" title="Table View">
                <slds-icon
                    :icon-name="prefixIconName"
                    :variant="variant"
                    size="x-small"
                    class="slds-m-right_x-small"/>
                {{ label }}
            </span>

            <!-- No icon -->
            <div v-if="prefixIconName == null" role="menuitem" tabindex="-1">
                <span class="slds-truncate" :title="label">
                    {{ label }}
                </span>
            </div>

            <!-- Right icon -->
            <slds-icon
                v-if="iconName != null"
                :icon-name="iconName"
                :variant="variant"
                size="x-small"
                class="slds-m-left_small slds-shrink-none"/>

        </a>
    </li>
</template>

<script>
    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            label: {
                type: String,
                required: true,
            },
            iconName: {
                type: String,
            },
            prefixIconName: {
                type: String,
            },
            value: {
                required: true,
            },
        },
        computed: {
            variant() {
                return this.disabled ? 'light' : 'default';
            },
        },
        methods: {
            onMouseDown() {
                if (this.disabled) return;
                this.$emit('click', this.value);
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
