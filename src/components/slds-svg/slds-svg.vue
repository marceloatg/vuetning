<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="viewBox"
        :class="svgClass"
        v-bind="dataProperty"
    >
        <action-sprite v-if="category === 'action'" :id="name"/>
        <custom-sprite v-else-if="category === 'custom'" :id="name"/>
        <doctype-sprite v-else-if="category === 'doctype'" :id="name"/>
        <standard-sprite v-else-if="category === 'standard'" :id="name"/>
        <utility-sprite v-else-if="category === 'utility'" :id="name"/>
    </svg>
</template>

<script>
import ActionSprite from './slds-svgaction-sprite'
import CustomSprite from './slds-svgcustom-sprite'
import DoctypeSprite from './slds-svgdoctype-sprite'
import StandardSprite from './slds-svgstandard-sprite'
import UtilitySprite from './slds-svgutility-sprite'
import {getCategory, getName, isValidName} from '../../utils/icon-utils/index'

const defaultCategory = 'standard'
const defaultName = 'default'

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
        icon: {type: String, required: true},
        rotation: Number,
        standardFormat: Boolean
    },

    data() {
        return {
            category: defaultCategory,
            name: defaultName
        }
    },

    computed: {
        dataProperty() {
            return {[`data-slds-svg-${this.icon.replace(':', '-')}`]: ''}
        },

        svgClass() {
            if (this.category === 'standard') return ''
            return (this.standardFormat) ? 'standard-format-offset' : ''
        },

        viewBox() {
            if (this.category === 'action') return '0 0 52 52'
            if (this.category === 'custom') return '0 0 100 100'
            if (this.category === 'doctype') return '0 0 56 64'
            if (this.category === 'standard') return '0 0 100 100'
            if (this.category === 'utility') return '0 0 52 52'
            else throw 'Invalid icon category'
        }
    },

    watch: {
        icon(value) {
            if (isValidName(value)) this.handleValidIcon(value)
            else this.handleInvalidIcon(value)
        }
    },

    created() {
        if (isValidName(this.icon)) this.handleValidIcon(this.icon)
        else this.handleInvalidIcon(this.icon)
    },

    methods: {
        handleInvalidIcon(iconName) {
            const message = `<slds-svg> Invalid icon name ${iconName}`
            console.warn(message)

            this.category = defaultCategory
            this.name = defaultName
        },

        handleValidIcon(iconName) {
            this.category = getCategory(iconName)
            this.name = getName(iconName)
        },
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

.standard-format-offset {
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
