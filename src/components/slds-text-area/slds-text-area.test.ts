import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsTextArea from "./slds-text-area.vue"

describe("SldsTextArea", () => {
    it("renders a textarea inside a form element", () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments" },
        })

        expect(wrapper.find("textarea.slds-textarea").exists()).toBe(true)
    })

    it("applies the disabled attribute when disabled is true", () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments", disabled: true },
        })

        const textarea = wrapper.find("textarea")
        expect(textarea.attributes("disabled")).toBeDefined()
    })

    it("emits update:modelValue when the textarea value changes", async () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments", modelValue: "" },
        })

        const textarea = wrapper.find("textarea")
        await textarea.setValue("hello")

        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["hello"])
    })

    it("forwards the placeholder, maxlength, and rows props", () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments", placeholder: "Say something", maxlength: 200, rows: 6 },
        })

        const textarea = wrapper.find("textarea")
        expect(textarea.attributes("placeholder")).toBe("Say something")
        expect(textarea.attributes("maxlength")).toBe("200")
        expect(textarea.attributes("rows")).toBe("6")
    })

    it("uses the default rows value of 3", () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments" },
        })
        expect(wrapper.find("textarea").attributes("rows")).toBe("3")
    })

    it("renders the help text via the help prop", () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments", help: "Helpful text" },
        })

        // Pass-through to slds-form-element; visibility depends on its own logic
        expect(wrapper.html()).toContain("Helpful text")
    })

    it("renders a tooltip trigger when tooltip prop is set", () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments", tooltip: "Helpful tip" },
        })

        // The tooltip trigger renders an info icon inside slds-form-element__icon
        expect(wrapper.find(".slds-form-element__icon").exists()).toBe(true)
    })

    it("renders the error slot", () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments" },
            slots: { error: "<span data-testid='err'>Bad</span>" },
        })

        expect(wrapper.find("[data-testid='err']").exists()).toBe(true)
    })

    it("stops Enter and Escape key propagation on the textarea", () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments" },
            attachTo: document.body,
        })

        let bubbled = 0
        const handler = () => { bubbled += 1 }
        document.body.addEventListener("keyup", handler)

        const textarea = wrapper.find("textarea").element as HTMLTextAreaElement
        textarea.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", bubbles: true }))
        textarea.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }))
        // Other keys should still bubble
        textarea.dispatchEvent(new KeyboardEvent("keyup", { key: "a", bubbles: true }))

        expect(bubbled).toBe(1)
        document.body.removeEventListener("keyup", handler)
        wrapper.unmount()
    })

    it("forwards arbitrary attributes to the textarea (inputAttributes)", () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments" },
            attrs: { autocomplete: "off" },
        })

        expect(wrapper.find("textarea").attributes("autocomplete")).toBe("off")
    })

    it("forwards data-* and class attributes to the form element wrapper", () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments" },
            attrs: { "data-form-id": "form-1", class: "wrapper-class" },
        })

        const root = wrapper.find(".slds-form-element")
        expect(root.attributes("data-form-id")).toBe("form-1")
        expect(root.classes()).toContain("wrapper-class")
    })

    it("renders the tooltip trigger when the tooltip slot is provided", () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments" },
            slots: { tooltip: "<span data-testid='tt-slot'>Tip</span>" },
        })

        expect(wrapper.find(".slds-form-element__icon").exists()).toBe(true)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsTextArea, {
            props: { label: "Comments" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
