<template>
    <header class="slds-global-header_container">
        <div class="slds-global-header slds-grid slds-grid_align-spread">
            <div class="slds-global-header__item">
                <div class="slds-grid slds-grid_vertical-align-center">
                    <div class="slds-col">
                        <img v-if="brandLogo" :src="brandLogo" alt="logo" :width="`${brandLogoWidth}px`" :height="`${brandLogoHeight}px`">
                        <div v-else>
                            <slot name="brand-logo"/>
                        </div>
                    </div>
                    <div class="slds-col" style="white-space:nowrap;">
                        {{ brandName }}
                    </div>
                </div>
            </div>
            <div class="slds-global-header__item slds-global-header__item_search">
                <slot name="search-bar"/>
            </div>
            <div class="slds-global-header__item">
                <ul class="slds-global-actions">
                    <slot name="global-actions"/>
                    <slds-global-action v-if="setupButton" icon="utility:setup" @click="onClickSetup"/>
                    <slds-global-action v-if="notificationButton" icon="utility:notification" @click="onClickNotification"/>
                    <li v-if="profileButton" class="slds-global-actions__item" @click="onClickProfile">
                        <div class="slds-dropdown-trigger slds-dropdown-trigger_click">
                            <slds-avatar medium circle :src="profilePicture" class="slds-global-actions__avatar slds-global-actions__item-action"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
    import SldsAvatar from '../slds-avatar/index.vue'
    import SldsGlobalAction from '../slds-global-action/index.vue'
    export default {
        name: 'SldsGlobalHeader',
        components:{
            SldsAvatar,
            SldsGlobalAction
        },
        props: {
            brandName: {
                type: String,
            },
            brandLogo:{
                type: String
            },
            brandLogoWidth:{
                type: Number,
                default: 35
            },
            brandLogoHeight:{
                type: Number,
                default: 35
            },
            setupButton:{
                type: Boolean,
                default: false,
            },
            notificationButton:{
                type: Boolean,
                default: false,
            },
            profileButton: {
                type: Boolean,
                default: false,
            },
            profilePicture:{
                type: String
            }
        },
        methods:{
            onClickSetup(){
                this.$emit('setup')
            },
            onClickNotification(){
                this.$emit('notification')
            },
            onClickProfile(){
                this.$emit('profile')
            }
        }
    }
</script>

<style scoped lang="scss">
    .slds-global-header_container {
        position: static;

        .slds-global-header {
            .slds-global-header__name {
                padding-left: 48px;
                font-size: 22px;
                line-height: 40px;
            }
        }
    }
</style>
