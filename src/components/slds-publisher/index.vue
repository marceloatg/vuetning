<template>
    <div class="slds-publisher" :class="{'slds-is-active':isActive}">

        <!-- Label -->
        <label v-if="label" class="slds-publisher__toggle-visibility slds-m-bottom_small">
            {{ label }}
        </label>

        <!-- Input -->
        <textarea
            ref="input"
            :value="value"
            v-bind="$attrs"
            class="slds-publisher__input slds-textarea slds-text-longform"
            @focus="onFocus"
            @input="$emit('input', $event.target.value)"
            v-on="listeners"/>

        <div class="slds-publisher__actions slds-grid slds-grid_align-spread">

            <div class="slds-grid slds-publisher__toggle-visibility">
                <slot name="actions"/>
            </div>

            <!-- Button -->
            <slds-button brand label="Share" @click="onClickShare"/>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'SldsPublisher',
        inheritAttrs: false,
        props: {
            label: String,
            richText: Boolean,
        },
        data() {
            return {
                isActive: false,
            }
        },
        computed: {
            listeners() {
                const listeners = {...this.$listeners};
                delete listeners.input;
                return listeners
            },
        },
        mounted() {
            this.$refs.input.addEventListener("keyup", this.onKeyUp);
        },
        beforeDestroy() {
            this.$refs.input.removeEventListener("keyup", this.onKeyUp);
        },
        methods: {
            onClickShare() {
                if (this.isActive) this.$emit('post');
                else this.isActive = true;
            },
            onFocus() {
                if (!this.isActive) this.isActive = true;
            },
            onKeyUp(event) {
                if (event.key === 'Enter' && this.$refs.input === document.activeElement) {
                    event.stopPropagation();
                }
            },
        },
    }
</script>

<style scoped lang="scss">

</style>
