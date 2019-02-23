<template>
    <div class="slds-button-group">

        <slds-button-icon icon-name="utility:chevronleft"
                          :disabled="isInFirstPage"
                          @click.stop="onClickPreviousPage"/>

        <slds-button v-for="page in pages"
                     :key="page"
                     :label="`${page}`"
                     :variant="buttonVariant(page)"
                     @click="onClickPage(page)"/>

        <slds-button-icon icon-name="utility:chevronright"
                          :disabled="isInLastPage"
                          @click="onClickNextPage"/>

    </div>
</template>

<script>
    export default {
        props: {
            currentPage: {
                type: Number,
                required: true
            },
            range: {
                type: Number,
                default: 3
            },
            totalPages: {
                type: Number,
                required: true
            },
        },
        computed: {
            endPage() {
                return Math.min(this.startPage + this.range - 1, this.totalPages);
            },
            isInFirstPage() {
                return this.currentPage === 1;
            },
            isInLastPage() {
                return this.currentPage === this.totalPages;
            },
            pages() {
                const pages = [];
                for (let i = this.startPage; i <= this.endPage; i += 1) pages.push(i);
                return pages;
            },
            startPage() {
                if (this.currentPage === 1) return 1;
                if (this.currentPage === this.totalPages) return this.totalPages - this.range + 1;
                return this.currentPage - 1;
            },
        },
        methods: {
            onClickPreviousPage() {
                this.$emit('pagechanged', this.currentPage - 1);
            },
            onClickPage(page) {
                if (page === this.currentPage) return;
                this.$emit('pagechanged', page);
            },
            onClickNextPage() {
                this.$emit('pagechanged', this.currentPage + 1);
            },
            buttonVariant(page) {
                if (page === this.currentPage) return 'brand';
                return 'neutral';
            },
        }
    }
</script>