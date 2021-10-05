<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Data Table"
            details="Components"
        >
            <template #details>
                Data tables are an enhanced version of an HTML table and are used to display tabular data.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <div class="datatable-container">
                <slds-data-table
                    :columns="columns"
                    :rows="rows"
                    :actions="actions"
                />
            </div>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'DataTable',

    data() {
        return {
            actions: [
                {value: 'clone', label: 'Clone', icon: 'utility:copy'},
                {value: 'edit', label: 'Edit', icon: 'utility:edit'},
                {value: 'delete', label: 'Delete', icon: 'utility:delete'},
            ],
            avatars: [
                '/assets/images/avatar1.jpg',
                '/assets/images/avatar2.jpg',
                '/assets/images/avatar3.jpg',
            ],
            columns: [
                {fieldName: 'avatar', type: 'avatar'},
                {label: 'Name', fieldName: 'name', type: 'link'},
                {label: 'Version', fieldName: 'version', type: 'text'},
                {label: 'Non-Resizable Text', fieldName: 'nonResizable', type: 'text', isResizable: false, width: 100},
                {label: 'Non-Sortable Text', fieldName: 'nonSortable', type: 'text', sortable: false},
                {label: 'Version', fieldName: 'version', type: 'text'},
                {label: 'Status', fieldName: 'status', type: 'badge'},
                {label: 'Verified', fieldName: 'isVerified', type: 'boolean'},
            ],
            count: 100000,
            rows: [],
            statuses: [
                {color: 'success', icon: 'utility:check', label: 'Success'},
                {color: 'warning', icon: 'utility:warning', label: 'Warning'},
                {color: 'error', icon: 'utility:error', label: 'Error'},
            ]
        }
    },

    created() {
        this.generateRows()
    },

    methods: {
        generateRows() {
            for (let i = 0; i < this.count; i++) {
                this.rows.push({
                    id: `${i}`,
                    avatar: this.avatars[this.getRandomInt(3)],
                    name: `Record #${i}`,
                    version: `${this.getRandomInt(5)}.${this.getRandomInt(100)}`,
                    nonResizable: `${i}`,
                    nonSortable: `${i}`,
                    status: this.statuses[this.getRandomInt(3)],
                    isVerified: this.getRandomInt(2) > 0,
                    actions: ['clone', 'edit', 'delete']
                })
            }
        },

        getRandomInt(max) {
            return Math.floor(Math.random() * max)
        },
    }
}
</script>

<style scoped lang="scss">
.datatable-container {
    height: 480px;
    width: 800px;
    border: 1px solid #dddbda;;
}
</style>
