<!--
    @Description: A Menu offers a list of actions or functions that a user can access.
    @Documentation: https://www.lightningdesignsystem.com/components/menus/
-->

<template>
    <div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

        <!-- Button -->
        <slds-button-icon icon-name="utility:down"
                          :size="size"
                          @click="toggle"
                          @blur="close"
                          @keyup="keyUp"/>

        <!-- Items -->
        <transition enter-active-class="animated fadeIn quicker" leave-active-class="animated fadeOut quicker">
            <div v-if="isOpen"
                 class="slds-dropdown"
                 :class="[`slds-dropdown_${position}`, `slds-dropdown_${orientation}`, `slds-dropdown_length-${length}`]">
                <ul class="slds-dropdown__list" role="menu">

                    <template v-for="item in items">

                        <!-- Heading -->
                        <li :key="item.name" v-if="item.type === 'heading'" class="slds-dropdown__header slds-truncate" :title="item.label" role="separator">
                            <span>
                                {{ item.label }}
                            </span>
                        </li>

                        <!-- Separator -->
                        <li :key="item.name" v-else-if="item.type === 'separator'" class="slds-has-divider_top-space" role="separator"></li>

                        <!-- Item -->
                        <li :key="item.name" v-else class="slds-dropdown__item" role="presentation">
                            <a role="menuitem" tabindex="0">
                                <span class="slds-truncate" :title="item.label">
                                    <slds-svg v-if="item.leftIcon !== undefined"
                                              :icon-name="`${item.leftIcon.category}:${item.leftIcon.name}`"
                                              class="slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_x-small"/>
                                    {{ item.label }}
                                </span>
                                <slds-svg v-if="item.rightIcon !== undefined"
                                          :icon-name="`${item.rightIcon.category}:${item.rightIcon.name}`"
                                          class="slds-icon slds-icon_x-small slds-icon-text-default slds-m-left_small slds-shrink-none"/>
                            </a>
                        </li>

                    </template>

                </ul>
            </div>
        </transition>

    </div>
</template>

<script>
    export default {
        props: {
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
        }
    }
</script>

<style scoped lang="scss">

</style>