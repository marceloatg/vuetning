<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Breadcrumbs"
            details="Components"
        >
            <template #details>
                Use breadcrumbs to note the path of a record and help the user to navigate back to the parent.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium" title="Base">
            <slds-breadcrumbs>
                <slds-breadcrumb
                    v-for="breadcrumb in breadcrumbs"
                    :key="breadcrumb.id"
                    :name="breadcrumb.name"
                    :label="breadcrumb.label"
                    @click=handleNavigateTo
                />
            </slds-breadcrumbs>
        </slds-card>

        <slds-card class="slds-m-top_medium" title="As string array">
            <slds-breadcrumbs
                :items="strings"
                :max-items="2"
                @click=handleNavigateTo
            />
        </slds-card>

        <slds-card class="slds-m-top_medium" title="As item array">
            <slds-breadcrumbs
                :items="objects"
                :max-items="2"
                @click=handleNavigateTo
            />
        </slds-card>

        <slds-card class="slds-m-top_medium" title="With Overflow">
            <slds-breadcrumbs>

                <template #dropdown-list>
                    <slds-overflowed-breadcrumb
                        v-for="overflowedBreadcrumb in overflowedBreadcrumbs"
                        :key="overflowedBreadcrumb.id"
                        :name="overflowedBreadcrumb.name"
                        :label="overflowedBreadcrumb.label"
                        @click="handleNavigateTo"
                    />
                </template>

                <template #default>
                    <slds-breadcrumb
                        v-for="breadcrumb in breadcrumbs"
                        :key="breadcrumb.id"
                        :name="breadcrumb.name"
                        :label="breadcrumb.label"
                        @click="handleNavigateTo"
                    />
                </template>

            </slds-breadcrumbs>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Breadcrumb',

    data() {
        return {
            breadcrumbs: [
                {label: 'Account', name: 'parent', id: '0015600000Tf3flAAB'},
                {label: 'Child Account', name: 'child', id: '0015600000TOWtnAAH'},
            ],
            overflowedBreadcrumbs: [
                {label: 'Menu Item One', name: 'overflow-1', id: '0015600000Tf3flAAC'},
                {label: 'Menu Item Two', name: 'overflow-2', id: '0015600000Tf3flAAD'},
                {label: 'Menu Item Three', name: 'overflow-3', id: '0015600000Tf3flAAE'},
            ],
            breadCrumbsMap: {
                parent: 'http://www.example.com/account1',
                child: 'http://www.example.com/account2',
            },
            strings: ['Menu Item One', 'Menu Item Two', 'Menu Item Three', 'Account', 'Child Account'],
            objects: [
                {label: 'Menu Item One', name: 'overflow-1'},
                {label: 'Menu Item Two', name: 'overflow-2'},
                {label: 'Menu Item Three', name: 'overflow-3'},
                {label: 'Account', name: 'parent'},
                {label: 'Child Account', name: 'child'},
            ]
        }
    },

    methods: {
        handleNavigateTo(name) {

            if (this.breadCrumbsMap[name]) {
                window.location.assign(this.breadCrumbsMap[name])
            }
        }
    }
}
</script>
