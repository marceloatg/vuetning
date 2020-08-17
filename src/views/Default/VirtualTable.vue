<template>
    <div style="height: 640px; background: white;">

        <div class="slds-grid slds-grid_align-spread slds-p-around_medium">

            <div class="slds-col">
                <div class="slds-text-heading_large ">
                    Total items: {{ totalItems }}
                </div>
            </div>

            <div class="slds-col">
                <slds-input v-model="filter" placeholder="Filter..."/>
            </div>

        </div>

        <slds-tabs :items="tabs" :active-item="activeTab" @click="onClickTab">

            <!-- Org details -->
            <template #table>
                <div class="table-wrapper">
                    <slds-data-table
                        :columns="columns"
                        :rows="rows"
                        :actions="actions"
                        has-selection
                        :are-all-rows-selected="areAllRowsSelected"
                        :filter="filter"
                        class="slds-border_top"
                        @detail="onAction"
                        @select="onSelect"
                        @select-all="onSelectAll"/>
                </div>
            </template>

            <!-- Trust Status -->
            <template #test>
                <div class="slds-p-around_medium">

                    <slds-button
                        neutral
                        icon="utility:add"
                        label="Add row"
                        @click="onclickAddRow"/>

                    <slds-button
                        neutral
                        icon="utility:rotate"
                        label="Update field"
                        @click="onclickUpdate"/>

                </div>
            </template>

        </slds-tabs>

    </div>
</template>

<script>
import 'numeral/locales/pt-br'
import numeral from "numeral";
import {v4 as uuid} from 'uuid';

export default {
    data() {
        return {
            activeTab: 'table',
            areAllRowsSelected: false,
            filter: null,
            columns: [],
            rows: [],
            rowCount: 5,
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
                    label: 'Disabled',
                    value: 'test6',
                    disabled: true,
                },
            ],
            initialSort: {
                columnName: 'email',
                order: 'desc',
            },
            tabs: [
                {key: 'table', label: 'Data Table'},
                {key: 'test', label: 'test'},
            ],
        }
    },

    computed: {
        totalItems() {
            return numeral(this.rowCount).format('0,0');
        }
    },

    created() {
        numeral.locale('pt-br');

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
            type: 'link',
            sortable: false,
            hasMenu: true,
            typeAttributes: {
                action: 'detail',
            }
        });

        this.columns.push({
            fieldName: 'alpha.beta.gamma.delta',
            label: 'Deep value',
        });

        this.columns.push({
            fieldName: 'email',
            label: 'Email',
            type: 'text',
            hasMenu: true,
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
            isMonospaced: true,
        });

        this.columns.push({
            fieldName: 'badge',
            label: 'Badge',
            type: 'badge',
            sortBy: 'sorterValue',
        });

        for (let i = 0; i < this.rowCount; i++) {
            this.rows.push({
                id: i,
                isSelected: false,
                button: {
                    label: 'button',
                    action: 'button',
                },
                avatar: '\\assets\\images\\group_avatar_200.png',
                name: `Item number ${i}OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
                alpha: {beta: {gamma: {delta: `Deep value ${i}`}}},
                email: `user_${i}@arcthos.com`,
                triggable: true,
                phone: `(55) ${i}-${i}`,
                sorterLabel: `Label-${i}`,
                sorterValue: i,
                badge: {
                    label: `Badge-${i}`,
                    color: 'outline-success',
                    icon: 'utility:add'
                },
                actions: ['redo', 'delete', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6'],
            })
        }

        this.rows[0].isSelected = true;
    },

    methods: {
        onAction(item) {
            console.log(item)
        },

        onclickAddRow() {
            const i = this.rows.length;
            this.rowCount++;

            this.rows.push({
                id: i,
                isSelected: false,
                button: {
                    label: 'button',
                    action: 'button',
                },
                avatar: '\\assets\\images\\group_avatar_200.png',
                name: `Item number ${i}OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
                alpha: {beta: {gamma: {delta: `Deep value ${i}`}}},
                email: `user_${i}@arcthos.com`,
                triggable: true,
                phone: `(55) ${i}-${i}`,
                sorterLabel: `Label-${i}`,
                sorterValue: i,
                badge: {
                    label: `Badge-${i}`,
                    color: 'outline-success',
                    icon: 'utility:add'
                },
                actions: ['redo', 'delete', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6'],
            })
        },

        onClickTab(tabKey) {
            this.activeTab = tabKey;
        },

        onclickUpdate() {
            this.rows[0].name = uuid();
        },

        onSelect(row) {
            row.isSelected = !row.isSelected;

            if (this.rows.every(row => row.isSelected)) {
                this.areAllRowsSelected = true;
            }
        },

        onSelectAll() {
            if (this.rows.every(row => row.isSelected)) {
                for (let row of this.rows) row.isSelected = false;
                this.areAllRowsSelected = false;
            }
            else {
                for (let row of this.rows) row.isSelected = true;
                this.areAllRowsSelected = true;
            }
        },
    },
}
</script>

<style scoped lang="scss">
.table-wrapper {
    height: 640px;
}
</style>
