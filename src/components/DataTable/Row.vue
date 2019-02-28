<template>
    <tr class="slds-hint-parent" :class="{'slds-is-selected': isSelected}">

        <td v-if="showRowNumberColumn" class="slds-cell-edit slds-cell-error slds-text-align_center">
            <span class="slds-row-number slds-text-body_small slds-text-color_weak"/>
        </td>

        <td v-if="showRowSelectionColumn" class="slds-text-align_center">
            <slds-checkbox :checked="isSelected" variant="inline" @input="onSelect($event)"/>
        </td>

        <template v-for="(column, index) in columns">

            <slds-cell-action
                v-if="column.type === 'action'"
                :align="column.align"
                :key="index"
                :type-attributes="column.typeAttributes"/>

            <slds-cell-avatar
                v-else-if="column.type === 'avatar'"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :key="index"/>

            <slds-cell-badge
                v-else-if="column.type === 'badge'"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :key="index"/>

            <slds-cell-boolean
                v-else-if="column.type === 'boolean'"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :key="index"/>

            <slds-cell-button
                v-else-if="column.type === 'button'"
                :align="column.align"
                :key="index"
                :type-attributes="column.typeAttributes"/>

            <slds-cell-email
                v-else-if="column.type === 'email'"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :has-copy-button="column.hasCopyButton"
                :key="index"/>

            <slds-cell-link
                v-else-if="column.type === 'link'"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :has-copy-button="column.hasCopyButton"
                :key="index"/>

            <slds-cell-number
                v-else-if="column.type === 'number'"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :has-copy-button="column.hasCopyButton"
                :key="index"
                :type-attributes="column.typeAttributes"/>

            <slds-cell-text
                v-else-if="column.type === 'text'"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :has-copy-button="column.hasCopyButton"
                :key="index"/>

        </template>

    </tr>
</template>

<script>
    import SldsCellAction from './Cell/Action';
    import SldsCellAvatar from './Cell/Avatar';
    import SldsCellBadge from './Cell/Badge';
    import SldsCellBoolean from './Cell/Boolean';
    import SldsCellButton from './Cell/Button';
    import SldsCellEmail from './Cell/Email';
    import SldsCellLink from './Cell/Link';
    import SldsCellNumber from './Cell/Number';
    import SldsCellText from './Cell/Text';

    export default {
        components: {
            SldsCellAction,
            SldsCellAvatar,
            SldsCellBadge,
            SldsCellBoolean,
            SldsCellButton,
            SldsCellEmail,
            SldsCellLink,
            SldsCellNumber,
            SldsCellText,
        },
        props: {
            columns: {
                type: Array,
                required: true,
            },
            isSelected: {
                type: Boolean,
                default: false,
            },
            row: {
                type: Object,
                required: true
            },
            showRowNumberColumn: {
                type: Boolean,
                default: true,
            },
            showRowSelectionColumn: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            getCell(fieldName) {
                const fields = fieldName.split('.');
                let cell = this.row[fields[0]];

                for (let i = 1; i < fields.length; i++) {
                    cell = cell[fields[i]];
                }

                return cell;
            },
            onSelect(event) {
                this.$emit('select', event);
            },
        },
    }
</script>