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
    name: 'CheckboxButtonGroup',

    data() {
        return {
            arrayOptions: [
                {value: 'Mon', label: 'Mon', disabled: false},
                {value: 'Tue', label: 'Tue', disabled: false},
                {value: 'Wed', label: 'Wed', disabled: false},
                {value: 'Thu', label: 'Thu', disabled: false},
                {value: 'Fri', label: 'Fri', disabled: false},
                {value: 'Sat', label: 'Sat', disabled: true},
                {value: 'Sun', label: 'Sun', disabled: true},
            ],
            stringOptions: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            value: []
        }
    }
}
</script>
