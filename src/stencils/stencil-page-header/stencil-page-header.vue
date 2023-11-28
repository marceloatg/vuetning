<template>
    <div class="placeholder record_home_anchor">
        <div class="body dark" :class="{'has-details': hasDetails}">

            <!-- Icon  -->
            <div class="icon icon-medium"/>

            <!-- Text -->
            <div class="text-body">
                <div class="text text-thick text-medium"/>
            </div>

            <div v-if="hasDetails" class="below-text-body">

                <div class="text-body">
                    <div class="text text-long"/>
                    <div class="multi-text-line">
                        <div class="text text-medium"/>
                        <div class="text text-tiny"/>
                    </div>
                </div>

                <div class="text-body">
                    <div class="text text-long"/>
                    <div class="multi-text-line">
                        <div class="text text-medium"/>
                        <div class="text text-tiny"/>
                    </div>
                </div>

                <div class="text-body">
                    <div class="text text-long"/>
                    <div class="multi-text-line">
                        <div class="text text-medium"/>
                        <div class="text text-tiny"/>
                    </div>
                </div>

                <div class="text-body">
                    <div class="text text-long"/>
                    <div class="multi-text-line">
                        <div class="text text-medium"/>
                        <div class="text text-tiny"/>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "StencilPageHeader",

    props: {
        /**
         * Indicates whether this view has details on the page header.
         */
        hasDetails: Boolean,
    },
})
</script>

<style scoped lang="scss">

.placeholder.record_home_anchor {
    border-radius: .25rem;

    .body {
        height: 76px;
        padding: 1rem 1rem 0;
        border-radius: .25rem;

        &.has-details {
            height: 134px;
        }

        .below-text-body {
            margin: .75rem -1rem -.25rem !important;
            padding: 1.125rem 1rem .25rem;
            border-bottom-left-radius: .25rem;
            border-bottom-right-radius: .25rem;
        }
    }
}

</style>
