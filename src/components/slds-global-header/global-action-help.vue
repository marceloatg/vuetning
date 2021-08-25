<template>
    <li class="slds-global-actions__item">
        <slds-global-action
            :icon="icon"
            assistive-text="Help and Training"
        />
    </li>
</template>

<script>
import SldsGlobalAction from './global-action'

export default {
    name: 'SldsGlobalActionHelp',

    components: {
        SldsGlobalAction
    },

    props: {
        icon: {
            type: String,
            default: 'utility:question',
        }
    },
}
</script>
