<template>
    <div class="slds-tabs_scoped">

        <ul class="slds-tabs_scoped__nav" role="tablist">

            <!-- Tabs -->
            <li
                v-for="item in items"
                :key="item.key"
                :title="item.label"
                class="slds-tabs_scoped__item"
                :class="{'slds-is-active': activeItem === item.key}"
                role="presentation"
                @click="$emit('click', item.key)">

                <a
                    :id="`tab-scoped-${item.key}__item`"
                    :aria-selected="activeItem === item.key"
                    class="slds-tabs_scoped__link"
                    role="tab"
                    tabindex="0">
                    {{ item.label }}
                </a>

            </li>

            <!-- Overflow -->
            <!-- TBD -->

        </ul>

        <!-- Content -->
        <div
            v-for="item in items"
            :id="`tab-scoped-${item.key}`"
            :key="item.key"
            class="slds-tabs_scoped__content"
            :class="[(activeItem === item.key) ? 'slds-show' : 'slds-hide']"
            role="tabpanel">

            <slot :name="item.key"/>

        </div>

    </div>
</template>

<script>
    export default {
        name: "SldsScopedTabs",
        props: {
            activeItem: {
                required: true,
            },
            items: {
                type: Array,
                required: true,
            }
        },
    }
</script>
