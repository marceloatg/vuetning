<template>
    <div>

        <!-- Modal -->
        <section role="dialog" tabindex="-1" class="slds-modal slds-fade-in-open">
            <div class="slds-modal__container">

                <!-- Header -->
                <header class="slds-modal__header">

                    <!-- Close button -->
                    <slds-button-icon
                        icon-name="utility:close"
                        container="none"
                        variant="inverse"
                        size="large"
                        title="close"
                        class="slds-modal__close"/>

                    <!-- Heading -->
                    <h2 class="slds-text-heading_medium slds-hyphenate">
                        Modal Header
                    </h2>

                </header>

                <!-- Body -->
                <div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">
                    <p>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
                        veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud
                        elit officia tempor esse quis. Cillum sunt ad dolore
                        quis aute consequat ipsum magna exercitation reprehenderit magna. Tempor cupidatat consequat
                        elit dolor adipisicing.</p>
                    <p>Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit officia. Lorem aliqua enim
                        laboris do dolor eiusmod officia. Mollit incididunt nisi consectetur esse laborum eiusmod
                        pariatur proident. Eiusmod et adipisicing culpa deserunt nostrud
                        ad veniam nulla aute est. Labore esse esse cupidatat amet velit id elit consequat minim ullamco
                        mollit enim excepteur ea.</p>
                </div>

                <!-- Footer -->
                <footer class="slds-modal__footer">

                    <slds-button label="Cancel"/>

                    <slds-button label="Save" variant="brand"/>

                </footer>

            </div>
        </section>

        <!-- Backdrop -->
        <div class="slds-backdrop slds-backdrop_open"/>

    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss">
    .slds-backdrop_open {
        pointer-events: none;
    }
</style>