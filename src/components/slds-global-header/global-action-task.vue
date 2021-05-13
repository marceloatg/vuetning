<template>
    <li class="slds-global-actions__item">
        <slds-global-action
            icon="utility:add"
            assistive-text="Global Actions"
        />
    </li>
</template>

<script>
import SldsGlobalAction from './global-action'

export default {
    name: 'SldsGlobalActionTask',

    components: {
        SldsGlobalAction
    }
}
</script>
