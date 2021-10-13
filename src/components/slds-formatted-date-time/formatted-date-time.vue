<template>
    <span>
        {{ this.$data.$_value }}
    </span>
</template>

<script>
import moment from 'moment'

export default {
    name: 'SldsFormattedDateTime',

    props: {
        format: [String, Array],
        locale: String,
        value: [Number, String, Date]
    },

    data() {
        return {
            $_value: this.value,
        }
    },

    watch: {
        value() {
            this.formatValue()
        }
    },

    created() {
        this.formatValue()
    },

    methods: {
        formatValue() {
            if (this.locale?.toLowerCase() === 'pt-br' || this.locale?.toLowerCase() === 'br') moment.locale('pt-br')
            else if (this.locale?.toLowerCase() === 'es-es' || this.locale?.toLowerCase() === 'es') moment.locale('es')

            if (Array.isArray(this.format)) {
                this.$data.$_value = this.format
                    .map(format => moment(this.value).format(format))
                    .join(' ')
            }
            else if (this.format) {
                this.$data.$_value = moment(this.value).format(this.format)
            }
            else {
                this.$data.$_value = moment(this.value).format()
            }
        },
    },
}
</script>
