<template>
    <li class="slds-page-header__detail-block">

        <!-- Title -->
        <div class="slds-text-title slds-truncate" :title="title">
            {{ title }}
        </div>

        <!-- Value -->
        <slot>
            <div class="slds-truncate" :title="value || ''">

                <a v-if="isLink" @click="onClickLink">
                    {{ value || '' }}
                </a>

                <span v-else>
                    {{ value || '' }}
                </span>

            </div>
        </slot>

    </li>
</template>

<script>
export default {
    name: 'SldsPageHeaderDetail',

    props: {
        isLink: {
            type: Boolean
        },
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        },
    },

    methods: {
        onClickLink() {
            this.$emit('click')
        }
    }
}
</script>
