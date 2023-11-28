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

<!--suppress JSValidateTypes -->
<script>

export default {
    name: "PlaceholderDataTable",
}
</script>
