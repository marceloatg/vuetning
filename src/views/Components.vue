<template>
    <slds-table-view
        :columns="columns"
        :current-page="currentPage"
        :empty-message="emptyMessage"
        :figure="figure"
        :footer="footer"
        :initialized="initialized"
        :key-field="keyField"
        :list-views="listViews"
        :refreshing="refreshing"
        :rows="rows"
        :show-row-number-column="true"
        :show-row-selection-column="true"
        :title="title"
        :total-pages="totalPages"
        :total-rows="rows.length"
        :update-time="updateTime"
        @details="onDetails">

        <template #header-actions>
            <div class="slds-col slds-no-flex slds-grid slds-align-top slds-p-bottom_xx-small">
                <div class="slds-button-group">
                    <slds-button label="Create" icon-name="utility:add" @click="onClick"/>
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
                modalOpened: true,
                columns: [
                    {
                        align: 'center',
                        type: 'action-link',
                        hasCopyButton: false,
                        fixedWidth: 90,
                        resizable: false,
                        typeAttributes: {
                            label: 'See details',
                            action: 'details',
                        },
                    },
                    {
                        align: 'center',
                        resizable: false,
                        type: 'checkbox-button',
                        fixedWidth: 60,
                    },
                    {
                        fieldName: 'avatar',
                        resizable: false,
                        type: 'avatar',
                    },
                    {
                        fieldName: 'name',
                        label: 'Name',
                        type: 'action-link',
                        typeAttributes: {
                            action: 'userdetails',
                        },
                    },
                    {
                        label: 'Access',
                        fixedWidth: 120,
                        resizable: false,
                        type: 'button',
                        typeAttributes: {
                            label: 'access',
                            iconName: 'utility:salesforce1',
                            variant: 'outline-brand',
                            class: 'slds-button_in-table',
                        },
                    },
                    {
                        fieldName: 'email',
                        label: 'Email',
                        type: 'email',
                    },
                    {
                        fieldName: 'verified',
                        label: 'Verified',
                        type: 'boolean',
                        initialWidth: 100,
                    },
                    {
                        fieldName: 'blocked',
                        label: 'Blocked on',
                        type: 'date',
                        typeAttributes: {
                            format: 'DD/MMM/YYYY',
                            titleFormat: 'MMMM Do YYYY, h:mm:ss a',
                        },
                    },
                    {
                        fieldName: 'status',
                        label: 'Status',
                        type: 'badge',
                    },
                    {
                        fieldName: 'duration',
                        label: 'Duration',
                        type: 'duration',
                    },
                    {
                        fieldName: 'usedStorage',
                        label: 'Used storage',
                        type: 'number',
                        align: 'right',
                        typeAttributes: {
                            decimalPlaces: 2,
                        }
                    },
                    {
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
                    }
                ],
                currentPage: 1,
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
                keyField: 'id',
                listViews: 'All users',
                refreshing: false,
                rows: [
                    {
                        "duration": 15,
                        "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c5",
                        "name": "John Doe",
                        "email": "johndoe@arcthos.com",
                        "avatar": {
                            "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                            "initials": "JD",
                            "fallbackIconName": "standard:user",
                        },
                        "verified": true,
                        "blocked": Date.now(),
                        "profile": {
                            "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                            "label": "Administrator"
                        },
                        "status": {
                            "label": "In Progress",
                            "color": "outline-brand",
                            "iconName": "utility:error"
                        },
                        "usedStorage": 100000000
                    },
                    {
                        "duration": 2,
                        "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764d5",
                        "name": "John Doe",
                        "email": "johndoe@arcthos.com",
                        "avatar": {
                            "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                            "initials": "JD",
                            "fallbackIconName": "standard:user",
                        },
                        "verified": true,
                        "blocked": null,
                        "profile": {
                            "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                            "label": "Administrator"
                        },
                        "status": {
                            "label": "In Progress",
                            "color": "brand",
                            "iconName": "utility:error"
                        },
                        "usedStorage": 100000000
                    },
                    {
                        "duration": 11658,
                        "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c6",
                        "name": "John Doe",
                        "email": "johndoe@arcthos.com",
                        "avatar": {
                            "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                            "initials": "JD",
                            "fallbackIconName": "standard:user",
                        },
                        "verified": true,
                        "blocked": Date.now(),
                        "profile": {
                            "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                            "label": "Administrator"
                        },
                        "status": {
                            "label": "Partial",
                            "color": "outline-warning",
                            "iconName": "utility:error"
                        },
                        "usedStorage": null
                    },
                    {
                        "duration": 2156000,
                        "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764d6",
                        "name": "John Doe",
                        "email": "johndoe@arcthos.com",
                        "avatar": {
                            "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                            "initials": "JD",
                            "fallbackIconName": "standard:user",
                        },
                        "verified": true,
                        "blocked": Date.now(),
                        "profile": {
                            "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                            "label": "Administrator"
                        },
                        "status": {
                            "label": "Partial",
                            "color": "warning",
                            "iconName": "utility:error"
                        },
                        "usedStorage": null
                    },
                    {
                        "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c7",
                        "name": "John Doe",
                        "email": "johndoe@arcthos.com",
                        "avatar": {
                            "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                            "initials": "JD",
                            "fallbackIconName": "standard:user",
                        },
                        "verified": true,
                        "blocked": Date.now(),
                        "profile": {
                            "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                            "label": "Administrator"
                        },
                        "status": {
                            "label": "Succeeded",
                            "color": "outline-success",
                            "iconName": "utility:check"
                        },
                        "usedStorage": 12345.67
                    },
                    {
                        "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764d7",
                        "name": "John Doe",
                        "email": "johndoe@arcthos.com",
                        "avatar": {
                            "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                            "initials": "JD",
                            "fallbackIconName": "standard:user",
                        },
                        "verified": true,
                        "blocked": Date.now(),
                        "profile": {
                            "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                            "label": "Administrator"
                        },
                        "status": {
                            "label": "Succeeded",
                            "color": "success",
                            "iconName": "utility:check"
                        },
                        "usedStorage": 12345.67
                    },
                    {
                        "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c8",
                        "name": "John Doe",
                        "email": "johndoe@arcthos.com",
                        "avatar": {
                            "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                            "initials": "JD",
                            "fallbackIconName": "standard:user",
                        },
                        "verified": true,
                        "blocked": Date.now(),
                        "profile": {
                            "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                            "label": "Administrator"
                        },
                        "status": {
                            "label": "Failed",
                            "color": "outline-error",
                            "iconName": "utility:error"
                        },
                        "usedStorage": {
                            "label": "95,37 MB",
                            "value": 100002693
                        }
                    },
                    {
                        "duration": 13245678,
                        "id": "3ca1d2a6-6f25-4c17-a0b9-37f9e01764c9",
                        "name": "John Doe",
                        "email": "johndoe@arcthos.com",
                        "avatar": {
                            "src": "https://s.gravatar.com/avatar/73822150983841403240232f7070b52a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png",
                            "initials": "JD",
                            "fallbackIconName": "standard:user",
                        },
                        "verified": true,
                        "blocked": Date.now(),
                        "profile": {
                            "id": "de06c530-fa6c-45b1-b989-4739a57c9da6",
                            "label": "Administrator"
                        },
                        "status": {
                            "label": "Failed",
                            "color": "error",
                            "iconName": "utility:error"
                        },
                        "usedStorage": {
                            "label": "95,37 MB",
                            "value": 100002693
                        }
                    }
                ],
                title: 'Users',
                totalPages: 3,
                updateTime: Date.now(),
            }
        },
        methods: {
            onClick() {
                this.modalOpened = true;
            },
            onClose() {
                this.modalOpened = false;
            },
            onDetails(row) {
                console.log(row);
            },
        },
    }
</script>
