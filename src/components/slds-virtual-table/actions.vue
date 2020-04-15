<template>
    <div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

        <!-- Button -->
        <button
            class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
            title="Actions"
            @click="onClickAction(item)">
            <svg
                class="slds-button__icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z"/>
            </svg>
        </button>

        <!-- Items -->
        <div
            v-if="actionMenu.openedRowId === item[keyField]"
            ref="dropdown"
            v-on-clickaway="closeActionMenu"
            class="slds-dropdown slds-dropdown_length-5 slds-dropdown_right"
            :class="[`slds-dropdown_${actionMenu.orientation}`]"
            :style="{opacity: actionMenu.opacity}">

            <ul class="slds-dropdown__list" role="menu">
                <li
                    v-for="action in item.actions"
                    :key="action"
                    class="slds-dropdown__item"
                    role="presentation"
                    @mousedown.prevent="onActionMouseDown(action, item)">

                    <a role="menuitem">
                        <span class="slds-truncate" :title="getAction(action).label">
                            <slds-icon
                                v-if="getAction(action).icon != null"
                                :icon="getAction(action).icon"
                                x-small
                                class="slds-m-right_x-small"/>
                            {{ getAction(action).label }}
                        </span>
                    </a>

                </li>
            </ul>

        </div>

    </div>
</template>

<script>
    import {IdState} from 'vue-virtual-scroller'
    export default {
        mixins: [
            IdState({
                idProp: vm => vm.item.id,
            }),
        ],

        props: {
            item: Object,
        },

        // This replaces data () { ... }
        idState () {
            return {
                replyOpen: false,
                replyText: '',
            }
        },
    }
</script>
