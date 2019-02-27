<template>
    <header class="slds-modal__header" :class="[{'slds-modal__header_empty': headerEmpty}]">

        <!-- Close button -->
        <slds-button-icon
            icon-name="utility:close"
            container="none"
            variant="inverse"
            size="large"
            title="close"
            class="slds-modal__close"/>

        <!-- Heading -->
        <h2 v-if="!headerEmpty" class="slds-text-heading_medium slds-hyphenate">
            {{heading}}
        </h2>

        <!-- Tagline -->
        <slot v-if="!headerEmpty" name="tagline"/>

    </header>

</template>

<script>
    export default {
        props: {
            headerEmpty: {
                type: Boolean,
                required: true,
            },
            heading: {
                type: String,
                required: true,
            }
        },
    }
</script>