<template>
    <span class="slds-pill" :class="{'slds-pill_link': clickable}" @click.stop="onClick">

        <!-- Icon -->
        <span v-if="$slots.icon" class="slds-pill__icon_container">
            <slot name="icon"/>
        </span>

        <!-- Clickable -->
        <a v-if="clickable" class="slds-pill__action" :title="label">
            <span class="slds-pill__label">
                {{ label }}
            </span>
        </a>

        <!-- Not clickable -->
        <span v-else class="slds-pill__label" :title="label">
            {{ label }}
        </span>

        <!-- Close button -->
        <button @click.stop="onRemove" title="Remove" class="slds-button slds-button_icon slds-button_icon slds-pill__remove">
            <slds-svg icon-name="utility:close" class="slds-button__icon"/>
        </button>

    </span>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                required: true,
            },
            name: {
                type: String,
            },
            clickable: {
                type: Boolean,
                default: true,
            },
        },
        methods: {
            onClick() {
                if (this.clickable) this.$emit('click', this.name);
            },
            onRemove() {
                this.$emit('remove', this.name);
            }
        },
    }
</script>

<style scoped lang="scss">

    .slds-pill {
        transition: all 200ms linear;

        &.slds-pill_link:active {
            animation: click-effect 120ms cubic-bezier(1, 1.9, 0.95, 0.98);
        }

        .slds-pill__icon_container {
            cursor: pointer;
        }
    }

    .slds-pill__label {
        user-select: none;
    }

    @keyframes click-effect {

        25% {
            transform: scale(0.97, 0.95);
        }

        100% {
            transform: scale(0.99, 0.98);
        }
    }

</style>