<template>
    <svg :class="offset">
        <action-sprites v-if="category === 'action'"/>
        <custom-sprites v-if="category === 'custom'"/>
        <doctype-sprites v-if="category === 'doctype'"/>
        <standard-sprites v-if="category === 'standard'"/>
        <utility-sprites v-if="category === 'utility'"/>
        <use :xlink:href="`#${name}`"/>
    </svg>
</template>

<script>
    import ActionSprites from './ActionSprites';
    import CustomSprites from './CustomSprites';
    import DoctypeSprites from './DoctypeSprites';
    import StandardSprites from './StandardSprites';
    import UtilitySprites from './UtilitySprites';

    export default {
        name: 'SldsSvg',
        components:{
            ActionSprites,
            CustomSprites,
            DoctypeSprites,
            StandardSprites,
            UtilitySprites
        },
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
            root() {
                // TODO make configurable
                return '';
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
