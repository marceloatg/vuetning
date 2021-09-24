<!--
    Code adapted from Georges Kabbouchi @KABBOUCHI
    Original repo: https://github.com/KABBOUCHI/vue-tippy
-->

<template>
    <div>

        <!-- Trigger -->
        <div ref="trigger" class="trigger-wrapper">
            <slot name="trigger"/>
        </div>

        <!-- Content -->
        <div
            ref="content"
            role="tooltip"
            class="slds-popover slds-popover_tooltip slds-nubbin_bottom slds-m-bottom_small"
        >
            <div class="slds-popover__body">
                <slot/>
            </div>
        </div>

    </div>
</template>

<script>
import tippy, {animateFill} from 'tippy.js'
import 'tippy.js/animations/shift-away.css';

export default {
    name: "SldsTooltip",

    props: {
        disabled: Boolean,
        visible: Boolean
    },

    data() {
        return {
            tip: null,
            options: {}
        };
    },

    watch: {
        content() {
            if (this.tip) this.tip.set(this.getOptions());
        },

        disabled(val) {
            if (!this.tip) return;

            if (val) {
                this.tip.hide();
                this.tip.disable();
            }
            else {
                this.tip.enable();
            }
        },

        visible(val) {
            if (!this.tip) return;
            if (val) this.tip.show();
            else this.tip.hide();
        }
    },

    mounted() {
        this.init();
    },

    updated() {
        if (this.tip && !this.content) this.tip.set(this.getOptions());
    },

    beforeDestroy() {
        if (!this.tip) return;
        this.tip.destroy();
    },

    methods: {
        init() {
            if (this.tip) {
                try {
                    this.tip.destroy();
                }
                finally {
                    this.tip = null;
                }
            }

            const trigger = this.$refs.trigger;
            if (!trigger) return;

            const tip = tippy(trigger, this.getOptions());
            if (!tip) return;

            if (Array.isArray(tip)) {
                if (tip.length > 0) this.tip = tip[0];
                else return;
            }

            this.tip = tip;
            if (this.disabled) this.tip.disable();
            if (this.visible === true) this.tip.show();
        },

        getOptions() {
            this.options.animation = 'shift-away';
            this.options.content = this.$refs.content;
            this.options.plugins = [animateFill];

            if (!this.options.onShow && this.$listeners && this.$listeners["show"]) {
                this.options.onShow = (...args) => {
                    return this.$listeners["show"].fns(...args);
                };
            }

            if (!this.options.onShow && this.$listeners && this.$listeners["shown"]) {
                this.options.onShown = (...args) => {
                    return this.$listeners["shown"].fns(...args);
                };
            }

            if (!this.options.onHidden && this.$listeners && this.$listeners["hidden"]) {
                this.options.onHidden = (...args) => {
                    return this.$listeners["hidden"].fns(...args);
                };
            }

            if (!this.options.onHide && this.$listeners && this.$listeners["hide"]) {
                this.options.onHide = (...args) => {
                    return this.$listeners["hide"].fns(...args);
                };
            }

            if (!this.options.onMount && this.$listeners && this.$listeners["mount"]) {
                this.options.onMount = (...args) => {
                    return this.$listeners["mount"].fns(...args);
                };
            }

            this.options.triggerTarget = this.triggerTarget;
            return this.options;
        }
    }
};
</script>

<style scoped lang="scss">
.trigger-wrapper {
    display: inline;
}
</style>
