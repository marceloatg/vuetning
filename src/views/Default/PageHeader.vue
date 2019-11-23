<template>
    <div class="slds-page-header">
        <div class="slds-page-header__row">

            <!-- Title -->
            <div class="slds-page-header__col-title">
                <div class="slds-media">

                    <!-- Figure-->
                    <div class="slds-media__figure">
                        <slds-icon
                            icon="utility:settings"
                            icon-class="slds-page-header__icon"
                            class="slds-icon-standard-custom"
                            standard/>
                    </div>

                    <!-- Body -->
                    <div class="slds-media__body">
                        <div class="slds-page-header__name">
                            <div class="slds-page-header__name-title">
                                <h1>

                                    <slds-breadcrumb :items="items"/>

                                    <span class="slds-page-header__title slds-truncate" title="General settings">
                                        General settings
                                    </span>

                                </h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            items: [
                {
                    id: '1',
                    label: 'Dashboard',
                    href: 'breadcrumbs_dashboard'
                },
                {
                    id: '2',
                    label: 'Link 1',
                    href: 'breadcrumbs_link_1'
                },
                {
                    id: '3',
                    label: 'Link 2',
                    href: 'breadcrumbs_link_2'
                },
            ]
        }),
    }
</script>
