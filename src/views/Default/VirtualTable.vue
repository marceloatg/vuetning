<template>
    <div style="height: 600px; background: red;">
        <slds-virtual-table
            :actions="actions"
            :columns="columns"
            :has-checkbox-column="true"
            :key-field="keyField"
            :rows="rows"
            :selected-rows="selectedRows"
            :initial-sort="initialSort"
            @detail="onAction"
            @select="onSelect"
            @selectall="onSelectAll"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                columns: [],
                keyField: 'id',
                rows: [],
                selectedRows: [],
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
                ],
                initialSort: {
                    columnName: 'email',
                    order: 'desc',
                },
            }
        },
        created() {
            this.columns.push({
                fieldName: 'button',
                width: 72,
                type: 'button',
            });

            this.columns.push({
                fieldName: 'avatar',
                label: 'Avatar',
                type: 'avatar',
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
                fieldName: 'triggable',
                label: 'Triggable',
                type: 'boolean',
                hasCopyButton: false,
                resizable: false,
                width: 128,
            });

            this.columns.push({
                fieldName: 'phone',
                label: 'Phone',
                type: 'text',
                resizable: false,
                width: 128,
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

            for (let i = 0; i < 100000; i++) {
                this.rows.push({
                    id: i,
                    button: {
                        label: 'button',
                        action: 'button',
                    },
                    avatar: '\\assets\\images\\group_avatar_200.png',
                    name: `Item number ${i}OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
                    email: `user_${i}@arcthos.com`,
                    triggable: true,
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
            },
            onSelect(id) {
                const index = this.selectedRows.indexOf(id);
                if (index === -1) this.selectedRows.push(id);
                else this.selectedRows.splice(index, 1);
            },
            onSelectAll() {
                if (this.selectedRows.length === 0) {
                    for (let id of this.rows.map(row => row.id)) this.selectedRows.push(id);
                }
                else if (this.selectedRows.length === this.rows.length) {
                    this.selectedRows.splice(0, this.selectedRows.length);
                }
                else {
                    this.selectedRows.splice(0, this.selectedRows.length);
                    for (let id of this.rows.map(row => row.id)) this.selectedRows.push(id);
                }
            },
        },
    }
</script>
