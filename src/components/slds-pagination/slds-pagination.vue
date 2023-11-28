<template>
    <div class="slds-button-group">

        <slds-button-icon
            bordered
            :disabled="isInFirstPage || disabled"
            icon-name="utility:chevronleft"
            @click.stop="handleClickPreviousPage"
        />

        <template v-for="page in pages" :key="page">
            <slds-button
                v-if="page !== 0"
                :class="buttonVariant(page)"
                :disabled="disabled"
                :label="page.toString()"
                @click="handleClickPage(page)"
            />
        </template>

        <slds-button-icon
            bordered
            :disabled="isInLastPage || disabled"
            icon-name="utility:chevronright"
            @click="handleClickNextPage"
        />

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import SldsButton from "../slds-button/slds-button.vue"
import { EVENTS } from "../../constants"

export default defineComponent ({
    name: "SldsPagination",

    components: { SldsButton, SldsButtonIcon },

    props: {
        currentPage: { type: Number, required: true },

        disabled: { type: Boolean, default: false },

        range: { type: Number, default: 3 },

        totalPages: { type: Number, required: true },
    },

    computed: {
        endPage(): number {
            return Math.min(this.startPage + this.range - 1, this.totalPages)
        },

        isInFirstPage(): boolean {
            return this.currentPage === 1
        },

        isInLastPage(): boolean {
            return this.currentPage === this.totalPages
        },

        pages(): number[] {
            const pages = []
            for (let i = this.startPage; i <= this.endPage; i += 1) pages.push(i)

            return pages
        },

        startPage(): number {
            const halfRange = Math.floor(this.range / 2)

            if (this.currentPage <= halfRange) return 1
            else if (this.currentPage >= this.totalPages - halfRange) return this.totalPages - this.range + 1
            else return this.currentPage - halfRange
        },
    },

    methods: {
        handleClickPreviousPage(): void {
            this.$emit(EVENTS.PAGE_CHANGED, this.currentPage - 1)
        },

        handleClickPage(page: number): void {
            if (page === this.currentPage) return

            this.$emit(EVENTS.PAGE_CHANGED, page)
        },

        handleClickNextPage(): void {
            this.$emit(EVENTS.PAGE_CHANGED, this.currentPage + 1)
        },

        buttonVariant(page: number): string {
            let classNames = "slds-p-horizontal_small"

            if (page === this.currentPage) classNames += " slds-button_brand"
            else classNames += " slds-button_neutral"

            return classNames
        },
    },
})
</script>

