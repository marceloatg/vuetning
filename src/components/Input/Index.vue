<template>
    <label>
        {{ label }}
        <input
            :value="value"
            v-bind="$attrs"
            @input="$emit('input', $event.target.value)"
            v-on="listeners">

    </label>
</template>

<script>
    export default {
        name: 'Input',
        inheritAttrs: false,
        props: ['label', 'value'],
        computed: {
            listeners () {
                const listeners = {...this.$listeners};
                delete listeners.input;
                return listeners
            }
        },
    }
</script>

<style scoped lang="scss">

</style>
