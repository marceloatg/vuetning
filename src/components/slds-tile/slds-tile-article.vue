<template>
    <div>

        <p>{{ author }}</p>

        <ul class="slds-list_horizontal slds-has-dividers_right">
            <li v-for="(item, index) in items" :key="index" class="slds-item">
                {{ item }}
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsTileArticle",

    props: {
        /**
         * Article author name.
         */
        author: String,

        /**
         * List of items present in the article.
         */
        items: Array,
    },
})
</script>
