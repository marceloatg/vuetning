<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :class="svgClassNames"
        :viewBox="viewBox"
        :height="height"
        v-bind="dataProperty"
    >
        <action-sprite v-if="category === 'action'" :id="name"/>
        <brand-sprite v-else-if="category === 'brand'" :id="name"/>
        <custom-sprite v-else-if="category === 'custom'" :id="name"/>
        <doctype-sprite v-else-if="category === 'doctype'" :id="name"/>
        <standard-sprite v-else-if="category === 'standard'" :id="name"/>
        <utility-sprite v-else-if="category === 'utility'" :id="name"/>
    </svg>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue"
import { IconUtils } from "../../utils"

// Each SLDS sprite category is ~50–415 KB of inline SVG markup. Loading them
// statically would force every consumer of <slds-svg> to ship all six sprites
// up front. defineAsyncComponent defers the import until v-if mounts the
// matching sprite, so the build emits one lazy chunk per category and the
// runtime fetches only the categories the user actually renders.
const ActionSprite = defineAsyncComponent(() => import("./slds-svg-action-sprite.vue"))
const BrandSprite = defineAsyncComponent(() => import("./slds-svg-brand-sprite.vue"))
const CustomSprite = defineAsyncComponent(() => import("./slds-svg-custom-sprite.vue"))
const DoctypeSprite = defineAsyncComponent(() => import("./slds-svg-doctype-sprite.vue"))
const StandardSprite = defineAsyncComponent(() => import("./slds-svg-standard-sprite.vue"))
const UtilitySprite = defineAsyncComponent(() => import("./slds-svg-utility-sprite.vue"))

const defaultCategory = "standard"
const defaultName = "default"

export default defineComponent({
    name: "SldsSvg",

    components: {
        ActionSprite,
        BrandSprite,
        CustomSprite,
        DoctypeSprite,
        StandardSprite,
        UtilitySprite,
    },

    props: {
        /**
         * The Lightning Design System name of the icon.
         * Names are written in the format 'utility:down' where 'utility' is the category,
         * and 'down' is the specific icon to be displayed.
         */
        icon: { type: String, required: true },

        /**
         * The icon rotation.
         */
        rotation: Number,

        /**
         * Indicates whether this icon is in standard format.
         */
        standardFormat: Boolean,
    },

    data() {
        return {
            /**
             * The icon category.
             * @type {string}
             */
            category: defaultCategory,

            /**
             * The icon name.
             * @type {string}
             */
            name: defaultName,
        }
    },

    computed: {
        /**
         * The slds-svg data property used to help in unit testing.
         */
        dataProperty(): object {
            return { [`data-slds-svg-${this.icon.replace(":", "-")}`]: "" }
        },

        /**
         * The CSS class names for the SVG.
         */
        svgClassNames(): string {
            return this.standardFormat && this.category !== "standard"
                ? "standard-format-offset"
                : ""
        },

        /**
         * The SVG height.
         */
        height(): string | undefined {
            return this.category === "brand" ? "52" : undefined
        },

        /**
         * The SVG viewBox.
         */
        viewBox(): string {
            if (this.category === "action") return "0 0 52 52"
            if (this.category === "brand") return "0 0 512 512"
            else if (this.category === "custom") return "0 0 100 100"
            else if (this.category === "doctype") return "0 0 56 64"
            else if (this.category === "standard") return "0 0 100 100"
            else if (this.category === "utility") return "0 0 52 52"
            else throw "Invalid icon category"
        },
    },

    watch: {
        icon(value): void {
            if (IconUtils.isValidName(value)) this.handleValidIcon(value)
            else this.handleInvalidIcon(value)
        },
    },

    created() {
        if (IconUtils.isValidName(this.icon)) this.handleValidIcon(this.icon)
        else this.handleInvalidIcon(this.icon)
    },

    methods: {
        /**
         * Sets the icon category and name for invalid icon names.
         * @param iconName The icon name.
         */
        handleInvalidIcon(iconName: string): void {
            const message = `<slds-svg> Invalid icon name ${iconName}`
            console.warn(message)

            this.category = defaultCategory
            this.name = defaultName
        },

        /**
         * Sets the icon category and name for valid icon names.
         * @param iconName The icon name.
         */
        handleValidIcon(iconName: string): void {
            this.category = IconUtils.getCategory(iconName)
            this.name = IconUtils.getName(iconName)
        },
    },
})
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
    border-radius: .25rem;

    &.slds-icon_small {
        padding: 4px;
    }

    &.slds-icon_medium {
        padding: 6px;
    }

    &.slds-icon_large {
        padding: 8px;
    }
}
</style>
