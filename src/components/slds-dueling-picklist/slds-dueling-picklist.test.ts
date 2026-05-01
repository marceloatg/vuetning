import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsDuelingPicklist from "./slds-dueling-picklist.vue"
import SldsDuelingPicklistOption from "./slds-dueling-picklist-option.vue"
import type Option from "./option"

const ALL_OPTIONS: Option[] = [
    { id: "1", label: "Red", value: "red" },
    { id: "2", label: "Green", value: "green" },
    { id: "3", label: "Blue", value: "blue" },
    { id: "4", label: "Yellow", value: "yellow" },
]

function makeWrapper(propsOverrides: Record<string, unknown> = {}) {
    return mount(SldsDuelingPicklist, {
        attachTo: document.body,
        props: {
            label: "Colors",
            options: ALL_OPTIONS,
            sourceLabel: "Available",
            selectedLabel: "Chosen",
            ...propsOverrides,
        },
    })
}

function getListItems(wrapper: ReturnType<typeof mount>, listIndex: number) {
    const lists = wrapper.findAll("[role=\"listbox\"]")
    return lists[listIndex].findAll("li")
}

describe("SldsDuelingPicklist", () => {
    it("renders both columns and the move buttons", () => {
        const wrapper = makeWrapper()

        expect(wrapper.find(".slds-dueling-list").exists()).toBe(true)
        expect(wrapper.findAll(".slds-dueling-list__column").length).toBeGreaterThanOrEqual(4)
        expect(wrapper.findAll("[role=\"listbox\"]").length).toBe(2)
        wrapper.unmount()
    })

    it("renders the source and selected labels", () => {
        const wrapper = makeWrapper()
        expect(wrapper.text()).toContain("Available")
        expect(wrapper.text()).toContain("Chosen")
        wrapper.unmount()
    })

    it("renders all provided options in the available listbox initially", () => {
        const wrapper = makeWrapper()
        const availableItems = getListItems(wrapper, 0)
        const selectedItems = getListItems(wrapper, 1)

        expect(availableItems.length).toBe(4)
        expect(selectedItems.length).toBe(0)
        expect(availableItems[0].text()).toContain("Red")
        wrapper.unmount()
    })

    it("renders empty listboxes when options is an empty array", () => {
        const wrapper = makeWrapper({ options: [] })
        expect(getListItems(wrapper, 0).length).toBe(0)
        expect(getListItems(wrapper, 1).length).toBe(0)
        wrapper.unmount()
    })

    it("applies the disabled class to both listboxes when disabled is true", () => {
        const wrapper = makeWrapper({ disabled: true })
        const lists = wrapper.findAll(".slds-dueling-list__options")
        expect(lists.length).toBe(2)
        for (const list of lists) {
            expect(list.classes()).toContain("slds-is-disabled")
            expect(list.attributes("aria-disabled")).toBe("true")
        }
        wrapper.unmount()
    })

    it("does not apply the disabled class when disabled is false", () => {
        const wrapper = makeWrapper()
        const lists = wrapper.findAll(".slds-dueling-list__options")
        for (const list of lists) {
            expect(list.classes()).not.toContain("slds-is-disabled")
        }
        wrapper.unmount()
    })

    it("renders the required indicator when required is true", () => {
        const wrapper = makeWrapper({ required: true })
        // slds-form-element renders a required asterisk via abbr
        expect(wrapper.find("abbr").exists()).toBe(true)
        wrapper.unmount()
    })

    it("renders error markup when errors are provided", () => {
        const wrapper = makeWrapper({
            errors: [
                { $uid: "e1", $message: "Required" },
                { $uid: "e2", $message: "Pick one" },
            ],
        })

        expect(wrapper.find(".slds-form-element").classes()).toContain("slds-has-error")
        const errorEls = wrapper.findAll("[data-testid=\"error\"]")
        expect(errorEls.length).toBe(2)
        expect(errorEls[0].text()).toBe("Required")
        expect(errorEls[1].text()).toBe("Pick one")
        wrapper.unmount()
    })

    it("forwards data-* attributes to the form element wrapper", () => {
        const wrapper = mount(SldsDuelingPicklist, {
            attachTo: document.body,
            props: {
                label: "Colors",
                options: ALL_OPTIONS,
                sourceLabel: "Available",
                selectedLabel: "Chosen",
            },
            attrs: {
                "data-testid": "my-picklist",
            },
        })
        expect(wrapper.find("[data-testid=\"my-picklist\"]").exists()).toBe(true)
        wrapper.unmount()
    })

    it("activates an available option on click", async () => {
        const wrapper = makeWrapper()
        const firstOption = getListItems(wrapper, 0)[0]
        await firstOption.trigger("click")

        const optionDiv = firstOption.find("[role=\"option\"]")
        expect(optionDiv.attributes("aria-selected")).toBe("true")
        wrapper.unmount()
    })

    it("moves a focused option from available to selected via the right button", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")
        const rightButton = buttons[0]

        await getListItems(wrapper, 0)[0].trigger("click")
        await rightButton.trigger("click")

        expect(getListItems(wrapper, 0).length).toBe(3)
        expect(getListItems(wrapper, 1).length).toBe(1)
        expect(getListItems(wrapper, 1)[0].text()).toContain("Red")

        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![emitted!.length - 1]).toEqual([["red"]])
        wrapper.unmount()
    })

    it("moves a focused option from selected back to available via the left button", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")
        const rightButton = buttons[0]
        const leftButton = buttons[1]

        // Move Red right
        await getListItems(wrapper, 0)[0].trigger("click")
        await rightButton.trigger("click")

        // Activate Red in the selected list and move it left
        await getListItems(wrapper, 1)[0].trigger("click")
        await leftButton.trigger("click")

        expect(getListItems(wrapper, 0).length).toBe(4)
        expect(getListItems(wrapper, 1).length).toBe(0)

        const emitted = wrapper.emitted("update:modelValue")!
        expect(emitted[emitted.length - 1]).toEqual([[]])
        wrapper.unmount()
    })

    it("does nothing on right-click when active option is in the selected list", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")
        const rightButton = buttons[0]

        // Move Red right
        await getListItems(wrapper, 0)[0].trigger("click")
        await rightButton.trigger("click")

        // Activate it in the selected list, then click right again
        await getListItems(wrapper, 1)[0].trigger("click")
        await rightButton.trigger("click")

        // Nothing changed
        expect(getListItems(wrapper, 1).length).toBe(1)
        wrapper.unmount()
    })

    it("does nothing on left-click when active option is in the available list", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")
        const leftButton = buttons[1]

        await getListItems(wrapper, 0)[0].trigger("click")
        await leftButton.trigger("click")

        expect(getListItems(wrapper, 0).length).toBe(4)
        expect(getListItems(wrapper, 1).length).toBe(0)
        wrapper.unmount()
    })

    it("supports ctrl-click multi-select within the available list", async () => {
        const wrapper = makeWrapper()
        const items = getListItems(wrapper, 0)

        await items[0].trigger("click")
        await items[1].trigger("click", { ctrlKey: true })
        await items[2].trigger("click", { ctrlKey: true })

        const buttons = wrapper.findAll("button")
        await buttons[0].trigger("click")

        expect(getListItems(wrapper, 1).length).toBe(3)
        const emitted = wrapper.emitted("update:modelValue")!
        expect(emitted[emitted.length - 1]).toEqual([["red", "green", "blue"]])
        wrapper.unmount()
    })

    it("toggles a ctrl-clicked option off the active set", async () => {
        const wrapper = makeWrapper()
        const items = getListItems(wrapper, 0)

        await items[0].trigger("click")
        await items[1].trigger("click", { ctrlKey: true })
        // Toggle item[1] off
        await items[1].trigger("click", { ctrlKey: true })

        const buttons = wrapper.findAll("button")
        await buttons[0].trigger("click")

        expect(getListItems(wrapper, 1).length).toBe(1)
        expect(getListItems(wrapper, 1)[0].text()).toContain("Red")
        wrapper.unmount()
    })

    it("clears active selection when ctrl-clicking across listboxes (available -> selected)", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")

        // Put two options on the right side
        await getListItems(wrapper, 0)[0].trigger("click")
        await buttons[0].trigger("click")
        await getListItems(wrapper, 0)[0].trigger("click")
        await buttons[0].trigger("click")

        // Activate one available option, then ctrl-click a selected option
        await getListItems(wrapper, 0)[0].trigger("click")
        await getListItems(wrapper, 1)[0].trigger("click", { ctrlKey: true })

        // Now move-left should move only the selected-side active option
        await buttons[1].trigger("click")
        expect(getListItems(wrapper, 1).length).toBe(1)
        wrapper.unmount()
    })

    it("supports shift-click range selection within the available list", async () => {
        const wrapper = makeWrapper()
        const items = getListItems(wrapper, 0)

        await items[0].trigger("click")
        await items[2].trigger("click", { shiftKey: true })

        const buttons = wrapper.findAll("button")
        await buttons[0].trigger("click")

        // Should move Red, Green, Blue (indexes 0..2)
        expect(getListItems(wrapper, 1).length).toBe(3)
        wrapper.unmount()
    })

    it("supports shift-click range selection within the selected list", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")

        // Move all 4 items right one-by-one
        for (let i = 0; i < 4; i++) {
            await getListItems(wrapper, 0)[0].trigger("click")
            await buttons[0].trigger("click")
        }

        const selectedItems = getListItems(wrapper, 1)
        await selectedItems[0].trigger("click")
        await selectedItems[2].trigger("click", { shiftKey: true })

        await buttons[1].trigger("click")
        expect(getListItems(wrapper, 0).length).toBe(3)
        expect(getListItems(wrapper, 1).length).toBe(1)
        wrapper.unmount()
    })

    it("falls back to single-select on shift-click when last activated option lives in the other list", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")

        // Move Red right
        await getListItems(wrapper, 0)[0].trigger("click")
        await buttons[0].trigger("click")

        // Activate something in available, then shift-click a selected-side option
        await getListItems(wrapper, 0)[0].trigger("click")
        await getListItems(wrapper, 1)[0].trigger("click", { shiftKey: true })

        // Should now be only the selected-side option active; left-button moves it back
        await buttons[1].trigger("click")
        expect(getListItems(wrapper, 1).length).toBe(0)
        wrapper.unmount()
    })

    it("re-parses options when the options prop changes", async () => {
        const wrapper = makeWrapper()
        expect(getListItems(wrapper, 0).length).toBe(4)

        await wrapper.setProps({ options: [{ id: "9", label: "Black", value: "black" }] })
        expect(getListItems(wrapper, 0).length).toBe(1)
        expect(getListItems(wrapper, 0)[0].text()).toContain("Black")
        wrapper.unmount()
    })

    it("moves a selected option down with the down button", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")

        // Move all to the right
        for (let i = 0; i < 4; i++) {
            await getListItems(wrapper, 0)[0].trigger("click")
            await buttons[0].trigger("click")
        }
        // Order is Red, Green, Blue, Yellow — activate Red and move down
        await getListItems(wrapper, 1)[0].trigger("click")
        await buttons[3].trigger("click") // down button

        const selectedTexts = getListItems(wrapper, 1).map(item => item.text())
        expect(selectedTexts[0]).toContain("Green")
        expect(selectedTexts[1]).toContain("Red")

        const emitted = wrapper.emitted("update:modelValue")!
        expect(emitted[emitted.length - 1]).toEqual([["green", "red", "blue", "yellow"]])
        wrapper.unmount()
    })

    it("moves a selected option up with the up button", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")

        for (let i = 0; i < 4; i++) {
            await getListItems(wrapper, 0)[0].trigger("click")
            await buttons[0].trigger("click")
        }

        // Activate Yellow (index 3) and move up
        await getListItems(wrapper, 1)[3].trigger("click")
        await buttons[2].trigger("click") // up button

        const selectedTexts = getListItems(wrapper, 1).map(item => item.text())
        expect(selectedTexts[2]).toContain("Yellow")
        expect(selectedTexts[3]).toContain("Blue")
        wrapper.unmount()
    })

    it("ignores up/down when the last activated option is on the available side", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")

        await getListItems(wrapper, 0)[0].trigger("click")
        await buttons[2].trigger("click") // up button
        await buttons[3].trigger("click") // down button

        // No model emission because nothing changed
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()
        wrapper.unmount()
    })

    it("ignores down when the active selected option is already at the bottom", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")

        // Move Red right
        await getListItems(wrapper, 0)[0].trigger("click")
        await buttons[0].trigger("click")

        const emittedBefore = wrapper.emitted("update:modelValue")!.length

        // Activate Red on the right, click down — Red is the only/last item
        await getListItems(wrapper, 1)[0].trigger("click")
        await buttons[3].trigger("click")

        // No additional update emitted
        expect(wrapper.emitted("update:modelValue")!.length).toBe(emittedBefore)
        wrapper.unmount()
    })

    it("ignores up when the active selected option is already at the top", async () => {
        const wrapper = makeWrapper()
        const buttons = wrapper.findAll("button")

        await getListItems(wrapper, 0)[0].trigger("click")
        await buttons[0].trigger("click")

        const emittedBefore = wrapper.emitted("update:modelValue")!.length

        await getListItems(wrapper, 1)[0].trigger("click")
        await buttons[2].trigger("click")

        expect(wrapper.emitted("update:modelValue")!.length).toBe(emittedBefore)
        wrapper.unmount()
    })

    it("renders the option child component for each provided option", () => {
        const wrapper = makeWrapper()
        const optionComponents = wrapper.findAllComponents(SldsDuelingPicklistOption)
        expect(optionComponents.length).toBe(4)
        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = makeWrapper()
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })

    it("applies modelValue to selectedOptions on mount and updates split when modelValue changes", async () => {
        const wrapper = makeWrapper({ modelValue: ["red", "blue"] })

        const availableTexts = getListItems(wrapper, 0).map(item => item.text())
        const selectedTexts = getListItems(wrapper, 1).map(item => item.text())

        expect(selectedTexts.length).toBe(2)
        expect(selectedTexts[0]).toContain("Red")
        expect(selectedTexts[1]).toContain("Blue")
        expect(availableTexts.length).toBe(2)
        expect(availableTexts.some(text => text.includes("Red"))).toBe(false)
        expect(availableTexts.some(text => text.includes("Blue"))).toBe(false)
        expect(availableTexts.some(text => text.includes("Green"))).toBe(true)
        expect(availableTexts.some(text => text.includes("Yellow"))).toBe(true)

        await wrapper.setProps({ modelValue: ["yellow"] })

        const updatedSelected = getListItems(wrapper, 1).map(item => item.text())
        const updatedAvailable = getListItems(wrapper, 0).map(item => item.text())

        expect(updatedSelected.length).toBe(1)
        expect(updatedSelected[0]).toContain("Yellow")
        expect(updatedAvailable.length).toBe(3)
        expect(updatedAvailable.some(text => text.includes("Yellow"))).toBe(false)

        wrapper.unmount()
    })
})
