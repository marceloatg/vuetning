<template>
    <div class="slds-form-element" role="group">

        <!-- Label -->
        <span id="picklist-group-label" class="slds-form-element__label slds-form-element__legend">
            <abbr v-if="required" class="slds-required" title="Required">*</abbr> {{ label }}
        </span>

        <!-- Control -->
        <div class="slds-form-element__control">
            <div class="slds-dueling-list">

                <div id="drag-live-region" class="slds-assistive-text" aria-live="assertive"/>

                <!-- Source -->
                <div class="slds-dueling-list__column">

                    <!-- Label -->
                    <span class="slds-form-element__label">
                        {{ sourceLabel }}
                    </span>

                    <!-- Items -->
                    <div class="slds-dueling-list__options" :class="{'slds-is-disabled': disabled}">
                        <transition-group name="listbox-source" tag="ul" role="listbox" class="slds-listbox slds-listbox_vertical">
                            <dueling-picklist-option
                                v-for="(option, index) in sourceOptions"
                                :key="option.value"
                                :index="index"
                                :label="option.label"
                                :meta="option.meta"
                                :value="option.value"
                                :is-selected="selectedValues.includes(option.value)"
                                @click="onClick('source', option.value, index)"
                                @ctrl-click="onCtrlClick('source', option.value, index)"
                                @shift-click="onShiftClick('source', option.value, index)"/>
                        </transition-group>
                    </div>

                </div>

                <!-- Selection buttons -->
                <div class="slds-dueling-list__column">
                    <slds-button-icon bare icon="utility:right" :disabled="disabled" @click="onclickSelect"/>
                    <slds-button-icon bare icon="utility:left" :disabled="disabled" @click="onclickDeselect "/>
                </div>

                <!-- Selected -->
                <div class="slds-dueling-list__column">

                    <!-- Label -->
                    <span id="label-106" class="slds-form-element__label">{{ selectedLabel }}</span>

                    <!-- Items -->
                    <div class="slds-dueling-list__options" :class="{'slds-is-disabled': disabled}">
                        <transition-group name="listbox-selected" tag="ul" role="listbox" class="slds-listbox slds-listbox_vertical">
                            <dueling-picklist-option
                                v-for="(option, index) in selectedOptions"
                                :key="option.value"
                                :index="index"
                                :label="option.label"
                                :meta="option.meta"
                                :value="option.value"
                                :disabled="option.disabled"
                                :is-selected="selectedValues.includes(option.value)"
                                class="listbox-item"
                                @click="onClick('selected', option.value, index)"
                                @ctrl-click="onCtrlClick('selected', option.value, index)"
                                @shift-click="onShiftClick('selected', option.value, index)"/>
                        </transition-group>
                    </div>

                </div>

                <!-- Ordering buttons -->
                <div v-if="reorderable" class="slds-dueling-list__column">
                    <slds-button-icon bare icon="utility:up" :disabled="disabled" @click="onClickUp"/>
                    <slds-button-icon bare icon="utility:down" :disabled="disabled" @click="onClickDown"/>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import DuelingPicklistOption from "./option";

    export default {
        name: "SldsDuelingPicklist",
        components: {DuelingPicklistOption},
        props: {
            disabled: {
                type: Boolean,
            },
            label: {
                type: String,
            },
            min: {
                type: Number,
            },
            max: {
                type: Number,
            },
            options: {
                type: Array,
                default: () => [],
            },
            reorderable: {
                type: Boolean,
            },
            required: {
                type: Boolean,
            },
            sourceLabel: {
                type: String,
            },
            selectedLabel: {
                type: String,
            },
            value: {
                type: Array,
            },
        },
        data() {
            return {
                lastIndex: null,
                lastList: null,
                selectedList: null,
                selectedOptions: [],
                selectedValues: [],
                sourceOptions: [],
                values: [],
            }
        },
        watch: {
            value(newValues) {
                if (JSON.stringify(newValues) === JSON.stringify(this.values)) return;
                this.initializeOptions();
            },
        },
        created() {
            this.initializeOptions();
        },
        methods: {
            calculateValues() {
                this.values = this.selectedOptions.map(option => option.value);
            },
            initializeOptions() {
                this.selectedOptions.splice(0, this.selectedOptions.length);
                this.sourceOptions.splice(0, this.sourceOptions.length);

                this.sourceOptions = [...this.options];

                for (let value of this.value) {
                    let selectedOption = this.sourceOptions.find(option => option.value === value);
                    let index = this.sourceOptions.indexOf(selectedOption);

                    this.sourceOptions.splice(index, 1);
                    this.selectedOptions.push(selectedOption);
                }

                this.calculateValues();
            },
            onClick(list, selectedValue, index) {
                if (this.disabled) return;

                this.selectedList = list;
                this.selectedValues.splice(0, this.selectedValues.length);
                this.selectedValues.push(selectedValue);
                this.lastIndex = index;
                this.lastList = list;
            },
            onCtrlClick(list, selectedValue, index) {
                if (this.disabled) return;

                if (this.lastList !== list) {
                    this.onClick(list, selectedValue, index);
                    return;
                }

                if (this.selectedList !== list) {
                    this.selectedValues.splice(0, this.selectedValues.length);
                    this.selectedList = list;
                }

                const listIndex = this.selectedValues.indexOf(selectedValue);
                if (listIndex === -1) this.selectedValues.push(selectedValue);
                else this.selectedValues.splice(listIndex, 1);

                this.lastIndex = index;
                this.lastList = list;
            },
            onShiftClick(list, selectedValue, index) {
                if (this.disabled) return;

                if (this.lastList !== list) {
                    this.onClick(list, selectedValue, index);
                    return;
                }

                if (this.selectedList !== list) {
                    this.selectedValues.splice(0, this.selectedValues.length);
                    this.selectedList = list;
                }

                let selectedValues = [];
                const start = (this.lastIndex < index) ? this.lastIndex : index;
                const end = (this.lastIndex > index) ? this.lastIndex + 1 : index + 1;

                for (let i = start; i < end; i++) {
                    if (list === 'source') selectedValues.push(this.sourceOptions[i].value);
                    else selectedValues.push(this.selectedOptions[i].value)
                }

                for (let selectedValue of selectedValues) {
                    const listIndex = this.selectedValues.indexOf(selectedValue);
                    if (listIndex === -1) this.selectedValues.push(selectedValue);
                }

                this.lastIndex = index;
                this.lastList = list;
            },
            onclickSelect() {
                if (this.selectedValues.length === 0) return;
                if (this.selectedList !== 'source') return;

                if (this.max) {
                    const newLength = this.values.length + this.selectedValues.length;
                    if (newLength > this.max) return;
                }

                for (let selectedValue of this.selectedValues) {
                    let selectedOption = this.sourceOptions.find(option => option.value === selectedValue);
                    let index = this.sourceOptions.indexOf(selectedOption);

                    this.sourceOptions.splice(index, 1);
                    this.selectedOptions.push(selectedOption);
                }

                this.selectedValues.splice(0, this.selectedValues.length);
                this.selectedList = null;

                this.calculateValues();
                this.$emit('input', this.values);
            },
            onclickDeselect() {
                if (this.selectedValues.length === 0) return;
                if (this.selectedList !== 'selected') return;

                if (this.min) {
                    const newLength = this.values.length - this.selectedValues.length;
                    if (newLength < this.min) return;
                }

                for (let selectedValue of this.selectedValues) {
                    let selectedOption = this.selectedOptions.find(option => option.value === selectedValue);
                    let index = this.selectedOptions.indexOf(selectedOption);

                    this.selectedOptions.splice(index, 1);
                    this.sourceOptions.push(selectedOption);
                }

                this.selectedValues.splice(0, this.selectedValues.length);
                this.selectedList = null;

                this.calculateValues();
                this.$emit('input', this.values);
            },
            onClickUp() {
                if (this.selectedValues.length === 0) return;
                if (this.selectedList === 'source') return;

                let selectedOptionsByIndex = new Map();

                for (let selectedValue of this.selectedValues) {
                    const selectedOption = this.selectedOptions.find(option => option.value === selectedValue);
                    const index = this.selectedOptions.indexOf(selectedOption);
                    selectedOptionsByIndex.set(index, selectedOption);
                }

                selectedOptionsByIndex = new Map([...selectedOptionsByIndex.entries()].sort());

                for (let [index, option] of selectedOptionsByIndex.entries()) {
                    if (index === 0) continue;
                    this.selectedOptions.splice(index, 1);
                    this.selectedOptions.splice(index - 1, 0, option);
                }

                this.calculateValues();
                this.$emit('input', this.values);
            },
            onClickDown() {
                if (this.selectedValues.length === 0) return;
                if (this.selectedList === 'source') return;

                let selectedOptionsByIndex = new Map();

                for (let selectedValue of this.selectedValues) {
                    const selectedOption = this.selectedOptions.find(option => option.value === selectedValue);
                    const index = this.selectedOptions.indexOf(selectedOption);
                    selectedOptionsByIndex.set(index, selectedOption);
                }

                selectedOptionsByIndex = new Map([...selectedOptionsByIndex.entries()].sort().reverse());
                console.log(selectedOptionsByIndex)

                for (let [index, option] of selectedOptionsByIndex.entries()) {
                    if (index === (this.selectedOptions.length - 1)) continue;
                    this.selectedOptions.splice(index, 1);
                    this.selectedOptions.splice(index + 1, 0, option);
                }

                this.calculateValues();
                this.$emit('input', this.values);
            },
        },
    }
</script>

<style scoped lang="scss">
    .slds-dueling-list__options {
        overflow-x: hidden;
    }

    .listbox-source-enter, .listbox-source-leave-to {
        opacity: 0;
        transform: translateX(1rem);
    }

    .listbox-selected-enter, .listbox-selected-leave-to {
        opacity: 0;
        transform: translateX(-1rem);
    }

    .listbox-leave-active {
    }
</style>
