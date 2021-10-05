<template>
    <li
        :title="label"
        role="presentation"
        class="slds-tabs_default__item"
        :class="{'slds-is-active': isActive}"
        @click="onClick"
    >
        <a
            :id="`tab-default-${id}__item`"
            class="slds-tabs_default__link"
            role="tab"
            tabindex="0"
            :aria-selected="isActive"
            :aria-controls="`tab-default-${id}`"
        >

            <!-- Icon -->
            <span class="slds-tabs__left-icon">
                <slds-icon
                    v-if="icon"
                    :icon="icon"
                    small
                />
            </span>

            <!-- Label -->
            {{ label }}

            <!-- Error -->
            <span class="slds-tabs__right-icon">
                <slds-icon
                    v-if="error"
                    icon="utility:error"
                    error
                    x-small
                    assistive-text="This item has an error"
                />
            </span>

        </a>
    </li>
</template>

<script>
import SldsIcon from '@/components/slds-icon/icon'

export default {
    name: 'SldsTab',

    components: {
        SldsIcon
    },

    props: {
        error: Boolean,
        icon: String,
        id: {type: String, required: true},
        isActive: Boolean,
        label: {type: String, required: true}
    },

    methods: {
        onClick() {
            this.$emit('click')
        }
    }
}
</script>
