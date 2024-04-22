<template>
    <example-container class="slds-m-top_medium" height="6rem">

        <slds-spinner v-if="showCase" brand/>

        <slds-spinner v-else-if="base"/>

    </example-container>
</template>

<script lang="ts">
import ExampleContainer from "./example-container.vue"
import SldsSpinner from "../../src/components/slds-spinner/slds-spinner.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "spinner-example",

    components: {
        ExampleContainer,
        SldsSpinner,
    },

    props: {
        base: Boolean,
        showCase: Boolean,
    },
})
</script>
