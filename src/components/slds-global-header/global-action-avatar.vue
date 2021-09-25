<template>
    <li class="slds-global-actions__item">
        <div class="slds-dropdown-trigger slds-dropdown-trigger_click">

            <!-- Button -->
            <button
                class="slds-button slds-global-actions__avatar slds-global-actions__item-action"
                :title="title"
                aria-haspopup="true"
                @click="onClick"
            >
                <span class="slds-avatar slds-avatar_circle slds-avatar_medium">
                    <img :alt="alt" :src="src" :title="title">
                </span>
            </button>


            <!-- Dropdown -->
            <transition v-bind="dropdownTransitionProperties">
                <section v-show="$data.$_isOpen" class="slds-popover slds-popover_large slds-nubbin_top-right" role="dialog">
                    <slot/>
                </section>
            </transition>

        </div>
    </li>
</template>

<script>

export default {
    name: 'SldsGlobalActionAvatar',

    props: {
        alt: String,
        src: {type: String, required: true},
        title: String
    },

    data() {
        return {
            $_isOpen: false,
        }
    },

    computed: {
        dropdownTransitionProperties() {
            const isAnimated = (this.$vuetning && this.$vuetning.hasAnimations)
            return isAnimated ? {name: 'dropdown'} : {duration: 0}
        },
    },

    methods: {
        onClick() {
            this.$emit('click');
            if (this.$slots.default) this.$data.$_isOpen = !this.$data.$_isOpen;
        }
    },
}
</script>

<style scoped lang="scss">
@import '../../directives/animated/animations';

.slds-popover {
    position: absolute;
    top: calc(100% + 14px);
    right: -9px;
    min-width: 12rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
</style>
