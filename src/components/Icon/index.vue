<template>
    <span class="slds-icon_container" :class="[background, {'slds-current-color':current}]">
        <slds-svg
            :icon="icon"
            class="slds-icon"
            :standard="standard"
            :class="[iconClass, size, variant]"/>
    </span>
</template>

<script>
    import SldsSvg from '../../shared/svg/index'

    export default {
        components: {
            SldsSvg,
        },
        props: {
            current: {
                type: Boolean,
            },
            error: {
                type: Boolean,
            },
            icon: {
                type: String,
                required: true,
            },
            iconClass: {
                type: String,
                required: false,
            },
            inverse: {
                type: Boolean,
            },
            large: {
                type: Boolean,
            },
            light: {
                type: Boolean,
            },
            medium: {
                type: Boolean,
            },
            small: {
                type: Boolean,
            },
            standard: {
                type: Boolean,
            },
            success: {
                type: Boolean,
            },
            xSmall: {
                type: Boolean,
            },
            xxSmall: {
                type: Boolean,
            },
            warning: {
                type: Boolean,
            },
        },
        data() {
            return {
                background: null,
                iconCategory: null,
                iconName: null,
            }
        },
        computed: {
            size() {
                if (this.xxSmall) return 'slds-icon_xx-small';
                if (this.xSmall) return 'slds-icon_x-small';
                if (this.small) return 'slds-icon_small';
                if (this.medium) return 'slds-icon_medium';
                if (this.large) return 'slds-icon_large';
                return 'slds-icon_medium';
            },
            variant() {
                if (this.iconCategory !== 'utility') return '';

                if (this.brand) return 'slds-icon-text-brand';
                if (this.error) return 'slds-icon-text-error';
                if (this.inverse) return 'slds-icon-text-inverse';
                if (this.light) return 'slds-icon-text-light';
                if (this.success) return 'slds-icon-text-success';
                if (this.warning) return 'slds-icon-text-warning';
                return 'slds-icon-text-default';
            },
        },
        watch: {
            icon() {
                this.parseIcon();
                this.parseBackground();
            },
        },
        mounted() {
            this.parseIcon();
            this.parseBackground();
        },
        methods: {
            parseBackground() {
                const classes = this.$el.classList;
                if (this.background != null) classes.remove(this.background);

                for (let i = 0; i < classes.length; i++) {
                    if (classes[i].startsWith('slds-icon-')) return;
                }

                if (this.icon == null) return;
                this.background = `slds-icon-${this.iconCategory}-${this.iconName}`;
            },
            parseIcon() {
                if (this.icon == null) return;

                this.iconCategory = this.icon.split(':')[0];
                this.iconName = this.icon.split(':')[1].replace(/_/g, "-");
            },
        },
    }
</script>
