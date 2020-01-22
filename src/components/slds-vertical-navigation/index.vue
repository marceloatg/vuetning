<template>
    <nav class="slds-nav-vertical" :class="{'slds-nav-vertical_shade': shaded}">

        <!-- Quickfind -->
        <div v-if="hasQuickfind" class="slds-form-element slds-p-horizontal_large slds-p-top_large">
            <slds-input v-model="filter" icon="utility:search" placeholder="Quick Find"/>
        </div>

        <!-- Section -->
        <div v-for="section in sections" :key="section.key" class="slds-nav-vertical__section">

            <!-- Header -->
            <h2 v-if="section.heading" class="slds-nav-vertical__title">
                {{ section.heading }}
            </h2>

            <!-- Items -->
            <ul>
                <li
                    v-for="item in section.items"
                    :key="item.key"
                    class="slds-nav-vertical__item"
                    :class="{'slds-is-active': isActive(item.key)}">

                    <a class="slds-nav-vertical__action" @click="onClick(item)">
                        <slds-icon v-if="item.icon" :icon="item.icon" x-small class="slds-line-height_reset slds-m-right_x-small"/>
                        {{ item.label }}
                    </a>

                </li>
            </ul>

        </div>

    </nav>
</template>

<script>
    export default {
        name: 'SldsVerticalNavigation',
        props: {
            activeItem: {},
            hasQuickfind: {
                type: Boolean,
            },
            sections: {
                type: Array,
                required: true,
            },
            shaded: {
                type: Boolean,
            },
        },
        data() {
            return {
                filter: null,
            }
        },
        methods: {
            isActive(key) {
                if (this.activeItem == null) return false;
                return this.activeItem === key;
            },
            onClick(item) {
                this.$emit('click', item);
            },
        },
    }
</script>
