<template>
    <div class="slds-panel slds-panel_docked " :class="[ visibility, size, position ]" aria-hidden="false">
        <div v-if="hasHeader" class="slds-panel__header slds-panel__header_custom">
            <slot name="header"/>
        </div>
        <div v-else class="slds-panel__header" :class="{'slds-panel__header_align-center' : centerHeader }">
            <slds-button-icon v-if="backButton" icon="utility:back" class="slds-panel__back" small @click="onClickBack"/>
            <h2 class="slds-panel__header-title slds-text-heading_small slds-truncate" title="Panel Header Title">
                {{ title }}
            </h2>
            <slds-button-icon icon="utility:close" class="slds-panel__close" small @click="onClickClose"/>
        </div>
        <div class="slds-panel__body">
            <slot/>        
        </div>
    </div>
</template>

<script>
import SldsButtonIcon from '../slds-button-icon/index.vue'
export default {
    name: 'SldsPanel',
    components:{
        SldsButtonIcon
    },
    props:{
        title:{
            type: String,
            default: ""
        },
        right: {
            type: Boolean,
            default: false
        },
        left: {
            type: Boolean,
            default: false
        },
        centerHeader:{
            type: Boolean,
            default: false
        },
        backButton:{
            type: Boolean,
            default: false
        },
        small:{
            type: Boolean,
            default: false
        },
        medium:{
            type: Boolean,
            default: false
        },
        large:{
            type: Boolean,
            default: false
        },
        xLarge:{
            type: Boolean,
            default: false
        },
        full:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            isOpen: false,
        }
    },
    computed:{
        size(){
            if(this.small) return "slds-size_small";
            else if(this.medium) return "slds-size_medium";
            else if(this.large) return "slds-size_large";
            else if(this.xLarge)return "slds-size_x-large";
            else if(this.full) return "slds-size_full";
            else return "slds-size_small";
        },
        position(){
            return this.left ? 'slds-panel_docked-left' : 'slds-panel_docked-right'
        },
        hasHeader(){
            return this.$slots.header ? true : false;
        },
        visibility(){
            return this.isOpen ? 'slds-is-open' : 'slds-is-docked';
        }
    },
    methods:{
        show(){
            this.isOpen = true;
        },
        hide(){
            this.isOpen = false;
        },
        onClickBack(){
            this.hide();
            this.$emit('back')
        },
        onClickClose(){
            this.hide();
            this.$emit('close')
        }
    }
}
</script>

<style></style>
