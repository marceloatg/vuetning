<template>
    <svg :class="offset">
        <use :xlink:href="`/assets/icons/${category}-sprite/svg/symbols.svg#${name}`"/>
    </svg>
</template>

<script>
    export default {
        props: {
            icon: {
                type: String,
                required: true,
            },
            rotation: {
                type: Number,
                default: null,
            },
            standard: {
                type: Boolean,
            },
        },
        computed: {
            category() {
                return this.icon.split(':')[0];
            },
            name() {
                return this.icon.split(':')[1];
            },
            offset() {
                if (this.category !== 'utility') return '';
                return (this.standard) ? 'utility-offset' : '';
            },
        },
        created() {
            if (this.icon.split(':').length !== 2) {
                throw 'Invalid icon format.';
            }
        }
    }
</script>

<style lang="scss">
    $rotations: (
        '45': 45deg,
        '90': 90deg,
        '135': 135deg,
        '180': 180deg,
        '225': 225deg,
        '270': 270deg,
        '315': 315deg,
    );

    @each $name, $rotation in $rotations {
        .rotate-#{$name} {
            transform: rotate($rotation);
        }
    }

    .utility-offset {
        &.slds-icon_small {
            padding: 4px;
            border-radius: .25rem;
        }

        &.slds-icon_medium {
            padding: 6px;
        }

        &.slds-icon_large {
            padding: 8px;
        }
    }
</style>
