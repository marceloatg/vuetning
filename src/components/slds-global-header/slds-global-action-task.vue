<template>
    <li class="slds-global-actions__item">
        <slds-global-action
            :icon="icon"
            assistive-text="Global Actions"
        />
    </li>
</template>

<script>
import SldsGlobalAction from './slds-global-action'

export default {
    name: 'SldsGlobalActionTask',

    components: {
        SldsGlobalAction
    },

    props: {
        icon: {
            type: String,
            default: 'utility:add',
        }
    },
}
</script>
