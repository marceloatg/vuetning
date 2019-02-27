<template>
    <div class="empty-content">
        <div class="slds-text-longform">
            <h3 class="slds-text-heading_medium">
                {{ heading }}
            </h3>
            <p class="slds-text-body_regular">
                {{ message }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            heading: {
                type: String,
                required: false
            },
            message: {
                type: String,
                required: true
            }
        }
    }
</script>
