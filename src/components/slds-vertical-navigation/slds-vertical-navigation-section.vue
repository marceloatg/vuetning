<template>
    <div class="slds-nav-vertical__section">

        <!-- Title -->
        <h2 v-if="title" class="slds-nav-vertical__title">
            {{ title }}
        </h2>

        <!-- Items -->
        <ul>
            <slot/>
        </ul>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsVerticalNavigationSection",

    props: {
        /**
         * Section title.
         */
        title: String,
    },
})
</script>
