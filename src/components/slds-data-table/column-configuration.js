import {v4 as uuid} from 'uuid';

export default class ColumnConfiguration {
    constructor(column) {
        this.id = uuid();
        this.type = (column.type != null) ? column.type : 'text';
        this.label = (column.label != null) ? column.label : null;
        this.fieldName = (column.fieldName != null) ? column.fieldName : null;
        this.width = (column.width != null) ? column.width : null;
        this.hasCopyButton = (column.hasCopyButton != null) ? column.hasCopyButton : true;
        this.resizable = (column.resizable != null) ? column.resizable : true;
        this.sortable = (column.sortable != null) ? column.sortable : true;
        this.sortBy = (column.sortBy != null) ? column.sortBy : null;
        this.hasMenu = (column.hasMenu != null) ? column.hasMenu : false;
        this.sortedAscending = false;
        this.sortedDescending = false;
        this.fullWidth = null;

        if (['avatar', 'badge', 'boolean', 'button', 'icon'].includes(this.type)) {
            this.hasCopyButton = false;
        }

        if (['avatar', 'button', 'icon'].includes(this.type)) {
            this.sortable = false;
        }

        this.offsetLeft = null;
        this.left = null;
    }
}
