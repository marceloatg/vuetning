<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Wide Radio Group"
            details="Components"
        >
            <template #details>
                Lorem ipsum dolor sit amet...
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-wide-radio-group
                v-model="option"
                label="Select an option:"
                :options="options"
            />
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'WideRadioGroup',

    data(){
      return {
          option: 'user',

          options: [
              {
                  value: 'user',
                  label: 'User',
                  meta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at dolor in enim suscipit semper. Duis eget eros dignissim, rhoncus tellus vitae, maximus nibh.'
              },
              {
                  value: 'admin',
                  label: 'Administrator',
                  meta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at dolor in enim suscipit semper. Duis eget eros dignissim, rhoncus tellus vitae, maximus nibh.'
              },
          ],
      }
    },
}
</script>
