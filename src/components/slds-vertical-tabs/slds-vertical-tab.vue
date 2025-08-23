<template>
    <li :class="tabClassNames" role="presentation">
        <a
            :id="`vertical-tab-${name}__nav`"
            :aria-selected="isActive"
            :aria-controls="`vertical-tab-${name}`"
            class="slds-vertical-tabs__link"
            role="tab"
            :tabindex="tabIndex"
        >

            <!-- Icon left -->
            <span v-if="leftIconName">
                <slds-icon :icon-name="leftIconName" x-small/>
            </span>

            <!-- Content -->
            <div class="slds-vertical-tabs__content">

                <!-- Label -->
                <div class="slds-vertical-tabs__label">
                    {{ label }}
                </div>

                <!-- Description -->
                <div v-if="description" class="slds-vertical-tabs__description">
                    {{ description }}
                </div>

            </div>

            <!-- Icon right -->
            <span v-if="rightIconName">
                <slds-icon :icon-name="rightIconName" x-small/>
            </span>

        </a>
    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SldsIcon from "../slds-icon/slds-icon.vue"

export default defineComponent({
    name: "slds-vertical-tab",

    components: { SldsIcon },

    props: {
        /**
         * Tab description (optional, appears below label).
         */
        description: String,

        /**
         * Indicates when this vertical tab is active.
         */
        isActive: Boolean,

        /**
         * Tab label.
         */
        label: { type: String, required: true },

        /**
         * Left icon name.
         */
        leftIconName: String,

        /**
         * Tab name.
         */
        name: { type: String, required: true },

        /**
         * Right icon name.
         */
        rightIconName: String,
    },

    computed: {
        /**
         * The CSS class names for the tab.
         */
        tabClassNames(): string {
            let classNames = "slds-vertical-tabs__nav-item"

            if (this.isActive) classNames += " slds-is-active slds-has-focus"

            return classNames
        },

        /**
         * Tab index for accessibility.
         */
        tabIndex(): number {
            return this.isActive ? 0 : -1
        },
    },
})
</script>

<style scoped lang="scss">

.slds-vertical-tabs__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    gap: 0.5rem;
    min-height: 3.5rem;
}

.slds-vertical-tabs__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
    padding: 0;
    background-color: transparent;
}

.slds-vertical-tabs__label {
    font-weight: bold;
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.slds-vertical-tabs__description {
    color: #706e6b;
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>
