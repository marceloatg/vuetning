<template>
    <div class="slds-docked-form-footer">

        <slds-button-icon
            v-if="hasError"
            error
            large
            icon="utility:error"
        />

        <slds-button
            neutral
            label="Cancel"
            @click="onClickCancel"
        />

        <slds-button
            brand
            label="Save"
            @click="onClickSave"
        />

    </div>
</template>

<script>
export default {
    name: 'SldsDockedFormFooter',

    props: {
        /**
         * @description If present, the docked form footer is shown with an error icon on the left of the label.
         * @type {boolean}
         */
        hasError: Boolean,
    },

    methods: {
        /**
         * @description Fires a cancel event when the cancel button is clicked.
         */
        onClickCancel() {
            this.$emit('cancel')
        },

        /**
         * @description Fires a save event when the save button is clicked.
         */
        onClickSave() {
            this.$emit('save')
        }
    }
}
</script>
