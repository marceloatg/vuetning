<template>
    <div class="forceListViewPlaceholder">
        <div v-for="n in 10" :key="n" class="forcePlaceholder">
            <div class="placeholder table_list_line_item" :class="`opacity${100 - 10*n}`">
                <div class="body border-bottom">
                    <div class="text-body-col">
                        <div class="text text-short"/>
                        <div class="text text-short"/>
                        <div class="text text-short"/>
                        <div class="text text-short"/>
                        <div class="text text-short"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "PlaceholderDataTable",
})
</script>
