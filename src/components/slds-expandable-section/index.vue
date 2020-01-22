<template>
    <div class="slds-section" :class="[{'slds-is-open': (isOpen || !collapsible) && !disabled}]">

        <!-- Button title -->
        <h3 v-if="collapsible" class="slds-section__title">
            <button
                type="button"
                :disabled="disabled"
                class="slds-button slds-section__title-action"
                @click="toggle">

                <slds-svg icon="utility:switch" class="slds-section__title-action-icon slds-button__icon slds-button__icon_left"/>

                <span class="slds-truncate" :title="title">
                    {{ title }}
                </span>

            </button>
        </h3>

        <!-- Span title -->
        <h3 v-else class="slds-section__title slds-theme_shade">
            <span class="slds-truncate slds-p-horizontal_small" :title="title">
                {{ title }}
            </span>
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
                :style="[{'overflow': overflow}]">
                <slot/>
            </div>
        </transition>

    </div>
</template>

<script>
    import SldsSvg from '../../shared/svg'

    export default {
        name: 'SldsExpandableSection',
        components: {
            SldsSvg,
        },
        props: {
            title: {
                type: String,
                required: true,
            },
            collapsible: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            initialOverflow: {
                type: Boolean,
                default: false,
            },
            startOpen: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                isOpen: false,
                initialized: false,
            }
        },
        computed: {
            overflow() {
                return this.initialOverflow ? 'initial' : '';
            }
        },
        async mounted() {
            this.isOpen = this.startOpen;
            await this.$nextTick();
            this.initialized = true;
        },
        methods: {
            collapse(element) {
                if (!this.initialized) return;

                if (this.initialOverflow) element.style.overflow = '';
                element.style.height = 0;
                element.style.opacity = 0;
            },
            expand(element) {
                if (!this.initialized) return;

                if (this.initialOverflow) element.style.overflow = '';
                element.style.height = element.scrollHeight + "px";
                element.scrollHeight;
                element.style.opacity = 1;
            },
            resetHeight(element) {
                element.style.height = null;
                if (this.initialOverflow) element.style.overflow = 'initial';
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

    .slds-has-initial-overflow {
        overflow: initial;
    }

</style>
