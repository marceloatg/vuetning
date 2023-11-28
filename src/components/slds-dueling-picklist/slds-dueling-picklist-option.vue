<template>
    <li class="slds-listbox__item" role="presentation" @click="handleClick">
        <div :aria-selected="isActive" :class="listBoxClassNames" role="option">
            <span class="slds-media__body">
                <span class="slds-truncate unselectable" :title="label">
                    {{ label }}
                </span>
            </span>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "SldsDuelingPicklistOption",

    props: {
        /**
         * Option label.
         */
        label: String,

        /**
         * Indicates whether this option is active.
         */
        isActive: Boolean,
    },

    computed: {
        listBoxClassNames(): string {
            let classNames = "slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline"

            if (this.isActive) classNames += " slds-is-selected"

            return classNames
        },
    },

    methods: {
        handleClick(event: MouseEvent): void {
            if (event.shiftKey) this.$emit(EVENTS.SHIFT_CLICK)
            else if (event.ctrlKey) this.$emit(EVENTS.CTRL_CLICK)
        },
    },
})
</script>

<style scoped lang="scss">

.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

</style>
