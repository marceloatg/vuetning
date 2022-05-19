<template>
    <dl class="slds-list_horizontal slds-wrap">

        <dt class="slds-item_label slds-text-color_weak slds-truncate">
            {{ label }}
        </dt>

        <dd class="slds-item_detail slds-truncate">
            {{ detail }}
        </dd>

    </dl>
</template>

<script>
export default {
    name: 'SldsTileItem',

    props: {
        /**
         * @description The text detail that displays in the tile item.
         * @type {string}
         */
        detail: String,

        /**
         * @description The text label that displays in the tile item.
         * @type {string}
         */
        label: String,
    }
}
</script>
