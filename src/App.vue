<template>
    <div class="v-viewport">

        <slds-global-header/>

        <slds-global-navigation app-name="Vuetning" :tabs="[]"/>

        <div class="v-global-content slds-grid">

            <div class="slds-col slds-grow-none">
                <app-navigation/>
            </div>

            <div class="slds-col ">

                <slds-brand-band
                    start-color="rgb(49,135,96)"
                    end-color="rgb(150,217,187)"
                />

                <div class="slds-grid slds-gutters_direct slds-p-around_small" style="height: 100%">

                    <div class="slds-col slds-scrollable_y">
                        <router-view/>
                    </div>

                    <div class="slds-col slds-grow-none" style="min-width: 266px;">

                        <div class="v-add">
                            <img src="https://via.placeholder.com/240x118/FFFFFF.png?text=Add" alt="add">
                        </div>

                        <slds-card title="Contents" class="slds-m-top_medium">
                            <p>
                                Lorem ipsum
                            </p>
                            <p>
                                Lorem ipsum
                            </p>
                            <p>
                                Lorem ipsum
                            </p>
                            <p>
                                Lorem ipsum
                            </p>
                            <p>
                                Lorem ipsum
                            </p>
                        </slds-card>

                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>
import AppNavigation from './AppNavigation'

export default {
    name: 'App',

    components: {
        AppNavigation
    },
}
</script>

<style lang="scss">

$header-height: 40px;
$navigation-height: 50px;

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.v-viewport {
    --header-height: 40px;
    --navigation-height: 50px;

    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1;
    background-color: rgb(150, 217, 187);
}

.v-global-content {
    position: relative;
    height: calc(100% - #{$header-height} - #{$navigation-height});
    width: 100%;
    overflow: hidden;
}

.v-add {
    background-color: rgb(255, 255, 255);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .1);
    border: 1px solid #dddbda;
    border-radius: .25rem;

    img {
        border-radius: .25rem;
    }
}

.slds-context-bar {
    border-bottom-color: rgba(0, 135, 124, 1);

    &__item {
        &:not(.slds-no-hover):hover {
            background-color: rgba(0, 135, 124, .1);
        }

        &.slds-is-active {
            background-color: rgba(0, 135, 124, .1);

            &:before {
                background: rgba(0, 135, 124, 1);
            }
        }
    }
}

@keyframes bkAnim {
    50% {
        background-color: #fff
    }
    100% {
        background-color: rgba(0, 135, 124, .1);
    }
}
</style>
