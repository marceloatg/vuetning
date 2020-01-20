<template>
    <div class="slds-button-group">

        <slds-button-icon
            icon="utility:chevronleft"
            :disabled="isInFirstPage || disabled"
            @click.stop="onClickPreviousPage"/>

        <template v-for="page in pages">
            <slds-button
                v-if="page !== 0"
                :key="page"
                :label="`${page}`"
                :class="buttonVariant(page)"
                :style="{padding: '0 12px'}"
                :disabled="disabled"
                @click="onClickPage(page)"/>
        </template>

        <slds-button-icon
            icon="utility:chevronright"
            :disabled="isInLastPage || disabled"
            @click="onClickNextPage"/>

    </div>
</template>

<script>
    export default {
        name: 'SldsPagination',
        props: {
            currentPage: {
                type: Number,
                required: true
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            range: {
                type: Number,
                default: 3,
            },
            totalPages: {
                type: Number,
                required: true,
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
                if (page === this.currentPage) return 'slds-button_brand';
                return 'slds-button_neutral';
            },
        }
    }
</script>
