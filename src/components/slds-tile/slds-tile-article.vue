<template>
    <div>

        <p>{{ author }}</p>

        <ul class="slds-list_horizontal slds-has-dividers_right">
            <li
                v-for="item in items"
                :key="item"
                class="slds-item"
            >
                {{ item }}
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    name: 'SldsTileArticle',
    
    props: {
        /**
         * @description Article author name.
         * @type {string}
         */
        author: String,

        /**
         * @description List of items present in the article.
         * @type {string}
         */
        items: Array,
    }
}
</script>
