<template>
    <li role="presentation" :class="itemClassNames">
        <a
            :id="`tab-default-${name}__item`"
            class="slds-tabs_default__link"
            role="tab"
            :tabindex="tabIndex"
            :aria-selected="isActive"
            :aria-controls="`tab-default-${name}`"
        >

            <!-- Icon -->
            <span class="slds-tabs__left-icon">
                <slds-icon v-if="iconName" :icon-name="iconName" small/>
            </span>

            <!-- Label -->
            {{ label }}

            <!-- Error -->
            <span class="slds-tabs__right-icon">
                <slds-icon
                    v-if="hasError"
                    icon-name="utility:error"
                    error
                    x-small
                    assistive-text="This item has an error"
                />
            </span>

        </a>
    </li>
</template>

<script lang="ts">
import SldsIcon from "../slds-icon/slds-icon.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsTab",

    components: {
        SldsIcon,
    },

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
            let classNames = "slds-tabs_default__item"

            if (this.isActive) classNames += " slds-is-active"

            return classNames
        },

        /**
         * Tab index.
         */
        tabIndex(): number {
            return this.isActive ? 0 : -1
        },
    },
})
</script>

<style scoped lang="scss">

.slds-tabs_default__link:focus {
    text-decoration: none;
}

.slds-tabs_default__item {

    &.slds-is-active {
        &:after {
            height: calc(var(--slds-c-tabs-list-sizing-border, var(--sds-c-tabs-list-sizing-border, 2px)) + 1px);
            transform: scaleX(1);
        }
    }

    &:after {
        height: calc(var(--slds-c-tabs-list-sizing-border, var(--sds-c-tabs-list-sizing-border, 1px)) + 1px);
        transform: scaleX(0);
    }

    &:hover {
        &:after {
            transition: transform 300ms;
            transform: scaleX(1);
        }
    }
}

</style>
