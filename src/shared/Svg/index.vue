<template>
    <svg>
        <use :xlink:href="`/assets/icons/${category}-sprite/svg/symbols.svg#${name}`"/>
    </svg>
</template>

<script>
    export default {
        props: {
            iconName: {
                type: String,
                required: true,
            },
            rotation: {
                type: Number,
                default: null,
            },
        },
        computed: {
            category() {
                return this.iconName.split(':')[0];
            },
            name() {
                return this.iconName.split(':')[1];
            }
        },
        created() {
            if (this.iconName.split(':').length !== 2) {
                throw 'Invalid icon-name format.';
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
</style>