<template>
    <li class="slds-global-actions__item">
        <div class="slds-dropdown-trigger slds-dropdown-trigger_click">

            <!-- Button -->
            <button
                class="slds-button slds-global-actions__avatar slds-global-actions__item-action"
                :title="title"
                aria-haspopup="true"
                @click="handleClick"
            >
                <span class="slds-avatar slds-avatar_circle slds-avatar_medium">
                    <img :alt="alt" :src="src" :title="title">
                </span>
            </button>

            <!-- Dropdown -->
            <transition name="dropdown">
                <section v-show="isOpen" class="slds-popover slds-popover_large slds-nubbin_top-right" role="dialog">
                    <slot/>
                </section>
            </transition>

        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsGlobalActionAvatar",

    props: {
        alt: String,

        src: { type: String, required: true },

        title: String,
    },

    data() {
        return {
            isOpen: false,
        }
    },

    methods: {
        /**
         * Handles the click event on the avatar button.
         */
        handleClick() {
            if (this.$slots.default) this.isOpen = !this.isOpen
        },
    },
})
</script>

<style scoped lang="scss">

.slds-popover {
    position: absolute;
    top: calc(100% + 14px);
    right: -9px;
    min-width: 12rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

</style>
