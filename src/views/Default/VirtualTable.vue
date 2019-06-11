<template>
    <div style="height: 600px; background: red;">
        <slds-virtual-table
            :columns="columns"
            :key-field="keyField"
            :rows="rows"
            @action="onAction"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                columns: [],
                keyField: 'id',
                rows: [],
            }
        },
        created() {
            this.columns.push({
                fieldName: 'name',
                label: 'Name',
                type: 'action-link',
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
            });

            this.columns.push({
                fieldName: 'date',
                label: 'Date',
                type: 'date',
                typeAttributes: {
                    format: 'DD/MMM/YYYY hh:mm:ss',
                },
            });

            for (let i = 0; i < 1000; i++) {
                this.rows.push({
                    id: i,
                    name: `Item number ${i}OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
                    email: `user_${i}@arcthos.com`,
                    phone: `(55) ${i}-${i}`,
                    date: Date.now(),
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
