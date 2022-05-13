<template>
    <li role="presentation" class="slds-listbox__item">
        <div
            class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline"
            role="option"
        >
            <span class="slds-media__body">
                <span class="slds-truncate" :title="label">
                    {{ label }}
                </span>
            </span>
        </div>
    </li>
</template>

<script>
export default {
    name: 'SldsDuelingPicklistOption',

    props: {
        /**
         * @description Option label.
         * @type {array}
         */
        label: {type: String, required: true},
    },
}
</script>
