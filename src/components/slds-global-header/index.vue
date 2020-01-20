<template>
    <header class="slds-global-header_container">
        <div class="slds-global-header slds-grid slds-grid_align-spread">

            <!-- Logo -->
            <div class="slds-global-header__item">
                <div class="slds-global-header__logo">
                    <div v-if="name" class="slds-global-header__name">
                        <span>{{ name }}</span>
                    </div>
                </div>
            </div>

            <!-- Search bar -->
            <div/>

            <!-- Actions -->
            <div class="slds-global-header__item">
                <slot name="actions"/>
            </div>

        </div>
    </header>
</template>

<script>
    export default {
        name: 'SldsGlobalHeader',
        props: {
            name: {
                type: String,
                default: null,
                note: 'Name of application'
            },
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
