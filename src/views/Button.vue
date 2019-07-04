<template>
    <article class="slds-card">
        <div class="slds-card__header slds-grid">

            <!-- Header -->
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
                        <span class="slds-card__header-link slds-truncate" title="Button">
                            <span>Button</span>
                        </span>
                    </h2>
                </div>

            </header>
        </div>

        <!-- Body -->
        <div class="slds-card__body slds-card__body_inner">
            <slds-button label="Button"/>
            <slds-button label="Neutral Button" neutral/>
            <slds-button label="Brand Button" brand/>
            <slds-button label="Outline Brand Button" outline-brand/>
            <slds-button label="Destructive Button" destructive/>
            <slds-button label="Text Destructive Button" text-destructive/>
            <slds-button label="Success Button" success/>

            <br>
            <br>

            <div style="background-color:#16325c;padding:0.5rem">
                <slds-button label="Inverse Button" inverse/>
            </div>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Disabled
            </h2>
            <p class="slds-text-body_regular slds-m-bottom_small">
                Use a disabled attribute when a button can’t be clicked. To create a disabled button, append the <b>disabled</b>
                attribute to the button.
            </p>

            <slds-button label="Button" disabled/>
            <slds-button label="Neutral Button" neutral disabled/>
            <slds-button label="Brand Button" brand disabled/>
            <slds-button label="Outline Brand Button" outline-brand disabled/>
            <slds-button label="Destructive Button" destructive disabled/>
            <slds-button label="Text Destructive Button" text-destructive disabled/>
            <slds-button label="Success Button" success disabled/>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                With Icons
            </h2>

            <slds-button label="Icon Button" icon="utility:download" neutral/>
            <slds-button
                label="Left Icon Button"
                icon="utility:download"
                left
                neutral/>
            <slds-button
                label="Right Icon Button"
                icon="utility:download"
                right
                neutral/>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                With spinner
            </h2>

            <slds-button label="Button" spinner/>
            <slds-button label="Neutral Button" neutral spinner/>
            <slds-button label="Brand Button" brand spinner/>
            <slds-button label="Outline Brand Button" outline-brand spinner/>
            <slds-button label="Destructive Button" destructive spinner/>
            <slds-button label="Text Destructive Button" text-destructive spinner/>
            <slds-button label="Success Button" success spinner/>

            <h2 class="slds-text-heading_large slds-m-top_large slds-m-bottom_small">
                Sizing
            </h2>
            <p class="slds-text-body_regular slds-m-bottom_small">
                To allow the button's width to take up the entire width available, append the <b>stretch</b> attribute
                to the button.
            </p>

            <slds-button label="Stretched Neutral Button" neutral stretch/>
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
