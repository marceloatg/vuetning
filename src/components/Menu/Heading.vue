<template>
    <li role="separator" class="slds-dropdown__header slds-truncate" :title="heading">
        <span>
            {{ heading }}
        </span>
    </li>
</template>

<script>
    export default {
        name: "SldsPicklistHeading",
        props: {
            heading: {
                type: String,
                required: true,
            },
        },
    }
</script>
