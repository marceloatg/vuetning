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
                        :disabled="disabled"
                        type="text"
                        role="textbox"
                        tabindex="0"
                        :value="inputValue"
                        @blur="handleBlur"
                        @click="showDropdown"
                        @input="handleInput"
                    >

                    <!-- Icons -->
                    <transition name="fade">

                        <!-- Clear button -->
                        <slds-button-icon
                            v-if="showClearButton"
                            bare
                            class="slds-input__icon slds-input__icon_right"
                            icon-name="utility:clear"
                            tabindex="-1"
                            title="Clear"
                            @click.prevent="handleClickClear"
                        />

                        <!-- Event icon -->
                        <slds-icon
                            v-else
                            class="slds-input__icon slds-input__icon_right"
                            icon-name="utility:event"
                            x-small
                        />

                    </transition>

                    <!-- Calendar -->
                    <transition :name="dropdownAnimation">
                        <div
                            v-if="isOpen"
                            aria-hidden="false"
                            class="slds-datepicker slds-dropdown slds-dropdown_left"
                            role="dialog"
                        >

                            <!-- Calendar headers -->
                            <div class="slds-datepicker__filter slds-grid">

                                <!-- Calendar -->
                                <div v-if="currentView === 'calendar'" class="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow">

                                    <!-- Previous month button -->
                                    <div class="slds-align-middle">
                                        <slds-button-icon
                                            assistive-text="Previous Month"
                                            icon-name="utility:left"
                                            @click="handlePreviousMonth"
                                        />
                                    </div>

                                    <!-- Current month -->
                                    <a v-if="currentView === 'calendar'" class="slds-align-middle" @click="switchToMonthView">
                                        <slds-text heading-small>
                                            {{ currentMonthName }}
                                        </slds-text>
                                    </a>

                                    <!-- Current year -->
                                    <a v-if="currentView === 'calendar'" class="slds-align-middle" @click="switchToYearView">
                                        <slds-text heading-small>
                                            {{ currentYear }}
                                        </slds-text>
                                    </a>

                                    <!-- Next month button -->
                                    <div class="slds-align-middle">
                                        <slds-button-icon
                                            assistive-text="Next Month"
                                            icon-name="utility:right"
                                            @click="handleNextMonth"
                                        />
                                    </div>

                                </div>

                                <!-- Months -->
                                <div v-else-if="currentView === 'months'" class="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow">

                                    <!-- Previous month button -->
                                    <div class="slds-align-middle">
                                        <slds-button-icon
                                            assistive-text="Previous Month"
                                            icon-name="utility:left"
                                            @click="handlePreviousYear"
                                        />
                                    </div>

                                    <!-- Current year -->
                                    <a class="slds-align-middle" @click="switchToYearView">
                                        <slds-text heading-small>
                                            {{ currentYear }}
                                        </slds-text>
                                    </a>

                                    <!-- Next month button -->
                                    <div class="slds-align-middle">
                                        <slds-button-icon
                                            assistive-text="Next Month"
                                            icon-name="utility:right"
                                            @click="handleNextYear"
                                        />
                                    </div>

                                </div>

                                <!-- Years -->
                                <div v-else-if="currentView === 'years'" class="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow">

                                    <!-- Previous year button -->
                                    <div class="slds-align-middle">
                                        <slds-button-icon
                                            assistive-text="Previous Month"
                                            icon-name="utility:left"
                                            @click="handlePreviousYearRange"
                                        />
                                    </div>

                                    <!-- Current year range -->
                                    <slds-text v-if="currentView === 'years'" class="slds-align-middle" heading-small>
                                        {{ yearRangeHeader }}
                                    </slds-text>

                                    <!-- Next year button -->
                                    <div class="slds-align-middle">
                                        <slds-button-icon
                                            assistive-text="Next Month"
                                            icon-name="utility:right"
                                            @click="handleNextYearRange"
                                        />
                                    </div>

                                </div>

                            </div>

                            <!-- Calendar table -->
                            <table v-if="currentView === 'calendar'" class="slds-datepicker__month" role="grid">

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
                                                'slds-is-selected': dayIsSelected(day)
                                            }"
                                            @click="handleClickDay(day)"
                                        >
                                            <span class="slds-day">{{ day.date }}</span>
                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                            <!-- Month table -->
                            <table v-else-if="currentView === 'months'" class="slds-datepicker__month" role="grid">
                                <tbody>
                                    <tr v-for="(row, rowIndex) in monthRows" :key="rowIndex">
                                        <td
                                            v-for="(month, monthIndex) in row"
                                            :key="monthIndex"
                                            class="slds-m-around_large"
                                            :class="{'slds-is-selected': isSelectedMonth(month.index)}"
                                            @click="selectMonth(month.index)"
                                        >
                                            <span class="slds-day"> {{ month.name }} </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- Year table -->
                            <table v-else-if="currentView === 'years'" class="slds-datepicker__year" role="grid">
                                <tbody>
                                    <tr v-for="(row, rowIndex) in yearRows" :key="rowIndex">
                                        <td
                                            v-for="year in row"
                                            :key="year"
                                            :class="{'slds-is-selected': isSelectedYear(year)}"
                                            @click="selectYear(year)"
                                        >
                                            <span class="slds-day">{{ year }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- Today button -->
                            <slds-button
                                v-if="currentView === 'calendar'"
                                class="slds-align_absolute-center slds-text-link"
                                @click="handleClickToday"
                            >
                                Today
                            </slds-button>

                        </div>
                    </transition>

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
import moment from "moment/min/moment-with-locales"
import SldsButton from "../slds-button/slds-button.vue"
import { EVENTS } from "../../constants"
import SldsText from "../slds-text/slds-text.vue"

export default defineComponent({
    name: "slds-datepicker",

    components: { SldsText, SldsButton, SldsButtonIcon, SldsIcon, SldsFormElement },

    directives: {
        ClickOutside: vOnClickOutside,
    },

    props: {
        /**
         * Indicates whether the datepicker is disabled.
         */
        disabled: Boolean,

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
         * Locale.
         */
        locale: { type: String, default: "en" },

        /**
         * The value of the date picker.
         */
        modelValue: Date,

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
             * Current view.
             */
            currentView: "calendar",

            /**
             * Display date.
             */
            displayDate: moment.utc(),

            /**
             * Valid date formats.
             */
            formats: [
                "MM/DD/YYYY",
                "ll",
            ],

            /**
             * Input value.
             */
            inputValue: this.modelValue ? moment.utc(this.modelValue).format("ll") : null,

            /**
             * Indicates whether the dropdown is open.
             */
            isOpen: false,

            /**
             * Month short names.
             */
            monthShortNames: moment.monthsShort(),

            /**
             * Selected date.
             */
            selectedDate: this.modelValue ? moment.utc(this.modelValue).format("ll") : null,

            /**
             * Selected month.
             */
            selectedMonth: null as unknown as number,

            /**
             * Selected year.
             */
            selectedYear: null as unknown as number,

            /**
             * Today.
             */
            today: moment.utc(),

            /**
             * Views.
             */
            views: {
                calendar: "calendar",
                months: "months",
                years: "years",
            },

            /**
             * Year range start.
             */
            yearRangeStart: 0,

            /**
             * Year range end.
             */
            yearRangeEnd: 0,
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
        currentMonthName(): string {
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
         * Month rows.
         */
        monthRows(): Array<any> {
            const months = this.monthShortNames.map((name: string, index: number) => ({ name, index }))
            return [months.slice(0, 3), months.slice(3, 6), months.slice(6, 9), months.slice(9, 12)]
        },

        /**
         * Indicates whether the input is showing its clear button.
         */
        showClearButton(): boolean {
            return Boolean(this.inputValue && this.inputValue.length > 0 && !this.disabled)
        },

        /**
         * Year range header.
         */
        yearRangeHeader(): string {
            return `${this.yearRangeStart} - ${this.yearRangeEnd}`
        },

        /**
         * Year rows.
         */
        yearRows(): Array<number> {
            const years = []
            for (let i = this.yearRangeStart; i <= this.yearRangeEnd; i++) {
                years.push(i)
            }

            const rows = []
            for (let i = 0; i < years.length; i += 2) {
                rows.push([years[i], years[i + 1]])
            }

            return rows
        },

        /**
         * Formatted weekdays.
         */
        weekDays(): Array<string> {
            return moment.weekdaysShort()
        },
    },

    watch: {
        locale(newLocale) {
            moment.locale(newLocale)
            this.generateCalendarDays()
        },

        modelValue(newValue) {
            if (newValue) {
                this.inputValue = moment.utc(newValue).format("ll") || null
                this.selectedDate = moment.utc(newValue)
            }
        },

        selectedDate(newValue) {
            if (newValue !== this.displayDate) {
                this.generateCalendarDays()
            }
        },
    },

    beforeCreate() {
        moment.locale(this.locale)
    },

    created() {
        this.generateCalendarDays()
        this.initYearRange()
    },

    methods: {
        /**
         * Clear the input.
         */
        clearInput(): void {
            this.inputValue = null
            this.selectedDate = null

            this.$emit(EVENTS.UPDATE_MODEL_VALUE, this.inputValue)
        },

        /**
         * Verifies if the day is selected.
         * @param day
         */
        dayIsSelected(day: { date: number; isAdjacent: boolean }): boolean {
            return this.selectedDate &&
                (this.selectedDate.isSame(this.displayDate.clone().date(day.date), "day") &&
                    !day.isAdjacent)
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

            const startDayOfWeek = startOfMonth.day()
            const daysFromPrevMonth = []

            if (startDayOfWeek > 0) {
                for (let i = startDayOfWeek - 1; i >= 0; i--) {
                    const day = startOfMonth.clone().subtract(i + 1, "days")
                    daysFromPrevMonth.push({ date: day.date(), isAdjacent: true })
                }
            }

            const daysFromCurrentMonth = []
            for (let i = 0; i < endOfMonth.date(); i++) {
                const day = startOfMonth.clone().add(i, "days")
                daysFromCurrentMonth.push({ date: day.date(), isAdjacent: false })
            }

            const endDayOfWeek = endOfMonth.day()
            const daysFromNextMonth = []
            if (endDayOfWeek < 6) {
                for (let i = 1; i <= 6 - endDayOfWeek; i++) {
                    const day = endOfMonth.clone().add(i, "days")
                    daysFromNextMonth.push({ date: day.date(), isAdjacent: true })
                }
            }

            const allDays = [...daysFromPrevMonth, ...daysFromCurrentMonth, ...daysFromNextMonth]

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
        handleBlur(event: Event): void {
            const target = event.target as HTMLInputElement
            const parsedDate = moment(target.value, this.formats, true)

            if (!parsedDate.isValid()) {
                this.clearInput()
            }
        },

        /**
         * Handles clicking the clear button.
         */
        handleClickClear(): void {
            this.displayDate = moment.utc()
            this.selectedYear = null
            this.selectedMonth = null

            this.clearInput()
            this.hideDropdown()

            const input = this.$refs.input as HTMLInputElement
            input.focus()
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

            this.inputValue = selectedDate.format("ll")
            this.selectedDate = selectedDate
            this.selectedMonth = selectedDate.month()
            this.selectedYear = selectedDate.year()

            this.$emit(EVENTS.UPDATE_MODEL_VALUE, new Date(selectedDate.format()))
            setTimeout(() => this.hideDropdown(), 200)
        },

        /**
         * Handles on click today button.
         */
        handleClickToday(): void {
            this.inputValue = this.today.clone().format("ll")
            this.selectedDate = this.today.clone()
            this.displayDate = this.today.clone()
            this.selectedMonth = this.selectedDate.month()
            this.selectedYear = this.selectedDate.year()

            this.$emit(EVENTS.UPDATE_MODEL_VALUE, new Date(this.selectedDate.format()))

            this.hideDropdown()
        },

        /**
         * Handles the input event on the write input.
         * @param event The fired event.
         */
        handleInput(event: Event): void {
            const target = event.target as HTMLInputElement
            this.inputValue = target.value

            const parsedDate = moment(this.inputValue, this.formats, true)
            if (parsedDate.isValid()) {
                this.selectedDate = parsedDate
                this.displayDate = parsedDate
                this.selectedYear = parsedDate.year()
                this.selectedMonth = parsedDate.month()

                this.$emit(EVENTS.UPDATE_MODEL_VALUE, new Date(moment.utc(this.selectedDate).format()))
            }
        },

        /**
         * Handles the next month button.
         */
        handleNextMonth(): void {
            this.displayDate = moment(this.displayDate).add(1, "month")
            this.generateCalendarDays()
        },

        /**
         * Handles the next year button.
         */
        handleNextYear(): void {
            this.displayDate = moment(this.displayDate).add(1, "year")
            this.generateCalendarDays()
        },

        /**
         * Handles the next year range.
         */
        handleNextYearRange(): void {
            this.yearRangeStart += 10
            this.yearRangeEnd += 10
        },

        /**
         * Handles the previous month button.
         */
        handlePreviousMonth(): void {
            this.displayDate = moment.utc(this.displayDate).subtract(1, "month")
            this.generateCalendarDays()
        },

        /**
         * Handles the previous year button.
         */
        handlePreviousYear(): void {
            this.displayDate = moment.utc(this.displayDate).subtract(1, "year")
            this.generateCalendarDays()
        },

        /**
         * Handles the previous year range.
         */
        handlePreviousYearRange(): void {
            this.yearRangeStart -= 10
            this.yearRangeEnd -= 10
        },

        /**
         * Hides the dropdown.
         */
        hideDropdown(): void {
            this.isOpen = false
            this.currentView = this.views.calendar

            this.initYearRange()
        },

        /**
         * Initializes the current year range.
         */
        initYearRange(): void {
            const currentYear = this.currentYear
            this.yearRangeStart = currentYear - (currentYear % 10)
            this.yearRangeEnd = this.yearRangeStart + 9
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
         * Verifies if the month is selected.
         * @param index
         */
        isSelectedMonth(index: number): boolean {
            return this.selectedMonth === index && this.selectedYear === this.displayDate.year()
        },

        /**
         * Verifies if the year is selected.
         * @param year
         */
        isSelectedYear(year: number): boolean {
            return this.selectedYear === year
        },

        /**
         * Select the clicked month.
         * @param monthIndex
         */
        selectMonth(monthIndex: number): void {
            this.displayDate = this.displayDate.clone().month(monthIndex)
            this.currentView = this.views.calendar

            this.generateCalendarDays()
        },

        /**
         * Select the clicked year.
         * @param year
         */
        selectYear(year: number): void {
            this.displayDate = this.displayDate.clone().year(year)
            this.currentView = this.views.months
        },

        /**
         * Show the dropdown and set the display date.
         */
        showDropdown(): void {
            if (this.isOpen) return

            if (this.selectedDate) {
                this.displayDate = this.selectedDate.clone()
                this.inputValue = this.selectedDate.clone().format("ll")
            }
            else {
                this.displayDate = moment.utc()
                this.inputValue = null
            }

            this.generateCalendarDays()
            this.isOpen = true
        },

        /**
         * Switch the view to month.
         */
        switchToMonthView(): void {
            this.currentView = this.views.months
        },

        /**
         * Switch the view to year.
         */
        switchToYearView(): void {
            this.currentView = this.views.years
        },
    },
})
</script>

<style>

.slds-datepicker {
    width: 17.709rem;
}

.slds-datepicker__month,
.slds-datepicker__year {
    width: 100%;
}

</style>

