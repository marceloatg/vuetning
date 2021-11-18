<template>
    <li class="slds-global-actions__item">
        <slds-global-action
            :icon="icon"
            assistive-text="Setup"
            @click="onClick"
        />
    </li>
</template>

<script>
import SldsGlobalAction from './slds-global-action'

export default {
    name: 'SldsGlobalActionSetup',

    components: {
        SldsGlobalAction
    },

    props: {
        icon: {
            type: String,
            default: 'utility:setup',
        }
    },

    methods: {
        onClick() {
            this.$emit('click')
        },
    },
}
</script>
