<template>
    <SldsTableView
        :columns="columns"
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

    </SldsTableView>
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
