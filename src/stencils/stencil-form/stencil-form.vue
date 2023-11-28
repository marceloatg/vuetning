<template>
    <div class="forcePlaceholder" :style="{height}">
        <div class="placeholder detail ">

            <!-- Single column -->
            <div v-if="singleColumn">
                <div v-for="i in rows" :key="i" class="field border-bottom">
                    <div class="text text-primary text-shorter text-thin"/>
                    <div class="text text-secondary text-medium text-thin"/>
                </div>
            </div>

            <div v-else>

                <!-- Left column -->
                <div class="left-column">
                    <div v-for="i in rows" :key="i" class="field border-bottom">
                        <div class="text text-primary text-shorter text-thin"/>
                        <div class="text text-secondary text-medium text-thin"/>
                    </div>
                </div>

                <!-- Right column -->
                <div class="right-column">
                    <div v-for="i in rows" :key="i" class="field border-bottom">
                        <div class="text text-primary text-shorter text-thin"/>
                        <div class="text text-secondary text-medium text-thin"/>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "StencilForm",

    props: {
        /**
         * Number of rows in the form.
         */
        rows: { type: Number, default: 6 },

        /**
         * Indicates whether this form is single column.
         */
        singleColumn: { type: Boolean, default: false },
    },

    computed: {
        height(): string {
            const ROW_HEIGHT = 77
            return `${this.rows * ROW_HEIGHT}px`
        },
    },
})
</script>

<style scoped lang="scss">

.field {
    margin-top: -1px;
}

</style>
