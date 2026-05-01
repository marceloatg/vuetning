import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsDropdown from "./slds-dropdown.vue"
import type { DropdownOption } from "./dropdown-option"

const OPTIONS: DropdownOption[] = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
]

const MIXED_OPTIONS: DropdownOption[] = [
    { label: "Section", isHeading: true } as DropdownOption,
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "---", isDivider: true } as DropdownOption,
]

describe("SldsDropdown", () => {
    it("renders nothing when isOpen is false", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: false, options: OPTIONS },
        })
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)
    })

    it("renders the listbox with options when isOpen is true", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS },
        })
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)
        expect(wrapper.findAll("[role=\"option\"]").length).toBe(2)
    })

    it("emits click-option when an option is clicked", async () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.findAll("[role=\"option\"]")[0].trigger("click")
        expect(wrapper.emitted("click-option")).toBeTruthy()

        wrapper.unmount()
    })

    it("does not emit click-option when a heading is clicked", async () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: MIXED_OPTIONS },
            attachTo: document.body,
        })

        // Click the heading wrapper li
        const heading = wrapper.find(".slds-listbox__option-header")
        expect(heading.exists()).toBe(true)
        await heading.trigger("click")

        expect(wrapper.emitted("click-option")).toBeFalsy()

        wrapper.unmount()
    })

    it("emits mouse-over-option when an option is hovered", async () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.findAll("[role=\"option\"]")[1].trigger("mouseover")
        expect(wrapper.emitted("mouse-over-option")).toBeTruthy()

        wrapper.unmount()
    })

    it("uses the default aria-label of 'Options' when none provided", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS },
        })

        expect(wrapper.find("[role=\"listbox\"]").attributes("aria-label")).toBe("Options")
    })

    it("forwards the aria-label prop to the listbox", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, ariaLabel: "Account" },
        })

        expect(wrapper.find("[role=\"listbox\"]").attributes("aria-label")).toBe("Account")
    })

    it("forwards the listbox-id prop to the listbox", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, listboxId: "my-listbox" },
        })

        expect(wrapper.find("[role=\"listbox\"]").attributes("id")).toBe("my-listbox")
    })

    it("applies center alignment classes and animation when centerAlignment is true", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, centerAlignment: true },
        })

        const listbox = wrapper.find("[role=\"listbox\"]")
        expect(listbox.classes()).toContain("slds-dropdown_center")
        expect(listbox.classes()).not.toContain("slds-dropdown_left")
    })

    it("applies right alignment classes when rightAlignment is true", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, rightAlignment: true },
        })

        const listbox = wrapper.find("[role=\"listbox\"]")
        expect(listbox.classes()).toContain("slds-dropdown_right")
    })

    it("applies bottom alignment class when bottomAlignment is true", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, bottomAlignment: true },
        })

        const listbox = wrapper.find("[role=\"listbox\"]")
        expect(listbox.classes()).toContain("slds-dropdown_bottom")
    })

    it("uses left alignment class by default", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS },
        })

        expect(wrapper.find("[role=\"listbox\"]").classes()).toContain("slds-dropdown_left")
    })

    it("applies the length modifier class when length is set", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, length: 5 },
        })

        expect(wrapper.find("[role=\"listbox\"]").classes()).toContain("slds-dropdown_length-5")
    })

    it("renders the spinner row when showSpinner is true", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, showSpinner: true },
        })

        expect(wrapper.find(".slds-spinner").exists()).toBe(true)
    })

    it("renders the empty state message when options array is empty", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: [] },
        })

        expect(wrapper.text()).toContain("No options to display")
    })

    it("treats lists with only heading/divider as empty", () => {
        const onlyHeadings: DropdownOption[] = [
            { label: "Section", isHeading: true } as DropdownOption,
            { label: "---", isDivider: true } as DropdownOption,
        ]
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: onlyHeadings },
        })

        expect(wrapper.text()).toContain("No options to display")
    })

    it("marks an option as selected via selectedOption prop", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, selectedOption: OPTIONS[1] },
        })

        const opts = wrapper.findAll("[role=\"option\"]")
        expect(opts[1].classes()).toContain("slds-is-selected")
        expect(opts[0].classes()).not.toContain("slds-is-selected")
    })

    it("marks options as selected via selectedOptions array", () => {
        const wrapper = mount(SldsDropdown, {
            props: {
                isOpen: true,
                options: OPTIONS,
                selectedOptions: [OPTIONS[0]],
            },
        })

        const opts = wrapper.findAll("[role=\"option\"]")
        expect(opts[0].classes()).toContain("slds-is-selected")
        expect(opts[1].classes()).not.toContain("slds-is-selected")
    })

    it("does not mark an option as selected when its value is missing", () => {
        const noValue: DropdownOption[] = [{ label: "x" } as DropdownOption]
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: noValue, selectedOption: noValue[0] },
        })

        expect(wrapper.find("[role=\"option\"]").classes()).not.toContain("slds-is-selected")
    })

    it("highlights the focused option via focusedOption prop", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, focusedOption: OPTIONS[0] },
        })

        const opts = wrapper.findAll("[role=\"option\"]")
        expect(opts[0].classes()).toContain("slds-has-focus")
    })

    it("reverses option index for bottom alignment via data-index", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, bottomAlignment: true },
        })

        const items = wrapper.findAll(".slds-listbox__item")
        // first option gets the highest data-index when bottom-aligned
        const dataIndexes = items.map(i => i.attributes("data-index"))
        expect(dataIndexes).toContain("0")
        expect(dataIndexes).toContain("1")
    })

    it("invokes staggeredBeforeEnter setting opacity 0 and translateY (-16px by default)", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS },
        })
        const vm = wrapper.vm as any

        const el = document.createElement("div")
        vm.staggeredBeforeEnter(el)

        expect(el.style.opacity).toBe("0")
        expect(el.style.transform).toContain("-16px")
    })

    it("invokes staggeredBeforeEnter with positive translateY when bottomAlignment is true", () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, bottomAlignment: true },
        })
        const vm = wrapper.vm as any

        const el = document.createElement("div")
        vm.staggeredBeforeEnter(el)

        expect(el.style.transform).toContain("16px")
        expect(el.style.transform).not.toContain("-16px")
    })

    it("invokes staggeredEnter calling gsap.to with onComplete and delay derived from data-index", async () => {
        const gsap = (await import("gsap")).default
        const spy = vi.spyOn(gsap, "to").mockImplementation(((_t: any, vars: any) => {
            vars?.onComplete?.()
            return {} as any
        }) as any)

        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS },
        })
        const vm = wrapper.vm as any

        const el = document.createElement("div")
        el.dataset.index = "2"
        const done = vi.fn()
        vm.staggeredEnter(el, done)

        expect(spy).toHaveBeenCalled()
        expect(done).toHaveBeenCalled()
        spy.mockRestore()
    })

    it("invokes staggeredEnter with default delay when data-index is missing", async () => {
        const gsap = (await import("gsap")).default
        const spy = vi.spyOn(gsap, "to").mockImplementation(((_t: any, vars: any) => {
            vars?.onComplete?.()
            return {} as any
        }) as any)

        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS },
        })
        const vm = wrapper.vm as any

        const el = document.createElement("div")
        const done = vi.fn()
        vm.staggeredEnter(el, done)

        expect(spy).toHaveBeenCalled()
        const args = spy.mock.calls[0]?.[1] as any
        expect(args.delay).toBe(0)
        spy.mockRestore()
    })

    it("transitions to closed when isOpen flips to false", async () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS },
        })

        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)
        await wrapper.setProps({ isOpen: false })
        await nextTick()
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)
    })

    it("has no axe-detectable accessibility violations when used inside a labeled listbox shell", async () => {
        const wrapper = mount(SldsDropdown, {
            props: { isOpen: true, options: OPTIONS, ariaLabel: "Color options" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
