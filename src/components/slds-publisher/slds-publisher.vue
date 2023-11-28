<template>
    <div :class="publisherClassNames">

        <!-- Label -->
        <label v-if="label" class="slds-publisher__toggle-visibility slds-m-bottom_small">
            {{ label }}
        </label>

        <!-- Input -->
        <textarea
            ref="input"
            class="slds-publisher__input slds-textarea slds-text-longform"
            :value="modelValue"
            v-bind="inputAttributes"
            @focus="handleFocus"
            @input="handleInput"
            @keyup="handleKeyUp"
        />

        <div class="slds-publisher__actions slds-grid slds-grid_align-spread">

            <slds-grid class="slds-publisher__toggle-visibility">
                <slot name="actions"/>
            </slds-grid>

            <!-- Button -->
            <slds-button
                brand
                :label="buttonLabel"
                :show-spinner="showSpinner"
                @click="handleClickShare"
            />

        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SldsButton from "../slds-button/slds-button.vue"
import { EVENTS, KEYS } from "../../constants"
import SldsGrid from "../../components/slds-grid/slds-grid.vue"

export default defineComponent({
    name: "SldsPublisher",

    components: { SldsGrid, SldsButton },

    props: {
        buttonLabel: { type: String, default: "Share" },

        label: String,

        modelValue: String,

        showSpinner: Boolean,
    },

    data() {
        return {
            isActive: false,
        }
    },

    computed: {
        inputAttributes(): Record<string, unknown> {
            const attributes: Record<string, unknown> = {}

            for (const attribute in this.$attrs) {
                if (!attribute.startsWith("data-") && attribute !== "class") {
                    attributes[attribute] = this.$attrs[attribute]
                }
            }

            return attributes
        },

        publisherClassNames(): string {
            let classNames = "slds-publisher"

            if (this.isActive) classNames += " slds-is-active"

            return classNames
        },
    },

    methods: {
        handleClickShare(): void {
            if (this.isActive) {
                this.$emit(EVENTS.POST)
            }
            else {
                const input = this.$refs.input as HTMLInputElement
                input.focus()

                this.isActive = true
            }
        },

        handleFocus(): void {
            if (!this.isActive) this.isActive = true
        },

        handleInput(event: Event): void {
            const target = event.target as HTMLInputElement
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, target.value)
        },

        handleKeyUp(event: Event): void {
            if (!(event instanceof KeyboardEvent) || event.key !== KEYS.ENTER) return

            event.stopPropagation()
        },
    },
})
</script>

