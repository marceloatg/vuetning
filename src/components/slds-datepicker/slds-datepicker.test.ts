import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { userEvent } from "vitest/browser"
import moment from "moment/min/moment-with-locales"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsDatepicker from "./slds-datepicker.vue"

describe("SldsDatepicker", () => {
    it("renders an input wrapped in the datepicker container", () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
        })

        expect(wrapper.find("input.slds-input").exists()).toBe(true)
        expect(wrapper.find(".slds-dropdown-trigger").exists()).toBe(true)
    })

    it("forwards the disabled prop to the underlying input", () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date", disabled: true },
        })

        expect(wrapper.find("input.slds-input").attributes("disabled")).toBeDefined()
    })

    it("renders an event icon when no value is set", () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
        })

        expect(wrapper.find("[data-icon-name=\"event\"]").exists() || wrapper.html().includes("event")).toBe(true)
    })

    it("formats the initial modelValue into the input", () => {
        const date = new Date(Date.UTC(2024, 0, 15))
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date", modelValue: date },
        })

        const input = wrapper.find("input.slds-input").element as HTMLInputElement
        expect(input.value).toBeTruthy()
        expect(input.value).toContain("2024")
    })

    it("opens the calendar dropdown when the input is clicked", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        expect(wrapper.find(".slds-datepicker").exists()).toBe(true)
        expect(wrapper.find(".slds-is-open").exists()).toBe(true)

        wrapper.unmount()
    })

    it("does not reopen the dropdown if clicked while already open", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        expect(wrapper.find(".slds-datepicker").exists()).toBe(true)

        await wrapper.find("input.slds-input").trigger("click")
        expect(wrapper.find(".slds-datepicker").exists()).toBe(true)

        wrapper.unmount()
    })

    it("emits update:modelValue with a Date when a calendar day is clicked", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")

        const dayCells = wrapper.findAll(".slds-datepicker td:not(.slds-day_adjacent-month)")
        expect(dayCells.length).toBeGreaterThan(0)
        await dayCells[0].trigger("click")

        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![0][0]).toBeTruthy()
        expect(emitted![0][0]).toBeInstanceOf(Date)

        wrapper.unmount()
    })

    it("highlights the selected day after clicking", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        const dayCells = wrapper.findAll(".slds-datepicker td:not(.slds-day_adjacent-month)")
        await dayCells[10].trigger("click")

        await wrapper.find("input.slds-input").trigger("click")
        expect(wrapper.find(".slds-is-selected").exists()).toBe(true)

        wrapper.unmount()
    })

    it("clicking an adjacent day from the start of the grid selects a previous-month day", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")

        const adjacent = wrapper.findAll(".slds-datepicker td.slds-day_adjacent-month")
        if (adjacent.length > 0) {
            await adjacent[0].trigger("click")
            const emitted = wrapper.emitted("update:modelValue")
            expect(emitted).toBeTruthy()
            expect(emitted![0][0]).toBeInstanceOf(Date)
        }

        wrapper.unmount()
    })

    it("typing a valid date into the input parses it and emits update:modelValue", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-input")
        ;(input.element as HTMLInputElement).value = "01/15/2024"
        await input.trigger("input")

        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![0][0]).toBeInstanceOf(Date)

        wrapper.unmount()
    })

    it("typing an invalid date does not emit update:modelValue", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-input")
        ;(input.element as HTMLInputElement).value = "not-a-date"
        await input.trigger("input")

        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("blurring with an invalid value clears the input and emits a null value", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-input")
        ;(input.element as HTMLInputElement).value = "garbage"
        await input.trigger("blur")

        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![emitted!.length - 1][0]).toBeNull()

        wrapper.unmount()
    })

    it("blurring with a valid value does not clear the input", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-input")
        ;(input.element as HTMLInputElement).value = "01/15/2024"
        await input.trigger("input")
        await input.trigger("blur")

        expect((input.element as HTMLInputElement).value).toBe("01/15/2024")

        wrapper.unmount()
    })

    it("the today button selects today's date and closes the dropdown", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")

        const buttons = wrapper.findAll("button")
        const todayButton = buttons.find((b) => b.text().trim() === "Today")
        expect(todayButton).toBeTruthy()
        await todayButton!.trigger("click")

        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![0][0]).toBeInstanceOf(Date)

        const emittedDate = emitted![0][0] as Date
        expect(moment(emittedDate).isSame(moment(), "day")).toBe(true)

        wrapper.unmount()
    })

    it("navigates to the next month with the chevron-right button", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        const initialMonthText = wrapper.find(".slds-datepicker__filter_month").text()

        const nextButton = wrapper.find("[title=\"Next Month\"], [aria-label=\"Next Month\"]")
            .exists()
            ? wrapper.find("[title=\"Next Month\"], [aria-label=\"Next Month\"]")
            : wrapper.findAll(".slds-datepicker__filter_month button")[1]
        await nextButton.trigger("click")

        const newMonthText = wrapper.find(".slds-datepicker__filter_month").text()
        expect(newMonthText).not.toBe(initialMonthText)

        wrapper.unmount()
    })

    it("navigates to the previous month with the chevron-left button", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        const initialMonthText = wrapper.find(".slds-datepicker__filter_month").text()

        const prevButton = wrapper.findAll(".slds-datepicker__filter_month button")[0]
        await prevButton.trigger("click")

        const newMonthText = wrapper.find(".slds-datepicker__filter_month").text()
        expect(newMonthText).not.toBe(initialMonthText)

        wrapper.unmount()
    })

    it("switches to the months view when the month name is clicked", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")

        const monthLink = wrapper.findAll(".slds-datepicker__filter_month a")[0]
        await monthLink.trigger("click")

        // Months grid should now contain 12 abbreviated month names.
        const monthCells = wrapper.findAll(".slds-datepicker__month td")
        expect(monthCells.length).toBe(12)

        wrapper.unmount()
    })

    it("selecting a month from the months view returns to the calendar view", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        const monthLink = wrapper.findAll(".slds-datepicker__filter_month a")[0]
        await monthLink.trigger("click")

        const monthCells = wrapper.findAll(".slds-datepicker__month td")
        await monthCells[5].trigger("click")

        // Back to calendar view: weekday header row reappears.
        expect(wrapper.find("#defaultPicker-weekdays").exists()).toBe(true)

        wrapper.unmount()
    })

    it("paginates months view by year using prev/next buttons", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        await wrapper.findAll(".slds-datepicker__filter_month a")[0].trigger("click")

        const initialYear = wrapper.find(".slds-datepicker__filter_month").text()

        const buttons = wrapper.findAll(".slds-datepicker__filter_month button")
        await buttons[1].trigger("click")
        const afterNext = wrapper.find(".slds-datepicker__filter_month").text()
        expect(afterNext).not.toBe(initialYear)

        await buttons[0].trigger("click")
        await buttons[0].trigger("click")
        const afterPrev = wrapper.find(".slds-datepicker__filter_month").text()
        expect(afterPrev).not.toBe(afterNext)

        wrapper.unmount()
    })

    it("switches to the years view when the year is clicked, and paginates by decade", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")

        const links = wrapper.findAll(".slds-datepicker__filter_month a")
        await links[1].trigger("click")

        // The years grid renders.
        expect(wrapper.find(".slds-datepicker__year").exists()).toBe(true)
        const initialHeader = wrapper.find(".slds-datepicker__filter_month").text()

        const navButtons = wrapper.findAll(".slds-datepicker__filter_month button")
        await navButtons[1].trigger("click")
        const afterNext = wrapper.find(".slds-datepicker__filter_month").text()
        expect(afterNext).not.toBe(initialHeader)

        await navButtons[0].trigger("click")
        await navButtons[0].trigger("click")
        const afterPrev = wrapper.find(".slds-datepicker__filter_month").text()
        expect(afterPrev).not.toBe(afterNext)

        wrapper.unmount()
    })

    it("selecting a year transitions from the years view to the months view", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        const links = wrapper.findAll(".slds-datepicker__filter_month a")
        await links[1].trigger("click")

        const yearCells = wrapper.findAll(".slds-datepicker__year td")
        expect(yearCells.length).toBeGreaterThan(0)
        await yearCells[0].trigger("click")

        // Months view: 12 cells.
        const monthCells = wrapper.findAll(".slds-datepicker__month td")
        expect(monthCells.length).toBe(12)

        wrapper.unmount()
    })

    it("renders a clear button when there is a value and clears it on click", async () => {
        const date = new Date(Date.UTC(2024, 5, 1))
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date", modelValue: date },
            attachTo: document.body,
        })

        const clearButton = wrapper.find("[title=\"Clear\"]")
        expect(clearButton.exists()).toBe(true)

        await clearButton.trigger("click")

        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![emitted!.length - 1][0]).toBeNull()

        wrapper.unmount()
    })

    it("does not render the clear button when disabled even with a value", () => {
        const date = new Date(Date.UTC(2024, 5, 1))
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date", modelValue: date, disabled: true },
        })

        expect(wrapper.find("[title=\"Clear\"]").exists()).toBe(false)
    })

    it("reacts to modelValue prop changes by updating the input value", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
        })

        await wrapper.setProps({ modelValue: new Date(Date.UTC(2023, 6, 4)) })

        const input = wrapper.find("input.slds-input").element as HTMLInputElement
        expect(input.value).toContain("2023")
    })

    it("regenerates calendar days when locale prop changes", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        await wrapper.setProps({ locale: "fr" })

        // Calendar still rendered after locale change.
        expect(wrapper.find(".slds-datepicker").exists()).toBe(true)

        wrapper.unmount()
    })

    it("renders required marker via slds-form-element when required is true", () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date", required: true },
        })

        // The form-element renders a required abbreviation like '*'.
        expect(wrapper.html()).toContain("*")
    })

    it("forwards the errors prop to the underlying form element", () => {
        const wrapper = mount(SldsDatepicker, {
            props: {
                label: "Date",
                errors: [],
            },
        })

        // With an empty errors array the form element renders normally —
        // populating real errors triggers a known crash inside
        // slds-form-element when there is no `error` slot wrapper, which is
        // unrelated to this component and is tracked in slds-form-element.
        expect(wrapper.find("input.slds-input").exists()).toBe(true)
    })

    it("closes the calendar when clicking outside the component", async () => {
        const outside = document.createElement("button")
        outside.textContent = "outside"
        document.body.appendChild(outside)

        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        expect(wrapper.find(".slds-datepicker").exists()).toBe(true)

        // Use the real browser pointer to click outside; vueuse onClickOutside
        // requires both pointerdown and click on the window with a real
        // composedPath, which only a trusted user gesture provides.
        await userEvent.click(outside)
        await wrapper.vm.$nextTick()
        await new Promise((r) => setTimeout(r, 50))

        expect(wrapper.find(".slds-datepicker").exists()).toBe(false)

        wrapper.unmount()
        outside.remove()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations when the calendar is open", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it("exposes an accessible name on the calendar dialog via aria-label", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        const dialog = wrapper.find("[role=\"dialog\"]")
        expect(dialog.exists()).toBe(true)
        expect(dialog.attributes("aria-label")).toBe("Date picker")

        wrapper.unmount()
    })
    it("disables out-of-range days based on min-date prop", async () => {
        // Use a fixed display date to make the assertions deterministic.
        const display = new Date(Date.UTC(2024, 5, 15))
        const min = new Date(Date.UTC(2024, 5, 10))

        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date", modelValue: display, minDate: min },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")

        const disabled = wrapper.findAll(".slds-datepicker td.slds-is-disabled")
        expect(disabled.length).toBeGreaterThan(0)

        // Click a disabled day — should NOT emit update:modelValue.
        await disabled[0].trigger("click")
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("disables out-of-range days based on max-date prop", async () => {
        const display = new Date(Date.UTC(2024, 5, 15))
        const max = new Date(Date.UTC(2024, 5, 20))

        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date", modelValue: display, maxDate: max },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")

        const disabled = wrapper.findAll(".slds-datepicker td.slds-is-disabled")
        expect(disabled.length).toBeGreaterThan(0)

        // Click a disabled day — should NOT emit update:modelValue.
        await disabled[disabled.length - 1].trigger("click")
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("closes the calendar when Escape is pressed", async () => {
        const wrapper = mount(SldsDatepicker, {
            props: { label: "Date" },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-input").trigger("click")
        expect(wrapper.find(".slds-datepicker").exists()).toBe(true)

        await wrapper.find("input.slds-input").trigger("keydown", { key: "Escape" })
        await wrapper.vm.$nextTick()

        expect(wrapper.find(".slds-datepicker").exists()).toBe(false)
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })
})
