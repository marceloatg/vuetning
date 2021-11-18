<script>
export default {
    name: 'SldsDataTableClicker',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        delay: {
            type: Number,
            default: 250
        }
    },
    data() {
        return {
            clickCount: 0,
            clickTimer: null
        }
    },
    methods: {
        handleClick(e) {
            e.preventDefault()

            this.clickCount++

            if (this.clickCount === 1) {
                this.clickTimer = setTimeout(() => {
                    this.clickCount = 0
                    this.$emit('single-click')
                }, this.delay)
            }
            else if (this.clickCount === 2) {
                clearTimeout(this.clickTimer)
                this.clickCount = 0
                this.$emit('double-click')
            }
        }
    },
    render(createElement) {
        return createElement(
            this.tag,
            {
                on: Object.assign(this.$listeners, {
                    click: this.handleClick
                })
            },
            this.$slots.default
        )
    }
}
</script>
