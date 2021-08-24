<template>
    <li class="slds-global-actions__item">
        <slds-global-action
            :icon="icon"
            assistive-text="Setup"
        />
    </li>
</template>

<script>
import SldsGlobalAction from './global-action'

export default {
    name: 'SldsGlobalActionSetup',

    components: {
        SldsGlobalAction
    },

    props: {
        icon: {
            type: String,
            default: 'utility:setup',
            required: true,
        }
    },
}
</script>
