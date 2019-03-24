<template>
    <div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

        <!-- Button -->
        <slds-button-icon
            :icon-name="iconName"
            :size="size"
            :disabled="disabled"
            @click="toggle"
            @blur="close"
            @keyup="keyUp"/>

        <!-- Items -->
        <div
            v-if="isOpen"
            class="slds-dropdown"
            :class="[`slds-dropdown_${position}`, `slds-dropdown_${orientation}`, `slds-dropdown_length-${length}`]">
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
                        :icon-name="item.iconName"
                        :label="item.label"
                        :prefix-icon-name="item.prefixIconName"
                        :value="item.value"
                        @click="onClick"/>

                </template>
            </ul>
        </div>

    </div>
</template>

<script>
    import SldsMenuHeading from "./Heading";
    import SldsMenuOption from "./Option";

    export default {
        components: {
            SldsMenuHeading,
            SldsMenuOption
        },
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            iconName: {
                type: String,
                default: 'utility:down',
            },
            items: {
                type: Array,
                default: () => [],
                note: 'Represents a list item in a menu.',
            },
            size: {
                type: String,
                default: 'medium',
                note: 'Button size. Check the validator for available options.',
                validator(value) {
                    return [
                        'xx-small',
                        'x-small',
                        'small',
                        'medium',
                    ].indexOf(value) !== -1
                }
            },
            length: {
                type: Number,
                note: 'Dropdown position. Check the validator for available options.',
                validator(value) {
                    return [5, 7, 10].indexOf(value) !== -1
                }
            },
            position: {
                type: String,
                default: 'left',
                note: 'Dropdown position. Check the validator for available options.',
                validator(value) {
                    return [
                        'left',
                        'right',
                    ].indexOf(value) !== -1
                }
            },
            orientation: {
                type: String,
                default: 'top',
                note: 'Dropdown orientation. Check the validator for available options.',
                validator(value) {
                    return [
                        'top',
                        'bottom',
                    ].indexOf(value) !== -1
                }
            },
        },
        data() {
            return {
                isOpen: false,
            }
        },
        mounted(){

        },
        methods: {
            toggle() {
                this.isOpen = !this.isOpen;
            },
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
            onClick(value) {
                this.$emit('click', value);
            },
        }
    }
</script>

<style scoped lang="scss">

</style>
