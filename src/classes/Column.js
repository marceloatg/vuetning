export default class Column {

    // Appends a dropdown menu of actions to a column.
    // You must pass in a list of label-name pairs.
    actions;

    // Provides additional customization, such as horizontal alignment or appending an icon to the output.
    // For more information about alignment, see Aligning Data in a Column.
    // For more information about adding icons, see Appending an Icon to Column Data.
    cellAttributes;

    // Specifies whether a column supports inline editing.
    // The default is false.
    editable = false;

    // Required.
    // The name that binds the columns properties to the associated data.
    // Each columns property must correspond to an item in the data array.
    fieldName;

    // Specifies the width of a column in pixels and makes the column non-resizable.
    fixedWidth;

    // Specifies whether a column has the 'copy to clipboard' button.
    // The default is true.
    hasCopyButton = true;

    // The Lightning Design System icon.
    icon;

    // The width of the column when it's initialized, which must be within the minColumnWidth and maxColumnWidth values,
    // or within 100px and 1000px if they are not provided.
    initialWidth;

    // Required.
    // The text label displayed in the column header.
    label;

    // Column left absolute position.
    left;

    // The minimum width of the column when it's initialized, which must be within the minColumnWidth and maxColumnWidth values,
    // or within 100px and 1000px if they are not provided.
    minimumWidth = 100;

    /// Column left offset.
    offsetLeft;

    // Specifies whether the column can be resizable.
    // The default is true.
    resizable = true;

    // Specifies the current X translation of a resizer.
    resizerTranslation = 0;

    // Specifies whether the column can be sorted.
    // The default is true.
    sortable = true;

    // Specifies rows text alignment.
    // The default is left.
    textAlign = 'left';

    // Required.
    // The data type to be used for data formatting.
    // For more information, see DataType.
    type;

    // Provides custom formatting with component attributes for the data type.
    // For example, currencyCode for the currency type.
    // For more information, see Formatting with Data Types.
    typeAttributes;

    constructor(fieldName, label, type, properties) {

        if (fieldName == null) throw 'Property "fieldName" is required.';
        this.fieldName = fieldName;

        if (label == null) throw 'Property "label" is required.';
        this.label = label;

        if (type == null) throw 'Property "type" is required.';
        switch (type) {
            case 'avatar':
            case 'action':
            case 'boolean':
            case 'button':
            case 'button-icon':
            case 'currency':
            case 'date':
            case 'email':
            case 'link':
            case 'location':
            case 'number':
            case 'percent':
            case 'phone':
            case 'text':
            case 'url':
                this.type = type;
                break;

            default:
                throw `Type "${type}" is not a valid type.`;
        }

        if (!properties) return;

        if (properties.actions !== undefined) this.actions = properties.actions;
        if (properties.fixedWidth !== undefined) this.fixedWidth = properties.fixedWidth;
        if (properties.hasCopyButton !== undefined) this.hasCopyButton = properties.hasCopyButton;
        if (properties.minimumWidth !== undefined) this.minimumWidth = properties.minimumWidth;
        if (properties.resizable !== undefined) this.resizable = properties.resizable;
        if (properties.sortable !== undefined) this.sortable = properties.sortable;
        if (properties.textAlign !== undefined) this.textAlign = properties.textAlign;
        if (properties.typeAttributes !== undefined) this.typeAttributes = properties.typeAttributes;

        if (this.minimumWidth < 100) this.resizable = 100;
        if (this.fixedWidth !== undefined) this.resizable = false;
    }
}
