<template>
    <svg>
        <action-sprite v-if="category === 'action'"/>
        <custom-sprite v-else-if="category === 'custom'"/>
        <doctype-sprite v-else-if="category === 'doctype'"/>
        <standard-sprite v-else-if="category === 'standard'"/>
        <utility-sprite v-else-if="category === 'utility'"/>
        <use :xlink:href="`#${name}`"/>
    </svg>
</template>

<script>
    import ActionSprite from './action-sprite';
    import CustomSprite from './custom-sprite';
    import DoctypeSprite from './doctype-sprite';
    import StandardSprite from './standard-sprite';
    import UtilitySprite from './utility-sprite';

    export default {
        name: 'SldsSvg',
        components:{
            ActionSprite,
            CustomSprite,
            DoctypeSprite,
            StandardSprite,
            UtilitySprite
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
