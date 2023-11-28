<template>
    <li class="slds-page-header__detail-block">

        <!-- Title -->
        <div class="slds-text-title slds-truncate" :title="label">
            {{ label }}
        </div>

        <!-- Value -->
        <slot>
            <div class="slds-truncate" :title="value || ''">

                <a v-if="isLink" @click="handleClickLink">
                    {{ value || '' }}
                </a>

                <span v-else>
                    {{ value || '' }}
                </span>

            </div>
        </slot>

    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "SldsPageHeaderDetail",

    props: {
        isLink: { type: Boolean },

        label: { type: String, required: true },

        value: { type: String },
    },

    methods: {
        handleClickLink() {
            this.$emit(EVENTS.CLICK)
        },
    },
})
</script>
