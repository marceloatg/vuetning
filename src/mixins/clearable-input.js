export default {
    created() {
        document.body.addEventListener("keyup", this.onKeyUp);
    },
    beforeDestroy() {
        document.body.removeEventListener("keyup", this.onKeyUp);
    },
    methods: {
        onClear() {
            this.$refs.input.value = null;
            this.$emit('input', null);
        },
        onKeyUp(event) {
            if (event.key === 'Escape' && this.$refs.input === document.activeElement) {
                event.stopPropagation();
                this.onClear();
            }
        },
    },
}
