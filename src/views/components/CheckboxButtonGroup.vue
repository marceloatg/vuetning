<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Checkbox Button Group"
            details="Components"
        >
            <template #details>
                A styled checkable input group that communicates if an option(s) are true, false or indeterminate.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">

            <slds-checkbox-button-group
                v-model="value"
                label="Scheduled Day(s)"
                :options="stringOptions"
            />

            <br>

            <slds-checkbox-button-group
                v-model="value"
                label="Scheduled Day(s)"
                :options="arrayOptions"
                required
                error
            >
                <template #error>
                    This field is required
                </template>
            </slds-checkbox-button-group>

            <br>

            <slds-checkbox-button-group
                v-model="value"
                label="Scheduled Day(s)"
                :options="arrayOptions"
            >
                <slds-checkbox-button-option
                    v-for="option in $data.$_options"
                    :key="option.key"
                    :value="$data.$_value.includes(option.name)"
                    :label="option.label"
                    :disabled="option.disabled"
                />
            </slds-checkbox-button-group>

            <br>

            Value: {{ value }}
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "CheckboxButtonGroup",

    data() {
        return {
            arrayOptions: [
                {name: 'Mon', label: 'Mon', disabled: false},
                {name: 'Tue', label: 'Tue', disabled: false},
                {name: 'Wed', label: 'Wed', disabled: false},
                {name: 'Thu', label: 'Thu', disabled: false},
                {name: 'Fri', label: 'Fri', disabled: false},
                {name: 'Sat', label: 'Sat', disabled: true},
                {name: 'Sun', label: 'Sun', disabled: true},
            ],
            stringOptions: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            value: []
        }
    }
}
</script>
