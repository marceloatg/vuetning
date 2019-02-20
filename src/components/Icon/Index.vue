<template>
    <span class="slds-icon_container" :class="backgroundColor">
        <slds-svg :icon-name="iconName" class="slds-icon" :class="[`slds-icon_${size}`, `slds-icon-text-${variant}`]"/>
    </span>
</template>

<script>
    export default {
        props: {
            iconName: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                default: 'medium',
                validator(value) {
                    return [
                        'xx-small',
                        'x-small',
                        'small',
                        'medium',
                        'large',
                    ].indexOf(value) !== -1
                }
            },
            variant: {
                type: String,
                default: 'none',
                validator(value) {
                    return [
                        'none',
                        'inverse',
                        'default',
                        'success',
                        'warning',
                        'error',
                        'light',
                    ].indexOf(value) !== -1
                }
            },
        },
        data() {
            return {
                backgroundColor: null,
            }
        },
        methods: {
            parseBackgroundColor() {
                const classes = this.$el.classList;

                for (let i = 0; i < classes.length; i++) {
                    if (classes[i].startsWith('slds-icon-')) return;
                }

                if (this.iconName == null) return;

                const category = this.iconName.split(':')[0];
                const name = this.iconName.split(':')[1].replace(/_/g, "-");
                return `slds-icon-${category}-${name}`;
            },
        },
        mounted() {
            this.backgroundColor = this.parseBackgroundColor();
        },
    }
</script>