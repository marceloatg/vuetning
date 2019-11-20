<template>
    <div class="slds-popover slds-popover_tooltip" :class="nubbinPlacements" role="tooltip">
        <div class="slds-popover__body">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            topRight: {
                type: Boolean,
            },
            top: {
                type: Boolean,
            },
            topLeft: {
                type: Boolean,
            },
            bottomRight: {
                type: Boolean,
            },
            bottom: {
                type: Boolean,
            },
            bottomLeft: {
                type: Boolean,
            },
            rightTop: {
                type: Boolean,
            },
            right: {
                type: Boolean,
            },
            leftTop: {
                type: Boolean,
            },
            rightBottom: {
                type: Boolean,
            },
            left: {
                type: Boolean,
            },
            leftBottom: {
                type: Boolean,
            },
        },
        computed: {
            nubbinPlacements() {
                if (this.left) return 'slds-nubbin_left';
                else if (this.leftTop) return 'slds-nubbin_left-top';
                else if (this.leftBottom) return 'slds-nubbin_left-bottom';
                else if (this.top) return 'slds-nubbin_top';
                else if (this.topLeft) return 'slds-nubbin_top-left';
                else if (this.topRight) return 'slds-nubbin_top-right';
                else if (this.right) return 'slds-nubbin_right';
                else if (this.rightTop) return 'slds-nubbin_right-top';
                else if (this.rightBottom) return 'slds-nubbin_right-bottom';
                else if (this.bottom) return 'slds-nubbin_bottom';
                else if (this.bottomLeft) return 'slds-nubbin_bottom-left';
                else if (this.bottomRight) return 'slds-nubbin_bottom-right';
                else return null;
            },
        },
    }
</script>
