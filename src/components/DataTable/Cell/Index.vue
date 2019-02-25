<script>
    export default {
        props: {
            align: {
                type: String,
                default: 'left',
            },
            typeAttributes: {
                type: Object,
            },
        },
        computed: {
            alignment() {
                if (this.align === 'center') return 'slds-grid_align-center';
                if (this.align === 'right') return 'slds-grid_align-end';
                return 'slds-grid_align-spread';
            },
        },
    }
</script>