<template>
    <div>
        {{ formattedIndex }}
    </div>
</template>

<script>
    import {IdState} from 'vue-virtual-scroller'
    import 'numeral/locales/pt-br'
    import numeral from 'numeral'

    numeral.locale('pt-br');

    export default {
        mixins: [
            IdState({
                idProp: vm => vm.item.id,
            }),
        ],

        props: {
            index: Number,
            item: Object,
        },

        idState() {
            return {
                formattedIndex: null,
            }
        },

        computed: {
            formattedIndex() {
                console.log('Foo')
                return numeral(this.index + 1).format('0,0');
            },
        },
    }
</script>
