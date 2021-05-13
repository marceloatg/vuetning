function isUnselectableOption(option) {
    return option.disabled || option.heading || option.divider
}

export default {
    props: {
        loading: Boolean,
    },

    data() {
        return {
            $_filter: null,
            $_focusedOption: null,
            $_isOpen: false,
            $_options: [],
        }
    },

    computed: {
        dropdownTransitionProperties() {
            const isAnimated = (this.$vuetning && this.$vuetning.hasAnimations)
            return isAnimated ? {name: 'dropdown'} : {duration: 0}
        },

        filteredOptions() {
            if (this.$data.$_filter == null) return this.$data.$_options

            return this.$data.$_options.filter((item) => {
                if (item.heading != null) return true
                return String(item.label).toLowerCase().indexOf(this.$data.$_filter.toLowerCase()) !== -1
            })
        },

        isEmpty() {
            return !this.loading && this.filteredOptions.length === 0
        }
    },

    methods: {
        clearFilter() {
            this.$data.$_filter = null
        },

        clearFocusedOption() {
            this.$data.$_focusedOption = null
        },

        hideDropdown() {
            this.$data.$_isOpen = false
        },

        showDropdown() {
            this.$data.$_isOpen = true
        },

        setFocusedOptionDown() {
            let index = this.filteredOptions.findIndex(item => item.value === this.$data.$_focusedOption)

            do {
                index++
                if (index === this.filteredOptions.length) index = 0
            } while (isUnselectableOption(this.filteredOptions[index]))

            this.$data.$_focusedOption = this.filteredOptions[index].value
        },

        setFocusedOptionUp() {
            let index = this.filteredOptions.findIndex(index => index.value === this.$data.$_focusedOption)

            do {
                index--
                if (index === -1) index = this.filteredOptions.length - 1
            } while (isUnselectableOption(this.filteredOptions[index]))

            this.$data.$_focusedOption = this.filteredOptions[index].value
        },

        toggleDropdown() {
            this.$data.$_isOpen = !this.$data.$_isOpen
        }
    }
}
