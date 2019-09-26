<template>
    <nav class="slds-nav-vertical">

        <!-- Quickfind -->
        <div v-if="hasQuickfind" class="slds-form-element slds-p-horizontal_large slds-p-top_large">
            <slds-input left-icon-name="utility:search" placeholder="Quick Find"/>
        </div>

        <!-- Section -->
        <div v-for="section in sections" :key="section.key" class="slds-nav-vertical__section">

            <!-- Header -->
            <h2 class="slds-nav-vertical__title">
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
                        {{ item.label }}
                    </a>

                </li>
            </ul>

        </div>

    </nav>
</template>

<script>
    export default {
        props: {
            activeItem: {},
            hasQuickfind: {
                type: Boolean,
                default: false,
            },
            sections: {
                type: Array,
                required: true,
            },
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