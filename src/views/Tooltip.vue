<template>
    <article class="slds-card">

        <!-- Header -->
        <div class="slds-card__header slds-grid">
            <header class="slds-media slds-media_center slds-has-flexi-truncate">

                <!-- Figure -->
                <div class="slds-media__figure">
                    <span class="slds-icon_container slds-icon-standard-actions-and-buttons">
                        <svg class="slds-icon slds-icon_small">
                            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#actions_and_buttons"/>
                        </svg>
                    </span>
                </div>

                <!-- Title -->
                <div class="slds-media__body">
                    <h2 class="slds-card__header-title">
                        <span class="slds-card__header-link slds-truncate" title="Tooltips">
                            <span>Tooltips</span>
                        </span>
                    </h2>
                </div>

            </header>
        </div>

        <!-- Body -->
        <div class="slds-card__body slds-card__body_inner">

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Base
            </h2>

            <slds-tooltip top-left-nubbin>

                <template #trigger>
                    <a class="slds-tooltip-trigger_hover">
                        <span class="slds-icon_container slds-icon-utility-info">
                            <svg class="slds-icon slds-icon slds-icon_xx-small slds-icon-text-default">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"/>
                            </svg>
                        </span>
                    </a>
                </template>

                Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                aute id consequat veniam incididunt duis in sint irure nisi.

                <div class="slds-m-top_x-small" aria-hidden="true">Click
                    <span class="slds-icon_container slds-icon-utility-info" title="Help">
                        <svg class="slds-icon slds-icon slds-icon_xx-small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"/>
                        </svg>
                        <span class="slds-assistive-text">Help</span>
                    </span> to learn more.
                </div>

            </slds-tooltip>

            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>

            <slds-tooltip left-nubbin>

                <template #trigger>
                    <button class="slds-button slds-button_neutral slds-tooltip-trigger_click" style="height: 250px">
                        Button
                    </button>
                </template>

                Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                aute id consequat veniam incididunt duis in sint irure nisi.

                <div class="slds-m-top_x-small" aria-hidden="true">Click
                    <span class="slds-icon_container slds-icon-utility-info" title="Help">
                        <svg class="slds-icon slds-icon slds-icon_xx-small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"/>
                        </svg>
                        <span class="slds-assistive-text">Help</span>
                    </span> to learn more.
                </div>

            </slds-tooltip>

            <br>

            <!--
                        <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                            Placement
                        </h2>

                        <slds-tooltip left class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>

                        <slds-tooltip left-top class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>

                        <slds-tooltip left-bottom class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>

                        <br>

                        <slds-tooltip top class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>

                        <slds-tooltip top-left class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>

                        <slds-tooltip top-right class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>

                        <br>

                        <slds-tooltip right class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>

                        <slds-tooltip right-top class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>

                        <slds-tooltip right-bottom class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>

                        <br>

                        <slds-tooltip bottom class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>

                        <slds-tooltip bottom-left class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>

                        <slds-tooltip bottom-right class="slds-m-around_medium">
                            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                            aute id consequat veniam incididunt duis in sint irure nisi.
                        </slds-tooltip>
            -->
        </div>

    </article>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            onBlur() {
                console.log('blur')
            }
        },
    }
</script>
