<template>
    <div class="slds-button-group">

        <slds-button-icon icon-name="utility:chevronleft"
                          :disabled="isInFirstPage"
                          @click.stop="onClickPreviousPage"/>

        <slds-button v-for="page in pages"
                     :key="page.index"
                     :label="`${page.index}`"
                     :variant="buttonVariant(page.index)"
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
        data() {
            return {
                ellipsisStyle: 'padding-left: 12px;padding-right: 12px;',
            }
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

                for (let i = this.startPage; i <= this.endPage; i += 1) {
                    pages.push({index: i, disabled: i === this.currentPage});
                }

                return pages;
            },
            startPage() {
                if (this.currentPage === 1) return 1;

                if (this.currentPage === this.totalPages) {
                    return this.totalPages - this.range + 1;
                }

                return this.currentPage - 1;
            },
        },
        methods: {
            onClickPreviousPage() {
                this.$emit('pagechanged', this.currentPage - 1);
            },
            onClickPage(page) {
                if (page.disabled) return;
                this.$emit('pagechanged', page.index);
            },
            onClickNextPage() {
                this.$emit('pagechanged', this.currentPage + 1);
            },
            buttonVariant(index) {
                if (index === this.currentPage) return 'brand';
                return 'neutral';
            },
        }
    }
</script>