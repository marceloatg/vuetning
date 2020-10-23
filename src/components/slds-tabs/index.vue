<template>
    <div class="slds-tabs_default">

        <ul class="slds-tabs_default__nav" role="tablist">

            <!-- Tabs -->
            <li
                v-for="item in items"
                :key="item.key"
                :title="item.label"
                class="slds-tabs_default__item"
                :class="{'slds-is-active': activeItem === item.key}"
                role="presentation"
                @click="$emit('click', item.key)">

                <a
                    :id="`tab-default-${item.key}__item`"
                    class="slds-tabs_default__link"
                    role="tab"
                    tabindex="0">

                    <span v-if="item.icon" class="slds-tabs__left-icon">
                        <slds-icon small :icon="item.icon"/>
                    </span>

                    {{ item.label }}

                    <span v-if="item.error" class="slds-tabs__right-icon">
                        <span class="slds-icon_container slds-icon-utility-error" title="This item has an error">
                            <slds-icon x-small error icon="utility:error"/>
                        </span>
                    </span>

                </a>

            </li>

            <!-- Overflow -->
            <!-- TBD -->

        </ul>

        <!-- Content -->
        <div v-if="!noContent">
            <div
                v-for="item in items"
                :id="`tab-default-${item.key}`"
                :key="item.key"
                class="slds-tabs_default__content"
                :class="[(activeItem === item.key) ? 'slds-show' : 'slds-hide']"
                role="tabpanel">

                <slot :name="item.key"/>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "SldsTabs",
        props: {
            activeItem: {
                required: true,
            },
            items: {
                type: Array,
                required: true,
            },
            noContent: Boolean,
        },
    }
</script>

<style scoped lang="scss">
    li {
        cursor: pointer;
    }
</style>
