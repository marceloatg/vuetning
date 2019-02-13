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
                note:
                    'The Lightning Design System name of the icon. ' +
                    'Names are written in the format "utility:down" where "utility" is the category, and "down" is the specific icon to be displayed.'
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