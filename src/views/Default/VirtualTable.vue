<template>
    <div style="height: 600px; background: red;">
        <slds-virtual-table
            :actions="actions"
            :columns="columns"
            :key-field="keyField"
            :rows="rows"
            @detail="onAction"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                columns: [],
                keyField: 'id',
                rows: [],
                actions: [
                    {
                        label: 'Compare Again',
                        value: 'redo',
                        iconName: 'utility:redo',
                    },
                    {
                        label: 'Delete',
                        value: 'delete',
                        iconName: 'utility:delete',
                    },
                    {
                        label: 'Test',
                        value: 'test1',
                    },
                    {
                        label: 'Test',
                        value: 'test2',
                    },
                    {
                        label: 'Test',
                        value: 'test3',
                    },
                    {
                        label: 'Test',
                        value: 'test4',
                    },
                    {
                        label: 'Test',
                        value: 'test5',
                    },
                    {
                        label: 'Test',
                        value: 'test6',
                    },
                ]
            }
        },
        created() {
            this.columns.push({
                fieldName: 'button',
                width: 100,
                type: 'button',
            });

            this.columns.push({
                fieldName: 'name',
                label: 'Name',
                type: 'event-link',
                sortable: false,
                typeAttributes: {
                    action: 'detail',
                }
            });

            this.columns.push({
                fieldName: 'email',
                label: 'Email',
                type: 'text',
            });

            this.columns.push({
                fieldName: 'phone',
                label: 'Phone',
                type: 'text',
                resizable: false,
                fixedWidth: 128,
            });

            this.columns.push({
                fieldName: 'sorterLabel',
                label: 'Sorter',
                type: 'text',
                sortBy: 'sorterValue',
                hasCopyButton: false,
            });

            this.columns.push({
                fieldName: 'badge',
                label: 'Badge',
                type: 'badge',
                sortBy: 'badge.label',
            });

            for (let i = 0; i < 1000; i++) {
                this.rows.push({
                    id: i,
                    button: {
                        label: 'button',
                        action: 'button',
                    },
                    name: `Item number ${i}OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
                    email: `user_${i}@arcthos.com`,
                    phone: `(55) ${i}-${i}`,
                    sorterLabel: `Label-${i}`,
                    sorterValue: i,
                    badge: {
                        label: `Badge-${i}`,
                        color: 'outline-success',
                    },
                    actions: ['redo', 'delete', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6'],
                })
            }
        },
        methods: {
            onAction(item) {
                console.log(item)
            }
        },
    }
</script>
