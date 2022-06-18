<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Tooltip"
            details="Components"
        >
            <template #details>
                A Tooltip is a small piece of contextual information about an element on the screen, which is displayed
                when a user hovers or focuses on the element it is describing. It is not focusable and cannot contain
                focusable content.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-tooltip visible>

                <template #trigger>
                    <slds-icon icon="utility:info" x-small/>
                </template>

                <template #default>
                    Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
                    veniam incididunt duis in sint irure nisi.
                </template>

            </slds-tooltip>
        </slds-card>

        <slds-card class="slds-m-top_medium">
            <slds-tooltip>

                <template #trigger>
                    <slds-button neutral label="Help Text"/>
                </template>

                <template #default>
                    Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
                    veniam incididunt duis in sint irure nisi.
                </template>

            </slds-tooltip>
        </slds-card>

        <slds-card class="slds-m-top_medium">
            <div class="slds-grid slds-wrap">

                <!-- Top -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip top>

                        <template #trigger>
                            <slds-button neutral label="Top"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

                <!-- Top left -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip top-left>

                        <template #trigger>
                            <slds-button neutral label="Top Left"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

                <!-- Top right -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip top-right>

                        <template #trigger>
                            <slds-button neutral label="Top Right"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

                <!-- Right -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip right>

                        <template #trigger>
                            <slds-button neutral label="Right"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

                <!-- Right top -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip right-top>

                        <template #trigger>
                            <slds-button neutral label="Right Top"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

                <!-- Right bottom -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip right-bottom>

                        <template #trigger>
                            <slds-button neutral label="Right Bottom"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

                <!-- Bottom -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip bottom>

                        <template #trigger>
                            <slds-button neutral label="Bottom"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

                <!-- Bottom left -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip bottom-left>

                        <template #trigger>
                            <slds-button neutral label="Bottom Start"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

                <!-- Bottom right -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip bottom-right>

                        <template #trigger>
                            <slds-button neutral label="Bottom End"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

                <!-- Left -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip left>

                        <template #trigger>
                            <slds-button neutral label="Left"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

                <!-- Left top -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip left-top>

                        <template #trigger>
                            <slds-button neutral label="Left Top"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

                <!-- Left bottom -->
                <div class="slds-col slds-size_1-of-3 slds-align_absolute-center">
                    <slds-tooltip left-bottom>

                        <template #trigger>
                            <slds-button neutral label="Left Bottom"/>
                        </template>

                        <template #default>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, quaerat? Accusamus excepturi
                            eos, molestias expedita distinctio eligendi ut esse quasi!
                        </template>

                    </slds-tooltip>
                </div>

            </div>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Tooltip',
}
</script>

<style scoped lang="scss">
.slds-col {
    padding: .25rem;
}
</style>
