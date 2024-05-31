<template>
    <slds-form-element
        :errors="errors"
        :help="help"
        :label="label"
        :required="required"
        :stacked="stacked"
        :suppress-errors="isOpen"
        v-bind="formElementAttributes"
    >

        <!-- Default slot -->
        <template #default="slotProps">
            <div v-click-outside="hideDropdown" :class="containerClassNames">
                <div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_right">

                    <!-- Input -->
                    <input
                        :id="slotProps['inputId']"
                        ref="input"
                        class="slds-input"
                        type="text"
                        role="textbox"
                        tabindex="0"
                        :value="inputValue"
                        @input="handleInput"
                        @click="showDropdown"
                        @blur="handleBlur"
                    >

                    <!-- Event icon -->
                    <slds-icon
                        class="slds-input__icon slds-input__icon_right"
                        icon-name="utility:event"
                        x-small
                    />

                    <!-- Calendar -->
                    <div
                        v-if="isOpen"
                        aria-hidden="false"
                        class="slds-datepicker slds-dropdown slds-dropdown_left"
                        role="dialog"
                    >
                        <div class="slds-datepicker__filter slds-grid">

                            <div class="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow">

                                <!-- Previous month button -->
                                <div class="slds-align-middle">
                                    <slds-button-icon
                                        assistive-text="Previous Month"
                                        icon-name="utility:left"
                                        @click="handlePreviousMonth"
                                    />
                                </div>

                                <!-- Current month label -->
                                <h2
                                    id="defaultPicker-month"
                                    aria-atomic="false"
                                    aria-live="polite"
                                    class="slds-align-middle"
                                >
                                    {{ currentMonthName }}
                                </h2>

                                <!-- Next month button -->
                                <div class="slds-align-middle">
                                    <slds-button-icon
                                        assistive-text="Next Month"
                                        icon-name="utility:right"
                                        @click="handleNextMonth"
                                    />
                                </div>

                            </div>

                            <div class="slds-shrink-none">

                                <label class="slds-assistive-text" for="defaultPicker_select">
                                    Pick a Year
                                </label>

                                <div class="slds-select_container">
                                    <select id="defaultPicker_select" class="slds-select" @change="handleYearChange">
                                        <option
                                            v-for="year in yearOptions"
                                            :key="year"
                                            :selected="year === currentYear"
                                        >
                                            {{ year }}
                                        </option>
                                    </select>
                                </div>

                            </div>

                        </div>

                        <table aria-multiselectable="true" class="slds-datepicker__month" role="grid">

                            <thead>

                                <tr id="defaultPicker-weekdays">
                                    <th v-for="day in weekDays" :key="day" scope="col">
                                        <abbr>{{ day }}</abbr>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr v-for="(week, weekIndex) in calendarDays" :key="weekIndex">
                                    <td
                                        v-for="day in week"
                                        :key="day.date"
                                        :class="{
                                            'slds-day_adjacent-month': day.isAdjacent,
                                            'slds-is-today': isToday(day),
                                            'slds-is-selected': isSelected(day)
                                        }"
                                        @click="handleClickDay(day)"
                                    >
                                        <span class="slds-day">{{ day.date }}</span>
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                        <slds-button class="slds-align_absolute-center slds-text-link" @click="handleClickToday">
                            Today
                        </slds-button>

                    </div>

                </div>
            </div>
        </template>

    </slds-form-element>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import { ValidationError } from "../slds-form-element/validation-error"
import SldsIcon from "../slds-icon/slds-icon.vue"
import { vOnClickOutside } from "@vueuse/components"
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import moment from "moment"
import SldsButton from "../slds-button/slds-button.vue"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "slds-datepicker",

    components: { SldsButton, SldsButtonIcon, SldsIcon, SldsFormElement },

    directives: {
        ClickOutside: vOnClickOutside,
    },

    props: {
        /**
         * Array of error objects from vuelidate.
         */
        errors: { type: Array as PropType<ValidationError[]>, default: () => [] as ValidationError[] },

        /**
         * Inline help text.
         * When using the help slot this prop is ignored.
         */
        help: String,

        /**
         * Picklist label.
         */
        label: String,

        /**
         * The value of the date picker.
         */
        modelValue: String,

        /**
         * Indicates whether this label's picklist is required.
         */
        required: Boolean,

        /**
         * Indicates whether the picklist is stacked among other inputs.
         */
        stacked: Boolean,
    },

    data() {
        return {
            /**
             * Calendar days.
             */
            calendarDays: [] as Array<Array<{ date: number; isAdjacent: boolean }>>,

            /**
             * Display date.
             */
            displayDate: moment(),

            /**
             * Input value.
             */
            inputValue: this.modelValue || "",

            /**
             * Indicates whether the dropdown is open.
             */
            isOpen: false,

            /**
             * Selected date.
             */
            selectedDate: this.modelValue ? moment(this.modelValue, "D of MMMM of YYYY") : null,

            /**
             * Today.
             */
            today: moment(),

            /**
             * Year options.
             */
            yearOptions: [],
        }
    },

    computed: {
        /**
         * The CSS class names for the container.
         */
        containerClassNames(): string {
            let classNames = "slds-form-element slds-dropdown-trigger slds-dropdown-trigger_click"

            if (this.isOpen) classNames += " slds-is-open"

            return classNames
        },

        /**
         * Formatted current month name.
         */
        currentMonthName() {
            return this.displayDate.format("MMMM")
        },

        /**
         * Current year.
         */
        currentYear(): number {
            return this.displayDate.year()
        },

        /**
         * The animation name for the dropdown.
         */
        dropdownAnimation(): string {
            return "dropdown"
        },

        /**
         * Bindable form element attributes.
         */
        formElementAttributes(): Record<string, unknown> {
            const attributes: Record<string, unknown> = {}

            for (const attribute in this.$attrs) {
                if (attribute.startsWith("data-") || attribute === "class") {
                    attributes[attribute] = this.$attrs[attribute]
                }
            }

            return attributes
        },

        /**
         * Formatted weekdays.
         */
        weekDays(): string[] {
            return moment.weekdaysShort()
        },
    },

    watch: {
        modelValue(newValue) {
            this.inputValue = newValue || ""
            this.selectedDate = newValue ? moment(newValue, "D of MMMM of YYYY") : null
        },

        selectedDate(newValue) {
            if (newValue !== this.displayDate) {
                this.generateCalendarDays()
            }
        },
    },

    created() {
        this.buildYearOptions()
        this.generateCalendarDays()
    },

    methods: {
        /**
         * Build year options.
         */
        buildYearOptions(): void {
            const startYear = this.currentYear - 100
            const endYear = this.currentYear + 100

            this.yearOptions = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index)
        },

        /**
         * Clear the input.
         */
        clearInput() {
            this.inputValue = ""
            this.selectedDate = null
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, this.inputValue)
        },

        /**
         * Focus on input element.
         */
        async focusOnInputAsync(): Promise<void> {
            await this.$nextTick()
            const focusableElement = this.$refs.input as HTMLElement
            focusableElement.focus()
        },

        /**
         * Generate calendar days.
         */
        generateCalendarDays(): void {
            const startOfMonth = this.displayDate.clone().startOf("month")
            const endOfMonth = this.displayDate.clone().endOf("month")

            // Dias do mês anterior
            const startDayOfWeek = startOfMonth.day()
            const daysFromPrevMonth = []

            if (startDayOfWeek > 0) {
                for (let i = startDayOfWeek - 1; i >= 0; i--) {
                    const day = startOfMonth.clone().subtract(i + 1, "days")
                    daysFromPrevMonth.push({ date: day.date(), isAdjacent: true })
                }
            }

            // Dias do mês atual
            const daysFromCurrentMonth = []
            for (let i = 0; i < endOfMonth.date(); i++) {
                const day = startOfMonth.clone().add(i, "days")
                daysFromCurrentMonth.push({ date: day.date(), isAdjacent: false })
            }

            // Dias do próximo mês
            const endDayOfWeek = endOfMonth.day()
            const daysFromNextMonth = []
            if (endDayOfWeek < 6) {
                for (let i = 1; i <= 6 - endDayOfWeek; i++) {
                    const day = endOfMonth.clone().add(i, "days")
                    daysFromNextMonth.push({ date: day.date(), isAdjacent: true })
                }
            }

            const allDays = [...daysFromPrevMonth, ...daysFromCurrentMonth, ...daysFromNextMonth]

            // Garantir que haja sempre 42 dias (6 semanas)
            const totalDays = 42
            const extraDaysNeeded = totalDays - allDays.length
            if (extraDaysNeeded > 0) {
                for (let i = 1; i <= extraDaysNeeded; i++) {
                    const day = endOfMonth.clone().add(daysFromNextMonth.length + i, "days")
                    allDays.push({ date: day.date(), isAdjacent: true })
                }
            }

            const weeks = []
            while (allDays.length > 0) {
                weeks.push(allDays.splice(0, 7))
            }

            this.calendarDays = weeks
        },

        /**
         * Handles the blur event on the input.
         */
        handleBlur(): void {
            const dateRegex = /^\d{1,2} of \w+ of \d{4}$/

            if (!dateRegex.test(this.inputValue)) {
                this.clearInput()
            }
            else
            {
                const parsedDate = moment(this.inputValue, "D of MMMM of YYYY", true)

                if (!parsedDate.isValid()) {
                    this.clearInput()
                }
                else
                {
                    this.selectedDate = parsedDate
                    this.displayDate = parsedDate.clone()
                }
            }
        },

        /**
         * Handles the click on a calendar day.
         * @param day
         */
        handleClickDay(day: { date: number; isAdjacent: boolean }): void {
            const selectedDate = this.displayDate.clone().date(day.date)

            if (day.isAdjacent) {
                if (day.date > 15) {
                    // Dia é do mês anterior
                    selectedDate.subtract(1, "month")
                } else {
                    // Dia é do próximo mês
                    selectedDate.add(1, "month")
                }
            }

            this.inputValue = selectedDate.format("D of MMMM of YYYY")
            this.selectedDate = selectedDate
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, this.inputValue)

            this.hideDropdown()
        },

        /**
         * Handles the click event on the input.
         */
        async handleClickInput(): Promise<void> {
            if (this.disabled) return

            await this.focusOnInputAsync()
        },

        /**
         * Handles on click today button.
         */
        handleClickToday(): void {
            this.inputValue = this.today.clone().format("D of MMMM of YYYY")
            this.selectedDate = this.today.clone()
            this.displayDate = this.today.clone()
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, this.inputValue)

            this.hideDropdown()
        },

        /**
         * Handles the focus event on the write input.
         */
        handleFocusInput(event: Event): void {
            const target = event.target as HTMLInputElement
            this.inputValue = target.value
        },

        /**
         * Handles the input event on the write input.
         * @param event The fired event.
         */
        handleInput(event: Event): void {
            const target = event.target as HTMLInputElement
            this.inputValue = target.value
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, this.inputValue)

            this.hideDropdown()
        },

        /**
         * Handles the next month button.
         */
        handleNextMonth(): void {
            this.displayDate = moment(this.displayDate).add(1, "month")
            this.generateCalendarDays()
        },

        /**
         * Handles the previous month button.
         */
        handlePreviousMonth(): void {
            this.displayDate = moment(this.displayDate).subtract(1, "month")
            this.generateCalendarDays()
        },

        /**
         * Handles the year change.
         * @param event
         */
        handleYearChange(event: Event): void {
            const target = event.target as HTMLSelectElement
            const selectedYear = parseInt(target.value, 10)
            this.displayDate = moment(this.displayDate).year(selectedYear)

            this.generateCalendarDays()
        },

        /**
         * Hides the dropdown.
         */
        hideDropdown(): void {
            this.isOpen = false
        },

        /**
         * Verifies if the day is selected.
         * @param day
         */
        isSelected(day: { date: number; isAdjacent: boolean }): boolean {
            return this.selectedDate &&
                (this.selectedDate.isSame(this.displayDate.clone().date(day.date), "day") &&
                !day.isAdjacent)
        },

        /**
         * Verifies if the day is today.
         * @param day
         */
        isToday(day: { date: number; isAdjacent: boolean }): boolean {
            const today = moment()

            return today.isSame(this.displayDate.clone().date(day.date), "day") && !day.isAdjacent
        },

        /**
         * Show the dropdown and set the display date.
         */
        showDropdown(): void {
            if (this.selectedDate) this.displayDate = this.selectedDate.clone()
            else this.displayDate = moment()

            this.isOpen = true
        },
    },
})
</script>

<style scoped lang="scss">

</style>
