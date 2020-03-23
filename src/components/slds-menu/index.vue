<template>
    <div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

        <!-- Button -->
        <slds-button-icon
            bordered-filled
            :icon="icon"
            :has-dropdown="icon !== 'utility:down'"
            :disabled="disabled"
            :small="small"
            :x-mall="xSmall"
            :xx-mall="xxSmall"
            @click="toggle"
            @blur="close"
            @keyup="keyUp"/>

        <!-- Items -->
        <div
            v-if="isOpen"
            ref="dropdown"
            class="slds-dropdown"
            :class="[`slds-dropdown_${position}`, `slds-dropdown_${orientation}`, `slds-dropdown_length-${length}`]"
            :style="{opacity: dropdownOpacity}">
            <ul class="slds-dropdown__list" role="menu">
                <template v-for="(item, index) in items">

                    <slds-menu-heading
                        v-if="item.heading != null"
                        :key="index"
                        :heading="item.heading"/>

                    <slds-menu-option
                        v-else
                        :key="item.value"
                        :disabled="item.disabled"
                        :icon="item.icon"
                        :label="item.label"
                        :prefix-icon="item.prefixIcon"
                        :value="item.value"
                        @click="onClick"/>

                </template>
            </ul>
        </div>

    </div>
</template>

<script>
    import SldsMenuHeading from "./heading";
    import SldsMenuOption from "./option";

    export default {
        name: 'SldsMenu',
        components: {
            SldsMenuHeading,
            SldsMenuOption
        },
        props: {
            disabled: {
                type: Boolean,
            },
            icon: {
                type: String,
                default: 'utility:down',
            },
            items: {
                type: Array,
                default: () => [],
            },
            length: {
                type: Number,
                note: 'Dropdown position. Check the validator for available options.',
                validator(value) {
                    return [5, 7, 10].indexOf(value) !== -1
                }
            },
            small: {
                type: Boolean,
            },
            xSmall: {
                type: Boolean,
            },
            xxSmall: {
                type: Boolean,
            },
        },
        data() {
            return {
                dropdownOpacity: 0,
                isOpen: false,
                orientation: 'top',
                position: 'left',
            }
        },
        watch: {
            async isOpen(opened) {
                if (!opened) return;
                await this.$nextTick();

                let dropdown = this.$refs["dropdown"];
                const positioning = this.getDropdownPositioning(dropdown);

                // Setting horizontal position of dropdown
                if (positioning.element.x + positioning.element.width > positioning.parent.width) {
                    this.position = 'right';
                }

                // Setting vertical orientation of dropdown
                if (positioning.element.y + positioning.element.height > positioning.parent.height) {
                    this.orientation = 'bottom';
                }

                this.dropdownOpacity = 1;
            },
        },
        methods: {
            close() {
                this.isOpen = false;
            },
            keyUp(event) {
                switch (event.key) {

                    case 'Escape':
                        this.isOpen = false;
                        break;
                }
            },
            getDropdownPositioning(element) {
                const elementPositioning = {
                    x: 0,
                    y: 0,
                    height: element.offsetHeight,
                    width: element.offsetWidth,
                };

                const parentPositioning = {
                    x: 0,
                    y: 0,
                    height: 0,
                    width: 0,
                };

                while (element.offsetParent !== null) {
                    elementPositioning.x += element.offsetLeft;
                    elementPositioning.y += element.offsetTop;
                    element = element.offsetParent;

                    if (element !== null) {
                        parentPositioning.x = element.offsetLeft;
                        parentPositioning.y = element.offsetTop;
                        parentPositioning.height = element.offsetHeight;
                        parentPositioning.width = element.offsetWidth;
                    }
                }

                return {
                    element: elementPositioning,
                    parent: parentPositioning
                };
            },
            onClick(value) {
                this.$emit('click', value);
            },
            toggle() {
                if (this.disabled) return;
                this.isOpen = !this.isOpen;
            },
        }
    }
</script>
