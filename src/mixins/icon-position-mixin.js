export default {
    props: {
        left: Boolean,
        right: Boolean,
    },

    data() {
        return {
            $_left: true,
            $_right: false,
        }
    },

    watch: {
        left(value) {
            this.data.$_left = value
            this.data.$_right = !value
        },

        right(value) {
            this.data.$_left = !value
            this.data.$_right = value
        },
    },

    created() {
        if (this.right) {
            this.$data.$_left = false
            this.$data.$_right = true
        }
    }
}
