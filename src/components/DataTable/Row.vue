<template>
    <tr class="slds-hint-parent" :class="{'slds-is-selected': isSelected}">

        <td v-if="hasNumberColumn" class="slds-cell-edit slds-cell-error slds-text-align_center">
            <span class="slds-row-number slds-text-body_small slds-text-color_weak"/>
        </td>

        <td v-if="hasCheckboxColumn" class="slds-text-align_center">
            <slds-checkbox :checked="isSelected" variant="inline" @input="onSelect($event)"/>
        </td>

        <td v-if="hasCheckboxButtonColumn" class="slds-text-align_center">
            <slds-checkbox-button
                :checked="isSelected"
                class="slds-align_absolute-center"
                @input="onSelect($event)"/>
        </td>

        <template v-for="(column, index) in columns">

            <slds-cell-action
                v-if="column.type === 'action'"
                :key="index"
                :align="column.align"
                :type-attributes="column.typeAttributes"/>

            <slds-cell-action-link
                v-else-if="column.type === 'action-link'"
                :key="index"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :has-copy-button="column.hasCopyButton"
                :type-attributes="column.typeAttributes"
                @action="onAction"/>

            <slds-cell-avatar
                v-else-if="column.type === 'avatar'"
                :key="index"
                :align="column.align"
                :cell="getCell(column.fieldName)"/>

            <slds-cell-badge
                v-else-if="column.type === 'badge'"
                :key="index"
                :align="column.align"
                :cell="getCell(column.fieldName)"/>

            <slds-cell-boolean
                v-else-if="column.type === 'boolean'"
                :key="index"
                :align="column.align"
                :cell="getCell(column.fieldName)"/>

            <slds-cell-button
                v-else-if="column.type === 'button'"
                :key="index"
                :cell="getCell(column.fieldName)"
                :align="column.align"
                :type-attributes="column.typeAttributes"
                @action="onAction"/>

            <slds-cell-date
                v-else-if="column.type === 'date'"
                :key="index"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :has-copy-button="column.hasCopyButton"
                :type-attributes="column.typeAttributes"/>

            <slds-cell-duration
                v-else-if="column.type === 'duration'"
                :key="index"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :has-copy-button="column.hasCopyButton"/>

            <slds-cell-email
                v-else-if="column.type === 'email'"
                :key="index"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :has-copy-button="column.hasCopyButton"/>

            <slds-cell-number
                v-else-if="column.type === 'number'"
                :key="index"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :has-copy-button="column.hasCopyButton"
                :type-attributes="column.typeAttributes"/>

            <slds-cell-text
                v-else-if="column.type === 'text'"
                :key="index"
                :align="column.align"
                :cell="getCell(column.fieldName)"
                :has-copy-button="column.hasCopyButton"/>

        </template>

    </tr>
</template>

<script>
    import SldsCellAction from './Cell/Action';
    import SldsCellActionLink from './Cell/ActionLink';
    import SldsCellAvatar from './Cell/Avatar';
    import SldsCellBadge from './Cell/Badge';
    import SldsCellBoolean from './Cell/Boolean';
    import SldsCellButton from './Cell/Button';
    import SldsCellDate from './Cell/Date';
    import SldsCellDuration from './Cell/Duration';
    import SldsCellEmail from './Cell/Email';
    import SldsCellNumber from './Cell/Number';
    import SldsCellText from './Cell/Text';

    export default {
        components: {
            SldsCellAction,
            SldsCellActionLink,
            SldsCellAvatar,
            SldsCellBadge,
            SldsCellBoolean,
            SldsCellButton,
            SldsCellDate,
            SldsCellDuration,
            SldsCellEmail,
            SldsCellNumber,
            SldsCellText,
        },
        props: {
            columns: {
                type: Array,
                required: true,
            },
            hasCheckboxButtonColumn: {
                type: Boolean,
                default: false,
            },
            hasCheckboxColumn: {
                type: Boolean,
                default: false,
            },
            hasNumberColumn: {
                type: Boolean,
                default: true,
            },
            isSelected: {
                type: Boolean,
                default: false,
            },
            row: {
                type: Object,
                required: true
            },
        },
        methods: {
            getCell(fieldName) {
                if (fieldName == null) return null;

                const fields = fieldName.split('.');
                let cell = this.row[fields[0]];

                for (let i = 1; i < fields.length; i++) {
                    cell = cell[fields[i]];
                }

                return cell;
            },
            onAction(action) {
                this.$emit('action', action);
            },
            onSelect(event) {
                this.$emit('select', event);
            },
        },
    }
</script>
