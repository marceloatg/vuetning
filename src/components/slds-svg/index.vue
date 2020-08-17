<template>
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" :class="offset">
        <action-sprite v-if="category === 'action'" :id="name"/>
        <custom-sprite v-else-if="category === 'custom'" :id="name"/>
        <doctype-sprite v-else-if="category === 'doctype'" :id="name"/>
        <standard-sprite v-else-if="category === 'standard'" :id="name"/>
        <utility-sprite v-else-if="category === 'utility'" :id="name"/>
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

    components: {
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

        viewBox() {
          if (this.category === 'action') return '0 0 52 52';
          if (this.category === 'custom') return '0 0 100 100';
          if (this.category === 'doctype') return '0 0 56 64';
          if (this.category === 'standard') return '0 0 100 100';
          if (this.category === 'utility') return '0 0 52 52';
          else throw 'Invalid icon category';
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
