<template>
    <div class="slds-docked-form-footer">

        <slds-button-icon
            v-if="hasError"
            error
            large
            icon="utility:error"
        />

        <slot>

            <slds-button
                neutral
                :label="cancelButtonLabel"
                @click="onClickCancel"
            />

            <slds-button
                brand
                :label="saveButtonLabel"
                @click="onClickSave"
            />

        </slot>
    </div>
</template>

<script>
import SldsButton from '@/components/slds-button'
import SldsButtonIcon from '@/components/slds-button-icon'

export default {
    name: 'SldsDockedFormFooter',

    components: {
        SldsButton,
        SldsButtonIcon,
    },

    props: {
        /**
         * If present, the docked form footer is shown with an error icon on the left of the label.
         * @type {boolean}
         */
        hasError: Boolean,

        /**
         * The label of the cancel button.
         * @type {string}
         */
        cancelButtonLabel: {type: String, default: 'Cancel'},

        /**
         * The label of the save button.
         * @type {string}
         */
        saveButtonLabel: {type: String, default: 'Save'},
    },

    methods: {
        /**
         * Fires a cancel event when the cancel button is clicked.
         */
        onClickCancel() {
            this.$emit('cancel')
        },

        /**
         * Fires a save event when the save button is clicked.
         */
        onClickSave() {
            this.$emit('save')
        }
    }
}
</script>
