import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsFormElement from "./slds-form-element.vue"
import type { ValidationError } from "./validation-error"

describe("SldsFormElement", () => {
    it("renders the form element wrapper with its label", () => {
        const wrapper = mount(SldsFormElement, {
            props: { label: "Name" },
            slots: { default: "<input class='slds-input' />" },
        })

        expect(wrapper.find(".slds-form-element").exists()).toBe(true)
        expect(wrapper.text()).toContain("Name")
    })

    it("does not render a label when neither label prop nor label slot is provided", () => {
        const wrapper = mount(SldsFormElement, {
            slots: { default: "<input class='slds-input' />" },
        })

        expect(wrapper.find("label.slds-form-element__label").exists()).toBe(false)
    })

    it("renders the label slot when provided, ignoring the label prop", () => {
        const wrapper = mount(SldsFormElement, {
            props: { label: "Ignored" },
            slots: {
                label: "<span class='custom-label'>Custom</span>",
                default: "<input class='slds-input' />",
            },
        })

        expect(wrapper.find(".custom-label").text()).toBe("Custom")
    })

    it("applies the stacked modifier when stacked is true", () => {
        const wrapper = mount(SldsFormElement, {
            props: { label: "Name", stacked: true },
            slots: { default: "<input class='slds-input' />" },
        })

        expect(wrapper.find(".slds-form-element").classes()).toContain("slds-form-element_stacked")
    })

    it("applies the readonly modifier when bordered is true", () => {
        const wrapper = mount(SldsFormElement, {
            props: { label: "Name", bordered: true },
            slots: { default: "<input class='slds-input' />" },
        })

        expect(wrapper.find(".slds-form-element").classes()).toContain("slds-form-element_readonly")
    })

    it("forwards the required prop to the label", () => {
        const wrapper = mount(SldsFormElement, {
            props: { label: "Name", required: true },
            slots: { default: "<input class='slds-input' />" },
        })

        expect(wrapper.find("abbr.slds-required").exists()).toBe(true)
    })

    it("renders the tooltip icon when tooltip prop is provided", () => {
        const wrapper = mount(SldsFormElement, {
            props: { label: "Name", tooltip: "Help text" },
            slots: { default: "<input class='slds-input' />" },
        })

        expect(wrapper.find(".slds-form-element__icon").exists()).toBe(true)
    })

    it("renders the tooltip slot when provided", () => {
        const wrapper = mount(SldsFormElement, {
            props: { label: "Name" },
            slots: {
                tooltip: "<span class='custom-tooltip'>Hi</span>",
                default: "<input class='slds-input' />",
            },
        })

        expect(wrapper.find(".slds-form-element__icon").exists()).toBe(true)
    })

    it("renders error messages when errors prop is non-empty and an error slot is supplied", () => {
        const errors: ValidationError[] = [
            { $uid: "e1", $message: "Required" } as ValidationError,
            { $uid: "e2", $message: "Too short" } as ValidationError,
        ]

        const wrapper = mount(SldsFormElement, {
            props: { label: "Name", errors },
            slots: {
                default: "<input class='slds-input' />",
                // The default error slot fallback only renders when an error slot exists.
                // See hasErrorMessages getter in slds-form-element.vue.
                error: "<p data-testid='error'>Required</p><p data-testid='error'>Too short</p>",
            },
        })

        expect(wrapper.find(".slds-form-element").classes()).toContain("slds-has-error")
        const errorEls = wrapper.findAll("[data-testid=\"error\"]")
        expect(errorEls.length).toBe(2)
        expect(errorEls[0].text()).toBe("Required")
        expect(errorEls[1].text()).toBe("Too short")
    })

    it("renders the default error fallback when errors are provided without an error slot", () => {
        const errors: ValidationError[] = [
            { $uid: "e1", $message: "Required" } as ValidationError,
            { $uid: "e2", $message: "Too short" } as ValidationError,
        ]

        const wrapper = mount(SldsFormElement, {
            props: { label: "Name", errors },
            slots: { default: "<input class='slds-input' />" },
        })

        expect(wrapper.find(".slds-form-element").classes()).toContain("slds-has-error")
        const errorEls = wrapper.findAll("[data-testid=\"error\"]")
        expect(errorEls.length).toBe(2)
        expect(errorEls[0].text()).toBe("Required")
        expect(errorEls[1].text()).toBe("Too short")
    })

    it("hides errors when suppressErrors is true even with errors present", () => {
        const errors: ValidationError[] = [{ $uid: "e1", $message: "Required" } as ValidationError]

        const wrapper = mount(SldsFormElement, {
            props: { label: "Name", errors, suppressErrors: true },
            slots: { default: "<input class='slds-input' />" },
        })

        expect(wrapper.find("[data-testid=\"errors\"]").exists()).toBe(false)
        expect(wrapper.find(".slds-form-element").classes()).not.toContain("slds-has-error")
    })

    it("renders inline help when an empty error slot is supplied alongside the help prop", () => {
        const wrapper = mount(SldsFormElement, {
            props: { label: "Name", help: "Inline help" },
            slots: {
                default: "<input class='slds-input' />",
                error: "",
            },
        })

        expect(wrapper.find("[data-testid=\"help\"]").exists()).toBe(true)
        expect(wrapper.find("[data-testid=\"help\"]").text()).toContain("Inline help")
    })

    it("does not render inline help when no error slot is supplied", () => {
        const wrapper = mount(SldsFormElement, {
            props: { label: "Name", help: "Inline help" },
            slots: { default: "<input class='slds-input' />" },
        })

        expect(wrapper.find("[data-testid=\"help\"]").exists()).toBe(false)
    })

    it("renders the error slot when provided with errors", () => {
        const errors: ValidationError[] = [{ $uid: "e1", $message: "X" } as ValidationError]

        const wrapper = mount(SldsFormElement, {
            props: { label: "Name", errors },
            slots: {
                default: "<input class='slds-input' />",
                error: "<p class='custom-error'>Custom Error</p>",
            },
        })

        expect(wrapper.find(".custom-error").exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsFormElement, {
            props: { label: "Name" },
            slots: { default: "<input class='slds-input' aria-label='Name' />" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
