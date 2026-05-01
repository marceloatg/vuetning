import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsPublisher from "./slds-publisher.vue"

describe("SldsPublisher", () => {
    it("renders the publisher container with a textarea and button", () => {
        const wrapper = mount(SldsPublisher)

        expect(wrapper.find(".slds-publisher").exists()).toBe(true)
        expect(wrapper.find("textarea.slds-publisher__input").exists()).toBe(true)
        expect(wrapper.find("button").exists()).toBe(true)
    })

    it("renders the label when provided", () => {
        const wrapper = mount(SldsPublisher, {
            props: { label: "Share an update" },
        })
        expect(wrapper.text()).toContain("Share an update")
    })

    it("uses the default 'Share' button label", () => {
        const wrapper = mount(SldsPublisher)
        expect(wrapper.find("button").text()).toContain("Share")
    })

    it("respects a custom buttonLabel", () => {
        const wrapper = mount(SldsPublisher, {
            props: { buttonLabel: "Post" },
        })
        expect(wrapper.find("button").text()).toContain("Post")
    })

    it("emits update:modelValue when the textarea value changes", async () => {
        const wrapper = mount(SldsPublisher, {
            props: { modelValue: "" },
        })

        const textarea = wrapper.find("textarea")
        await textarea.setValue("hello")

        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["hello"])
    })

    it("activates on focus and adds the slds-is-active class", async () => {
        const wrapper = mount(SldsPublisher, {
            attachTo: document.body,
        })

        expect(wrapper.find(".slds-publisher").classes()).not.toContain("slds-is-active")
        await wrapper.find("textarea").trigger("focus")
        expect(wrapper.find(".slds-publisher").classes()).toContain("slds-is-active")

        wrapper.unmount()
    })

    it("focuses the textarea on first share click and activates without emitting post", async () => {
        const wrapper = mount(SldsPublisher, {
            attachTo: document.body,
        })

        await wrapper.find("button").trigger("click")
        expect(wrapper.find(".slds-publisher").classes()).toContain("slds-is-active")
        expect(wrapper.emitted("post")).toBeUndefined()

        wrapper.unmount()
    })

    it("emits post when the share button is clicked while active", async () => {
        const wrapper = mount(SldsPublisher, {
            attachTo: document.body,
        })

        // First click activates
        await wrapper.find("button").trigger("click")
        // Second click posts
        await wrapper.find("button").trigger("click")
        expect(wrapper.emitted("post")).toBeTruthy()
        expect(wrapper.emitted("post")).toHaveLength(1)

        wrapper.unmount()
    })

    it("stops Enter key propagation on the textarea", async () => {
        const wrapper = mount(SldsPublisher, {
            attachTo: document.body,
        })

        let bubbled = false
        const handler = () => { bubbled = true }
        document.body.addEventListener("keyup", handler)

        const textarea = wrapper.find("textarea").element as HTMLTextAreaElement
        textarea.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", bubbles: true }))

        expect(bubbled).toBe(false)
        document.body.removeEventListener("keyup", handler)
        wrapper.unmount()
    })

    it("forwards arbitrary HTML attributes to the textarea", () => {
        const wrapper = mount(SldsPublisher, {
            attrs: { placeholder: "What's happening?" },
        })

        expect(wrapper.find("textarea").attributes("placeholder")).toBe("What's happening?")
    })

    it("renders the actions slot content", () => {
        const wrapper = mount(SldsPublisher, {
            slots: { actions: "<span data-testid='extra-action'>X</span>" },
        })

        expect(wrapper.find("[data-testid='extra-action']").exists()).toBe(true)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsPublisher, {
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
