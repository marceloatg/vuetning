<template>
    <header class="slds-global-header_container">
        <div class="slds-global-header slds-grid slds-grid_align-spread">

            <!-- Logo -->
            <div class="slds-global-header__item">
                <template v-if="!noLogo">

                    <slds-grid v-if="$slots.logo">

                        <slds-column>
                            <slot name="logo"/>
                        </slds-column>

                        <slds-column>
                            <div v-if="title" class="slds-global-header__title custom-logo">

                                <span>{{ title }}</span>

                                <span v-if="badge" class="slds-badge">
                                    {{ badge }}
                                </span>

                            </div>
                        </slds-column>

                    </slds-grid>

                    <div v-else class="slds-global-header__logo">

                        <div v-if="title" class="slds-global-header__title">

                            <span>{{ title }}</span>

                            <span v-if="badge" class="slds-badge">
                                {{ badge }}
                            </span>

                        </div>

                        <span class="slds-assistive-text">
                            {{ logoAssistiveText }}
                        </span>

                    </div>

                </template>
            </div>

            <!-- Global search -->
            <div class="slds-global-header__item slds-global-header__item_search">
                <!-- To be implemented -->
            </div>

            <!-- Global actions -->
            <div class="slds-global-header__item">
                <ul class="slds-global-actions">
                    <slot name="actions"/>
                </ul>
            </div>

        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SldsGrid from "../slds-grid/slds-grid.vue"
import SldsColumn from "../slds-grid/slds-column.vue"

export default defineComponent({
    name: "SldsGlobalHeader",

    components: { SldsColumn, SldsGrid },

    props: {
        badge: String,

        logoAssistiveText: String,

        noLogo: Boolean,

        noSearch: Boolean,

        title: String,
    },
})
</script>

<style scoped lang="scss">

.slds-global-header_container {
    position: static;

    .slds-global-header {
        .slds-global-header__title {
            padding-left: 3rem;
            font-size: 22px;
            line-height: 2.5rem;

            &.custom-logo {
                padding-left: .5rem;
            }
        }
    }
}

.slds-badge {
    color: #444;
    margin: 0 .25rem;
    padding-top: .125rem;
    padding-bottom: .125rem;
}

</style>
