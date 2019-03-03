<template>
    <section
        class="slds-docked-composer slds-grid slds-grid_vertical slds-is-open"
        role="dialog"
        aria-labelledby="dialog-heading-id-1"
        aria-describedby="dialog-content-id-1">

        <!-- Header -->
        <header class="slds-docked-composer__header slds-grid slds-shrink-none">

            <!-- Heading -->
            <div class="slds-media slds-media_center slds-no-space">

                <!-- Figure -->
                <slds-icon
                    icon-name="utility:share_post"
                    class="slds-media__figure slds-m-right_x-small"
                    icon-class="slds-icon-text-default"
                    size="x-small"/>

                <!-- Text -->
                <div class="slds-media__body">
                    <h2 class="slds-truncate" title="Header">
                        Header
                    </h2>
                </div>

            </div>

            <!-- Actions -->
            <div class="slds-col_bump-left slds-shrink-none">

                <slds-button-icon icon-name="utility:minimize_window" container="none" title="Minimize window"/>

                <slds-button-icon icon-name="utility:expand_alt" container="none" title="Expand Composer"/>

                <slds-button-icon icon-name="utility:close" container="none" title="Close"/>

            </div>

        </header>

        <!-- Body -->
        <div class="slds-docked-composer__body">
            <div class="slds-align_absolute-center">
                Docked Composer Panel Body <br>
                This area consumes the feature
            </div>
        </div>

        <!-- Footer -->
        <footer class="slds-docked-composer__footer slds-shrink-none">
            <div class="slds-col_bump-left slds-text-align_right">
                <slds-button label="Action" variant="brand"/>
            </div>
        </footer>

    </section>
</template>

<script>
    export default {
        name: "Index"
    }
</script>
