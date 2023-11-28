<template>
    <li :class="itemClassNames" role="presentation" :title="label">
        <a
            :id="`tab-scoped-${name}__item`"
            :aria-controls="`tab-scoped-${name}`"
            :aria-selected="isActive"
            class="slds-tabs_scoped__link"
            role="tab"
            :tabIndex="scopedTabIndex"
        >
            {{ label }}
        </a>
    </li>

</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsScopedTab",

    props: {
        hasError: Boolean,

        iconName: String,

        isActive: Boolean,

        label: { type: String, required: true },

        name: { type: String, required: true },
    },

    computed: {
        /**
         * The CSS class names for the item.
         */
        itemClassNames(): string {
            let classNames = "slds-tabs_scoped__item"

            if (this.isActive) classNames += " slds-is-active"

            return classNames
        },

        /**
         * Tab index.
         */
        scopedTabIndex(): number {
            return this.isActive ? 0 : -1
        },
    },
})
</script>

