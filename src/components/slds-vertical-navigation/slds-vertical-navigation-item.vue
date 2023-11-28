<template>
    <li :class="itemClassNames">
        <a class="slds-nav-vertical__action">

            <!-- Icon -->
            <slds-icon
                v-if="iconName"
                :icon-name="iconName"
                x-small
                class="slds-line-height_reset slds-m-right_x-small"
            />

            {{ label }}

            <span v-if="badge" class="slds-badge slds-col_bump-left">
                {{ badge }}
            </span>

        </a>
    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SldsIcon from "../slds-icon/slds-icon.vue"

export default defineComponent({
    name: "SldsVerticalNavigationItem",

    components: {
        SldsIcon,
    },

    props: {
        badge: String,

        iconName: String,

        label: { type: String, required: true },

        name: { type: String, required: true },
    },

    computed: {
        /**
         * Indicates whether this item is active.
         */
        isActive(): boolean {
            let activeItemName = this.$parent?.active || this.$parent?.$parent?.active || null
            return this.name === activeItemName
        },

        /**
         * The CSS class names for the item.
         */
        itemClassNames(): string {
            let classNames = "slds-nav-vertical__item"

            // Is active
            if (this.isActive) classNames += " slds-is-active"

            return classNames
        },
    },
})
</script>

<style scoped lang="scss">

.slds-nav-vertical__action,
.slds-nav-vertical__item:before {
    transition: all 300ms ease-out;
}

</style>
