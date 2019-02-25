<template>
    <slds-table-view :columns="columns"
                     :figure="figure"
                     :initialized="initialized"
                     :list-views="listViews"
                     :rows="rows"
                     :title="title">

        <div slot="header-actions" class="slds-col slds-no-flex slds-grid slds-align-top slds-p-bottom_xx-small">
            <div class="slds-button-group">
                <slds-button label="Create" icon-name="utility:add"/>
            </div>
        </div>

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
                    fieldName: 'picture',
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
                }, {
                    fieldName: 'blocked',
                    label: 'Blocked',
                    type: 'boolean',
                }, {
                    fieldName: 'profile.label',
                    label: 'Profile',
                    type: 'text',
                }, {
                    fieldName: 'usedStorage',
                    label: 'Used storage',
                    type: 'text',
                }, {
                    fieldName: 'actions',
                    type: 'action',
                    resizable: false,
                    fixedWidth: 52,
                    actions: [{
                        label: 'Edit',
                        name: 'edit',
                        leftIcon: {
                            category: 'utility',
                            name: 'edit',
                        },
                    }, {
                        label: 'Block',
                        name: 'block',
                        leftIcon: {
                            category: 'utility',
                            name: 'ban',
                        },
                    }, {
                        label: 'Delete',
                        name: 'delete',
                        leftIcon: {
                            category: 'utility',
                            name: 'delete',
                        },
                    }]
                }],
                figure: {
                    name: 'standard:customers',
                    color: 'slds-icon-standard-customers',
                },
                initialized: true,
                listViews: 'All users',
                rows: [{
                    "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c5",
                    "name": "John Doe",
                    "email": "johndoe@arcthos.com",
                    "picture": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                    "verified": true,
                    "blocked": false,
                    "profile": {
                        "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                        "label": "Administrator"
                    },
                    "usedStorage": 0
                }, {
                    "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c6",
                    "name": "John Doe",
                    "email": "johndoe@arcthos.com",
                    "picture": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                    "verified": true,
                    "blocked": false,
                    "profile": {
                        "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                        "label": "Administrator"
                    },
                    "usedStorage": 0
                }, {
                    "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c7",
                    "name": "John Doe",
                    "email": "johndoe@arcthos.com",
                    "picture": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                    "verified": true,
                    "blocked": false,
                    "profile": {
                        "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                        "label": "Administrator"
                    },
                    "usedStorage": 0
                }, {
                    "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c8",
                    "name": "John Doe",
                    "email": "johndoe@arcthos.com",
                    "picture": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                    "verified": true,
                    "blocked": false,
                    "profile": {
                        "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                        "label": "Administrator"
                    },
                    "usedStorage": 0
                }],
                title: 'Users',
            }
        },
    }
</script>