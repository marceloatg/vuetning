export default {
    mounted() {
        this.$refs.input.addEventListener("keyup", this.onKeyUp);
    },
    beforeDestroy() {
        this.$refs.input.removeEventListener("keyup", this.onKeyUp);
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
