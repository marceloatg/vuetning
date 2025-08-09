<template>
    <li role="presentation" :class="tabClassNames">
        <a
            :id="`vertical-tab-${name}__nav`"
            class="slds-vertical-tabs__link"
            role="tab"
            :tabindex="tabIndex"
            :aria-selected="isActive"
            :aria-controls="`vertical-tab-${name}`"
        >

            <!-- Icon left -->
            <span v-if="leftIconName">
                <slds-icon :icon-name="leftIconName" x-small/>
            </span>

            <!-- Content (Label + Description) -->
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
         * Indicates when this vertical tab is active.
         */
        isActive: Boolean,

        /**
         * Indicates when this is the last tab in the list.
         */
        isLast: Boolean,

        /**
         * Tab label.
         */
        label: { type: String, required: true },

        /**
         * Tab description (optional, appears below label).
         */
        description: String,

        /**
         * Tab name.
         */
        name: { type: String, required: true },

        /**
         * Left icon name.
         */
        leftIconName: String,

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

.slds-vertical-tabs__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    gap: 0.5rem;
    min-height: 3.5rem; // Altura mínima padrão para todas as abas
}

.slds-vertical-tabs__left-icon,
.slds-vertical-tabs__right-icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.slds-vertical-tabs__content {
    flex: 1;
    min-width: 0; // Allow text to truncate
    display: flex;
    flex-direction: column;
    justify-content: center; // Centraliza verticalmente o conteúdo
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
