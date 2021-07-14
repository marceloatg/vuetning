<template>
    <div class="slds-section" :class="[{'slds-is-open': (isOpen || nonCollapsible) && !disabled}]">

        <!-- Span title -->
        <h3 v-if="nonCollapsible" class="slds-section__title slds-theme_shade">
            <span class="slds-truncate slds-p-horizontal_small" :title="title">
                {{ title }}
            </span>
        </h3>

        <!-- Button title -->
        <h3 v-else class="slds-section__title">
            <button
                type="button"
                :disabled="disabled"
                class="slds-button slds-section__title-action"
                @click="toggle"
            >

                <slds-svg icon="utility:switch" class="slds-section__title-action-icon slds-button__icon slds-button__icon_left"/>

                <span class="slds-truncate" :title="title">
                    {{ title }}
                </span>

            </button>
        </h3>

        <!-- content -->
        <transition
            @before-enter="collapse"
            @enter="expand"
            @after-enter="resetHeight"
            @before-leave="expand"
            @leave="collapse">
            <div
                v-if="isOpen && !disabled"
                role="region"
                class="slds-section__content_animated slds-p-horizontal_xxx-small"
            >
                <slot/>
            </div>
        </transition>

    </div>
</template>

<script>
import SldsSvg from '../slds-svg/svg'

export default {
    name: 'SldsExpandableSection',

    components: {
        SldsSvg,
    },

    props: {
        closedOnStart: Boolean,
        disabled: Boolean,
        nonCollapsible: Boolean,
        title: {type: String, required: true},
    },

    data() {
        return {
            isOpen: false,
            initialized: false,
        }
    },

    async mounted() {
        this.isOpen = !this.closedOnStart;
        await this.$nextTick();
        this.initialized = true;
    },

    methods: {
        collapse(element) {
            if (!this.initialized) return;

            element.style.overflow = '';
            element.style.height = 0;
            element.style.opacity = 0;
        },

        expand(element) {
            if (!this.initialized) return;

            element.style.overflow = '';
            element.style.height = element.scrollHeight + "px";
            element.scrollHeight;
            element.style.opacity = 1;
        },

        resetHeight(element) {
            element.style.height = null;
            element.style.overflow = 'initial';
        },

        toggle() {
            this.isOpen = !this.isOpen;
        }
    }
}
</script>

<style scoped lang="scss">

.slds-section__title-action:disabled:hover {
    cursor: not-allowed;
    background: #f3f2f2;
    color: #dddbda;
}

.slds-section__title-action-icon {
    transition: all 300ms ease;
}

.slds-section__content_animated {
    overflow: hidden;
    transition: all 300ms ease;
}

.slds-section.slds-is-open .slds-section__content_animated {
    padding-top: 0.5rem;
    transition: all 300ms ease-out;
}

</style>
