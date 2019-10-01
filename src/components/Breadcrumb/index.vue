<template>
    <nav role="navigation">
        <ol class="slds-breadcrumb slds-list_horizontal slds-wrap slds-grid_vertical-align-center">
            <li v-if="menuItems.length > 0" class="slds-breadcrumb__item">
                <div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">
                    <slds-button-icon
                        icon-name="utility:threedots"
                        size="x-small"
                        container="bordered-filled"
                        @click="toggleDropdown"/>
                    <div v-if="isDropdownActive" v-on-clickaway="away" class="slds-dropdown slds-dropdown_left slds-dropdown_actions">
                        <ul class="slds-dropdown__list" role="menu">
                            <li
                                v-for="item in menuItems"
                                :key="item.id"
                                class="slds-dropdown__item"
                                role="presentation">
                                <a role="menuitem" @click="onClick(item)">
                                    <span class="slds-truncate" :title="item.label">{{ item.label }}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
            <li v-for="item in visibleItems" :key="item.id" class="slds-breadcrumb__item">
                <a class="slds-text-color_weak" @click="onClick(item)">
                    {{ item.label }}
                </a>
            </li>
        </ol>
    </nav>
</template>

<script>
    import {mixin as clickaway} from 'vue-clickaway'

    export default {
        mixins: [
            clickaway
        ],
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                isDropdownActive: false,
            }
        },
        computed: {
            visibleItems() {
                let items = [];

                if (this.items.length > 2) {
                    items.push(this.items[this.items.length - 2]);
                    items.push(this.items[this.items.length - 1]);

                    return items;
                } else {
                    return this.items;
                }
            },
            menuItems() {
                let items = [];

                if (this.items.length > 2) {
                    for (let i = 0; i < this.items.length - 2; i++) {
                        items.push(this.items[i]);
                    }
                }

                return items;
            },
        },
        methods: {
            away() {
                this.isDropdownActive = false;
            },
            onClick(item) {
                this.$emit('click', item.href);
            },
            toggleDropdown() {
                this.isDropdownActive = !this.isDropdownActive;
            }
        },
    }
</script>

<style scoped lang="scss">
    .slds-breadcrumb .slds-list__item:before,
    .slds-breadcrumb__item:before {
        top: -.225rem;
    }

    a {
        line-height: 13px;
    }
</style>
