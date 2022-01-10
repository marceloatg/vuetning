<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Code Block"
            details="Components"
        >
            <template #details>
                Lorem ipsum dolor sit amet.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-code-block
                label="My Code Snippet"
                :code="code"
                theme-button
                copy-button
            />
        </slds-card>

    </main>
</template>

<script>

export default {
    name: 'CodeBlock',
    data() {
        return {
            code:
                'import {createApp} from \'vue\'\n' +
                'import Root from \'./App.vue\'\n' +
                'import Router from \'./router\'\n' +
                'import Vuetning from \'./index\'\n' +
                '\n' +
                'const vuetningProperties = {\n' +
                '    animations: true\n' +
                '}\n' +
                '\n' +
                'const app = createApp(Root)\n' +
                'app.use(Router)\n' +
                'app.use(Vuetning)\n' +
                'app.config.globalProperties.$vuetning = vuetningProperties\n' +
                'app.mount(\'#app\')'
        }
    }
}
</script>
