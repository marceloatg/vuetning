<template>
    <li class="slds-global-actions__item">
        <slds-global-action
            icon="utility:question"
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
    }
}
</script>
