<template>
    <li class="slds-nav-vertical__item" :class="itemClass">
        <a class="slds-nav-vertical__action" @click="onClick">

            <!-- Icon -->
            <slds-icon
                v-if="this.icon"
                :icon="icon"
                x-small
                class="slds-line-height_reset slds-m-right_x-small"
            />

            {{ label }}

            <span v-if="badge" class="slds-badge slds-col_bump-left">
                {{ badge }}
            </span>

        </a>
    </li>
</template>

<script>
import SldsIcon from '../slds-icon/slds-icon'

export default {
    name: 'SldsVerticalNavigationItem',

    components: {
        SldsIcon,
    },

    props: {
        badge: String,
        icon: String,
        label: {type: String, required: true},
        name: {type: String, required: true},
    },

    computed: {
        isActive() {
            return this.name === this.selectedItem
        },

        selectedItem() {
            return this.$parent.selectedItem
        },

        itemClass() {
            return {
                'slds-is-active': this.isActive
            }
        },
    },

    methods: {
        onClick() {
            this.$emit('click', this.name)
        }
    }
}
</script>
