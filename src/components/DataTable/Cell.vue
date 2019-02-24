<template>
    <td class="slds-cell-edit" :style="{'text-align': column.textAlign}">

        <!-- Text types -->
        <span v-if="isOutput" class="slds-grid slds-grid_align-spread">

            <span v-if="column.type === 'text'" class="slds-truncate" :title="cell">
                {{ cell }}
            </span>

            <a v-else-if="column.type === 'link'" class="slds-truncate" :title="cell">
                {{ cell }}
            </a>

            <a v-else-if="column.type === 'email'" :href="`mailto:${cell}`" class="slds-truncate" :title="cell">
                <slds-icon icon-name="utility:email" size="x-small" variant="default"/>
                {{ cell }}
            </a>

            <span v-else-if="column.type === 'boolean'">
                <slds-icon v-if="cell" icon-name="utility:check" variant="default" size="x-small"/>
            </span>

            <span v-else-if="column.type === 'avatar'">
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

            <slds-menu v-if="column.type === 'action'" :items="column.actions" size="small" position="right"/>

            <slds-button v-else-if="column.type === 'button'"
                         :label="column.typeAttributes.label"
                         :variant="column.typeAttributes.variant"
                         :class="column.typeAttributes.class"/>

        </span>

    </td>
</template>

<script>
    export default {
        name: 'SldsCell',
        props: {
            cell: {
                required: true,
            },
            column: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {}
        },
        computed: {
            hasCopyButton() {
                switch (this.column.type) {
                    case 'avatar':
                    case 'action':
                    case 'boolean':
                    case 'button':
                    case 'button-icon':
                        return false;

                    default:
                        if (this.column.hasCopyButton != null) return this.column.hasCopyButton;
                        return true;
                }
            },
            isOutput() {
                switch (this.column.type) {
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
