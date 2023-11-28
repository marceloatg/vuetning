<template>
    <dl class="slds-list_horizontal slds-wrap">

        <dt class="slds-item_label slds-text-color_weak slds-truncate" :title="label">
            {{ label }}
        </dt>

        <dd class="slds-item_detail slds-truncate" :title="detail">
            {{ detail }}
        </dd>

    </dl>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsTileItem",

    props: {
        /**
         * The text detail that displays in the tile item.
         */
        detail: String,

        /**
         * The text label that displays in the tile item.
         */
        label: String,
    },
})
</script>
