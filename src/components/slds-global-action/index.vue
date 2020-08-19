<template>
    <li class="slds-global-actions__item">
        <div class="slds-dropdown-trigger slds-dropdown-trigger_click">
            <slds-button-icon
                :icon="icon"
                small
                bare
                class="slds-global-actions__item-action"
                aria-haspopup="true"
                :title="title"/>
        </div>
    </li>          
</template>

<script>
    import SldsButtonIcon from '../slds-button-icon/index.vue'
    export default {
        name: 'SldsGlobalAction',
        components:{
            SldsButtonIcon,
        },
        props: {
            icon:{
                type: String
            },
            title:{
                type: String
            }
        }
    }
</script>

<style></style>
