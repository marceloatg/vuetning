<template>
    <div style="height: 600px; background: red;">
        <slds-virtual-table
            :columns="columns"
            :key-field="keyField"
            :rows="rows"/>
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
                type: 'text',
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

            for (let i = 0; i < 1000; i++) {
                this.rows.push({
                    id: i,
                    name: `Item number ${i}OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
                    email: `user_${i}@arcthos.com`,
                    phone: `(55) ${i}-${i}`,
                })
            }
        },
    }
</script>
