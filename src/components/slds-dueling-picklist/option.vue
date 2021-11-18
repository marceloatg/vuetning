<template>
    <li
        role="presentation"
        class="slds-listbox__item"
        @click.exact="onClick"
        @click.ctrl="onCtrlClick"
        @click.shift="onShiftClick">
        <div
            :aria-selected="isSelected"
            :aria-disabled="disabled"
            :tabindex="index"
            class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline"
            draggable="false"
            role="option">
            <span class="slds-media__body">

                <!-- Label -->
                <span class="slds-listbox__option-label slds-truncate" :title="label">
                    {{ label }}
                </span>

                <!-- Locked icon -->
                <span v-if="disabled" class="slds-media__figure slds-media__figure_reverse">
                    <slds-icon icon="utility:lock" x-small current-color/>
                </span>

                <!-- Meta -->
                <span v-if="meta != null" class="slds-listbox__option-meta" :class="{'is-selected': isSelected}">
                    {{ meta }}
                </span>

            </span>
        </div>
    </li>
</template>

<script>
    import SldsIcon from '../slds-icon/slds-icon'

    export default {
        name: 'Option',
        components: {SldsIcon},
        props: {
            disabled: {
                type: Boolean,
            },
            index: {
                type: Number,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
            meta: {
                type: String,
            },
            isSelected: {
                type: Boolean,
            },
            value: {
                required: true,
            },
        },
        methods: {
            onClick() {
                if (this.disabled) return
                this.$emit('click')
            },
            onCtrlClick() {
                if (this.disabled) return
                this.$emit('ctrl-click')
            },
            onShiftClick() {
                if (this.disabled) return
                this.$emit('shift-click')
            },
        },
    }
</script>

<style scoped lang="scss">
    .slds-listbox__item {
        transition: all 300ms;

        .slds-listbox__option-label {
            font-size: 13px;
            user-select: none;
        }

        .slds-listbox__option-meta {
            font-size: 12px;
            user-select: none;

            &.is-selected {
                color: #ecebea;
            }
        }
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
