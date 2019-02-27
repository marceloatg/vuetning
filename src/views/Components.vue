<template>
    <slds-table-view
        :columns="columns"
        :empty-message="emptyMessage"
        :figure="figure"
        :footer="footer"
        :initialized="initialized"
        :list-views="listViews"
        :rows="rows"
        :title="title">

        <template #modals>
            <slds-modal heading="My awesome modal">

                <template #tagline>
                    <p class="slds-m-top_x-small">Here’s a tagline if you need it. It is allowed to extend across
                        mulitple lines, so I’m making up content to show that to you. It is allowed to
                        <a href="javascript:void(0);">contain links or be a link</a>.
                    </p>
                </template>

                <template #body>
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
                </template>

                <template #footer>

                    <slds-button label="Don't go..."/>

                    <slds-button label="Go!" variant="brand"/>

                </template>

            </slds-modal>
        </template>

        <template #header-actions>
            <div class="slds-col slds-no-flex slds-grid slds-align-top slds-p-bottom_xx-small">
                <div class="slds-button-group">
                    <slds-button label="Create" icon-name="utility:add"/>
                </div>
            </div>
        </template>

    </slds-table-view>
</template>

<script>
    import SldsTableView from "./TableView/Index";

    export default {
        name: 'Components',
        components: {
            SldsTableView
        },
        data() {
            return {
                columns: [{
                    fieldName: 'avatar',
                    resizable: false,
                    type: 'avatar',
                }, {
                    fieldName: 'name',
                    label: 'Name',
                    type: 'link',
                }, {
                    fieldName: 'email',
                    label: 'Email',
                    type: 'email',
                }, {
                    fieldName: 'verified',
                    label: 'Verified',
                    type: 'boolean',
                    initialWidth: 100,
                }, {
                    fieldName: 'blocked',
                    label: 'Blocked',
                    type: 'boolean',
                    initialWidth: 100,
                }, {
                    fieldName: 'profile.label',
                    label: 'Profile',
                    type: 'text',
                }, {
                    fieldName: 'usedStorage',
                    label: 'Used storage',
                    type: 'number',
                    align: 'right',
                    typeAttributes: {
                        decimalPlaces: 2,
                    }
                }, {
                    type: 'action',
                    resizable: false,
                    fixedWidth: 52,
                    typeAttributes: {
                        rowActions: [{
                            label: 'Edit',
                            name: 'edit',
                            leftIconName: 'utility:edit',
                        }, {
                            label: 'Block',
                            name: 'block',
                            leftIconName: 'utility:ban',
                        }, {
                            label: 'Delete',
                            name: 'delete',
                            leftIconName: 'utility:delete',
                        }]
                    },
                }],
                emptyMessage: {
                    heading: 'Nothing here yet',
                    message: 'You do not have any organizations added, click the Add button to get started.',
                },
                figure: {
                    name: 'standard:customers',
                    color: 'slds-icon-standard-customers',
                },
                footer: {
                    currentPage: 1,
                    totalPages: 1,
                },
                initialized: true,
                listViews: 'All users',
                rows: [{
                    "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c5",
                    "name": "John Doe",
                    "email": "johndoe@arcthos.com",
                    "avatar": {
                        "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                        "initials": "JD",
                        "fallbackIconName": "standard:user",
                    },
                    "verified": true,
                    "blocked": false,
                    "profile": {
                        "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                        "label": "Administrator"
                    },
                    "usedStorage": 100000000
                }, {
                    "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c6",
                    "name": "John Doe",
                    "email": "johndoe@arcthos.com",
                    "avatar": {
                        "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                        "initials": "JD",
                        "fallbackIconName": "standard:user",
                    },
                    "verified": true,
                    "blocked": false,
                    "profile": {
                        "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                        "label": "Administrator"
                    },
                    "usedStorage": null
                }, {
                    "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c7",
                    "name": "John Doe",
                    "email": "johndoe@arcthos.com",
                    "avatar": {
                        "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                        "initials": "JD",
                        "fallbackIconName": "standard:user",
                    },
                    "verified": true,
                    "blocked": false,
                    "profile": {
                        "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                        "label": "Administrator"
                    },
                    "usedStorage": 12345.67
                }, {
                    "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c8",
                    "name": "John Doe",
                    "email": "johndoe@arcthos.com",
                    "avatar": {
                        "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                        "initials": "JD",
                        "fallbackIconName": "standard:user",
                    },
                    "verified": true,
                    "blocked": false,
                    "profile": {
                        "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                        "label": "Administrator"
                    },
                    "usedStorage": {
                        "label": "95,37 MB",
                        "value": 100002693
                    }
                }],
                title: 'Users',
            }
        },
    }
</script>
