<template>
    <td class="slds-cell-edit" :style="{'text-align': textAlign}">

        <!-- Text types -->
        <span v-if="isOutput" class="slds-grid slds-grid_align-spread">

            <span v-if="type === 'text'" class="slds-truncate" :title="cell">
                {{ cell }}
            </span>

            <a v-else-if="type === 'link'" class="slds-truncate" :title="cell">
                {{ cell }}
            </a>

            <a v-else-if="type === 'email'" :href="`mailto:${cell}`" class="slds-truncate" :title="cell">
                <slds-icon icon-name="utility:email" size="x-small" variant="default"/>
                {{ cell }}
            </a>

            <span v-else-if="type === 'boolean'">
                <slds-icon v-if="cell" icon-name="utility:check" variant="default" size="x-small"/>
            </span>

            <span v-else-if="type === 'avatar'">
                <slds-avatar :src="cell" variant="circle"/>
            </span>

            <!-- Copy to clipboard button -->
            <slds-button-icon v-if="hasCopyButton"
                              icon-name="utility:copy_to_clipboard"
                              container="none"
                              class="slds-cell-edit__button slds-m-left_x-small"
                              icon-class="slds-button__icon_hint slds-button__icon_edit"
                              title="Copy to clipboard"/>

        </span>

        <!-- Input types -->
        <span v-else class="slds-truncate" :title="cell">

            <slds-menu v-if="type === 'action'" :items="actions" size="small" position="right"/>

            <slds-button v-else-if="type === 'button'"
                         :label="typeAttributes.label"
                         :variant="typeAttributes.variant"
                         :class="typeAttributes.class"/>

        </span>

    </td>
</template>

<script>
    export default {
        name: 'SldsCell',
        props: {
            actions: {
                type: Array,
            },
            cell: {
                required: true,
            },
            hasCopyButton: {
                type: Boolean
            },
            textAlign: {
                type: String,
                default: 'left',
            },
            type: {
                type: String,
                required: true,
                validator(value) {
                    return [
                        'avatar',
                        'action',
                        'boolean',
                        'button',
                        'button-icon',
                        'currency',
                        'date',
                        'email',
                        'link',
                        'number',
                        'percent',
                        'text',
                        'url',
                    ].indexOf(value) !== -1
                },
            },
            typeAttributes: {
                type: Object,
            },
        },
        computed: {
            isOutput() {
                switch (this.type) {
                    case 'action':
                    case 'button':
                    case 'button-icon':
                        return false;

                    default:
                        return true;
                }
            },
        },
    }
</script>
