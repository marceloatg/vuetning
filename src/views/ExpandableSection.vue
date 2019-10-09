<template>

    <!-- Content -->
    <section role="dialog" tabindex="-1" class="slds-modal slds-fade-in-open slds-modal_small">
        <div class="slds-modal__container">

            <!-- Header -->
            <header class="slds-modal__header">

                <h2 class="slds-modal__title slds-hyphenate">
                    Modal Header
                </h2>

                <p class="slds-m-top_x-small">
                    Current user: <a>johndoe@arcthos.com</a>
                </p>

            </header>

            <!-- Content -->
            <div class="slds-modal__content slds-p-around_medium">
                <form class="slds-form">

                    <div class="slds-text-heading_medium">
                        The quick brown fox jumps over the lazy dog.
                    </div>

                    <p class="slds-m-top_medium">
                        Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit officia. Lorem
                        aliqua enim laboris do dolor eiusmod officia. Mollit incididunt nisi consectetur esse
                        laborum eiusmod pariatur proident. Eiusmod et adipisicing culpa deserunt nostrud ad
                        veniam nulla aute est. Labore esse esse cupidatat amet velit id elit consequat minim
                        ullamco mollit enim excepteur ea.
                    </p>
                    <!-- User section -->
                    <slds-expandable-section
                        title="About You"
                        class="slds-m-top_large"
                        start-open
                        collapsible
                        initial-overflow>

                        <div class="slds-form__row slds-m-bottom_small slds-p-horizontal_xxx-small">

                            <!-- First Name -->
                            <div class="slds-form__item">
                                <slds-input label="First Name" class="slds-form-element_stacked slds-is-editing"/>
                            </div>

                            <!-- Last Name -->
                            <div class="slds-form__item">
                                <slds-input label="Last Name" class="slds-form-element_stacked slds-is-editing"/>
                            </div>

                        </div>

                        <div class="slds-form__row slds-m-bottom_small slds-p-horizontal_xxx-small">

                            <!-- Email -->
                            <div class="slds-form__item">
                                <slds-input label="Email" class="slds-form-element_stacked slds-is-editing"/>
                            </div>

                            <!-- Phone -->
                            <div class="slds-form__item">
                                <slds-input label="Phone" class="slds-form-element_stacked slds-is-editing"/>
                            </div>

                        </div>

                        <div class="slds-form__row slds-m-bottom_small slds-p-horizontal_xxx-small">

                            <!-- Title -->
                            <div class="slds-form__item">
                                <slds-input label="Title" class="slds-form-element_stacked slds-is-editing"/>
                            </div>

                            <!-- Language -->
                            <div class="slds-form__item">
                                <slds-combobox
                                    v-model="language"
                                    label="Profile"
                                    :options="languageOptions"
                                    :length="7"
                                    required
                                    readonly
                                    class="slds-form-element_stacked slds-is-editing"/>

                            </div>

                        </div>

                    </slds-expandable-section>

                    <!-- Company section -->
                    <slds-expandable-section start-open title="Your Company" class="slds-m-top_large">
                        <p>
                            Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit officia. Lorem
                            aliqua enim laboris do dolor eiusmod officia. Mollit incididunt nisi consectetur
                            esse
                            laborum eiusmod pariatur proident. Eiusmod et adipisicing culpa deserunt nostrud ad
                            veniam nulla aute est. Labore esse esse cupidatat amet velit id elit consequat minim
                            ullamco mollit enim excepteur ea.
                        </p>
                    </slds-expandable-section>

                </form>
            </div>

            <!-- Foot -->
            <footer class="slds-modal__footer">
                <slds-button neutral label="Cancel"/>
                <slds-button brand label="Save"/>
            </footer>

        </div>
    </section>

</template>

<script>
    export default {
        data() {
            return {
                languageOptions: [
                    {label: 'English', value: 'en-us', meta: 'English'},
                    {label: 'Português', value: 'pt-br', meta: 'Portuguese'},
                    {label: 'Español', value: 'es', meta: 'Spanish'},
                ],
                language: null,
            }
        },
    }
</script>

<style scoped>

</style>
