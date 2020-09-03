<template>
    <main class="slds-card slds-m-around_medium">
        <slds-checkbox
            checked
            label="Inline Read Only Checked"
            read-only/>
        <slds-checkbox
            label="Inline Read Only Not Checked"
            read-only/>
        <slds-checkbox
            checked
            label="Stacked Read Only Checked"
            stacked
            read-only/>
        <slds-checkbox
            label="Stacked Read Only Not Checked"
            stacked
            read-only/>
        <slds-checkbox
            checked
            label="Inline Checked"
            inline/>
        <slds-checkbox
            label="Inline Not Checked"
            inline/>
        <slds-checkbox
            checked
            label="Stacked Checked"
            stacked/>
        <slds-checkbox
            label="Stacked Not Checked"
            stacked/>
        <slds-checkbox
            checked
            label="Inline Checked Disabled"
            inline
            disabled/>
        <slds-checkbox
            label="Inline Not Checked Disabled"
            inline
            disabled/>
        <slds-checkbox
            checked
            label="Stacked Checked Disabled"
            stacked
            disabled/>
        <slds-checkbox
            label="Stacked Not Checked Disabled"
            stacked
            disabled/>
        <slds-checkbox
            checked
            label="Stacked Checked Has Error"
            stacked
            has-error
            error-message="Error"/>
        <slds-checkbox
            label="Stacked Not Checked Has Error"
            stacked
            has-error
            error-message="Error"/>
        <slds-checkbox
            checked
            label="Inline Checked Has Error"
            inline
            has-error
            error-message="Error"/>
        <slds-checkbox
            label="Inline Not Checked Has Error"
            inline
            has-error
            error-message="Error"/>
        <slds-checkbox
            checked
            label="Inline Checked Required"
            required/>
        <slds-checkbox
            label="Inline Not Checked Required"
            required/>
        <slds-checkbox
            checked
            label="Stacked Checked Required"
            stacked
            required/>
        <slds-checkbox
            label="Stacked Not Checked Required"
            stacked
            required/>
        <slds-checkbox
            checked
            label="Inline Checked Read Only Required"
            required
            read-only
        />
        <slds-checkbox
            label="Inline Not Checked Read Only Required"
            required
            read-only
        />
        <slds-checkbox
            checked
            label="Stacked Checked Read Only Required"
            required
            read-only
            stacked
        />
        <slds-checkbox
            label="Stacked Not Checked Read Only Required"
            required
            read-only
            stacked
        />
        <slds-checkbox
            checked
            label="Inline Checked Read Only Required Has Error"
            required
            read-only
            has-error
            error-message="Error"
        />
        <slds-checkbox
            label="Inline Not Checked Read Only Required Has Error"
            required
            read-only
            has-error
            error-message="Error"
        />
        <slds-checkbox
            checked
            label="Stacked Checked Read Only Required Has Error"
            required
            read-only
            stacked
            has-error
            error-message="Error"
        />
        <slds-checkbox
            label="Stacked Not Checked Read Only Required Has Error"
            required
            read-only
            stacked
            has-error
            error-message="Error"
        />
    </main>
</template>

<script>
export default {
    name: "Checkboxes"
}
</script>

<style scoped>

</style>
