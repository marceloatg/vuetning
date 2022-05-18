<template>
    <slds-form-element
        :label="label"
        :required="required"
        :error="error"
        v-bind="dataAttributes"
    >

        <div class="slds-dueling-list">

            <div class="slds-dueling-list__column">

                <!-- Source label -->
                <span class="slds-form-element__label">
                    {{ sourceLabel }}
                </span>

                <!-- Available options -->
                <div
                    :aria-disabled="disabled"
                    class="slds-dueling-list__options"
                    :class="disableDuelingPicklistClass"
                >
                    <ul
                        class="slds-listbox slds-listbox_vertical"
                        role="listbox"
                    >
                        <slds-dueling-picklist-option
                            v-for="option in options"
                            :key="option.value"
                            :label="option.label"
                            @click="onClickUnselectedOption(option.value)"
                        />
                    </ul>
                </div>

            </div>

            <div class="slds-dueling-list__column">

                <!-- Move right button -->
                <slds-button-icon
                    bare
                    icon="utility:right"
                />

                <!-- Move left button -->
                <slds-button-icon
                    bare
                    icon="utility:left"
                />

            </div>

            <div class="slds-dueling-list__column">

                <!-- Selected label -->
                <span class="slds-form-element__label">
                    {{ selectedLabel }}
                </span>

                <!-- Selected options -->
                <div
                    :aria-disabled="disabled"
                    class="slds-dueling-list__options"
                    :class="disableDuelingPicklistClass"
                >
                    <ul
                        class="slds-listbox slds-listbox_vertical"
                        role="listbox"
                    >
                        <slds-dueling-picklist-option
                            v-for="option in selected"
                            :key="option.value"
                            :label="option.label"
                            @click="onClickSelectedOption(option.value)"
                        />
                    </ul>
                </div>

            </div>

            <div class="slds-dueling-list__column">

                <!-- Move up button -->
                <slds-button-icon
                    bare
                    icon="utility:up"
                    @click="oneToRight"
                />

                <!-- Move down button -->
                <slds-button-icon
                    bare
                    icon="utility:down"
                />

            </div>

        </div>

        <div class="slds-dueling-list">

            <div class="slds-dueling-list__column">

                <!-- Source label -->
                <span class="slds-form-element__label">
                    {{ sourceLabel }}
                </span>

                <!-- Available options -->
                <div
                    :aria-disabled="disabled"
                    class="slds-dueling-list__options"
                    :class="disableDuelingPicklistClass"
                >
                    <select id="list1" size="30" multiple>
                        <option
                            v-for="option in options"
                            :key="option.value"
                        >
                            {{ option.label }}
                        </option>
                    </select>
                </div>

            </div>

            <div class="slds-dueling-list__column">

                <!-- Move right button -->
                <slds-button-icon
                    bare
                    icon="utility:right"
                    @click="oneToRight"
                />

                <!-- Move left button -->
                <slds-button-icon
                    bare
                    icon="utility:left"
                    @click="oneToLeft"
                />

            </div>

            <div class="slds-dueling-list__column">

                <!-- Selected label -->
                <span class="slds-form-element__label">
                    {{ selectedLabel }}
                </span>

                <!-- Selected options -->
                <div
                    :aria-disabled="disabled"
                    class="slds-dueling-list__options"
                    :class="disableDuelingPicklistClass"
                >
                    <select id="list2" size="30" multiple>
                        <option
                            v-for="option in selected"
                            :key="option.value"
                        >
                            {{ option }}
                        </option>
                    </select>
                </div>

            </div>

            <div class="slds-dueling-list__column">

                <!-- Move up button -->
                <slds-button-icon
                    bare
                    icon="utility:up"
                />

                <!-- Move down button -->
                <slds-button-icon
                    bare
                    icon="utility:down"
                />

            </div>

        </div>

    </slds-form-element>
</template>

<script>
import SldsFormElement from '@/components/slds-form-element/slds-form-element'
import SldsDuelingPicklistOption from '@/components/slds-dueling-picklist/slds-dueling-picklist-option'

export default {
    name: 'SldsDuelingPicklist',

    components: {
        SldsFormElement,
        SldsDuelingPicklistOption,
    },

    props: {
        /**
         * @description If present, the dueling picklist is disabled and users cannot interact with it.
         * @type {boolean}
         */
        disabled: Boolean,

        /**
         * @description Indicates whether this component has an error.
         * @type {boolean}
         */
        error: Boolean,

        /**
         * @description Help text detailing the purpose and function of the dueling picklist.
         * @type {string}
         */
        fieldLevelHelp: String,

        /**
         * @description Label for the dueling picklist.
         * @type {string}
         */
        label: {type: String, required: true},

        /**
         * @description	A list of options that are available for selection. Each option has the following attributes: label and value.
         * @type {string}
         */
        options: {type: Array, required: true},

        /**
         * @description Indicates whether this field is required.
         * @type {boolean}
         */
        required: Boolean,

        /**
         * @description Label for the selected dueling picklist.
         * @type {string}
         */
        selectedLabel: {type: String, required: true},

        /**
         * @description Label for the source options dueling picklist.
         * @type {string}
         */
        sourceLabel: {type: String, required: true},

        value: {type: Array, default: () => []},
    },

    data() {
        return {
            $_value: this.value,

            selected: [],
        }
    },

    computed: {
        dataAttributes() {
            const attributes = {...this.$attrs}

            for (const attributesKey in attributes) {
                if (!attributesKey.startsWith('data-')) {
                    delete attributes[attributesKey]
                }
            }

            return attributes
        },

        disableDuelingPicklistClass() {
            return {
                'slds-is-disabled': this.disabled,
            }
        }
    },

    methods: {
        onClickUnselectedOption(value) {
            this.$data.$_value.push(value)
            this.$emit('input', this.$data.$_value)

            this.selected.push(value)
        },

        onClickSelectedOption(value) {
            const index = this.$data.$_value.findIndex(v => v === value)

            this.$data.$_value.splice(index, 1)
            this.$emit('input', this.$data.$_value)
        },

        oneToRight() {
            const select = document.getElementById('list1').value

            if (select !== '') {
                this.selected.push(select)
                const del = this.options.indexOf(select)
                this.options.splice(del, 1)
            }
        },

        oneToLeft() {
            const select = document.getElementById('list2').value

            if (select !== '') {
                this.options.push(select)
                const del = this.selected.indexOf(select)
                this.selected.splice(del, 1)
            }
        }
    }
}
</script>

<style scoped>

</style>
