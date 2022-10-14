<template>
    <li
        role="presentation"
        class="slds-listbox__item"
        @click="onClick"
    >
        <div
            :aria-selected="isActive"
            class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline"
            :class="{'slds-is-selected': isActive}"
            role="option"
        >
            <span class="slds-media__body">
                <span class="slds-truncate unselectable" :title="label">
                    {{ label }}
                </span>
            </span>
        </div>
    </li>
</template>

<script>
export default {
    name: 'SldsDuelingPicklistOption',

    props: {
        /**
         * @description Option label.
         * @type {string[]}
         */
        label: String,

        /**
         * @description Indicates wheter this option is selected.
         * @type {boolean}
         */
        isActive: Boolean,
    },

    methods: {
        onClick(event) {
            if (event.shiftKey) this.$emit('shift-click')
            else if (event.ctrlKey) this.$emit('ctrl-click')
            else this.$emit('click')
        }
    },
}
</script>

<style scoped lang="scss">
.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
