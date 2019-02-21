<template>
    <svg>
        <use :xlink:href="`/assets/icons/${category}-sprite/svg/symbols.svg#${name}`"></use>
    </svg>
</template>

<script>
    export default {
        props: {
            iconName: {
                type: String,
                required: true,
            },
        },
        computed: {
            category() {
                return this.iconName.split(':')[0];
            },
            name() {
                return this.iconName.split(':')[1];
            }
        },
        created() {
            if (this.iconName.split(':').length !== 2) {
                throw 'Invalid icon-name format.';
            }
        }
    }
</script>