import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsTabContent from "./slds-tab-content.vue"

describe("SldsTabContent", () => {
    it("renders a tabpanel with the correct id and aria-labelledby", () => {
        const wrapper = mount(SldsTabContent, {
            props: { name: "details" },
            slots: { default: "<p>Body</p>" },
        })

        expect(wrapper.find("[role=\"tabpanel\"]").exists()).toBe(true)
        expect(wrapper.attributes("id")).toBe("tab-default-details")
        expect(wrapper.attributes("aria-labelledby")).toBe("details__item")
        expect(wrapper.text()).toContain("Body")
    })

    it("hides the panel by default when isActive is not set", () => {
        const wrapper = mount(SldsTabContent, {
            props: { name: "details" },
        })

        expect(wrapper.classes()).toContain("slds-hide")
        expect(wrapper.classes()).not.toContain("slds-show")
    })

    it("toggles slds-show vs slds-hide based on isActive", async () => {
        const wrapper = mount(SldsTabContent, {
            props: { name: "details", isActive: false },
        })

        expect(wrapper.classes()).toContain("slds-hide")

        await wrapper.setProps({ isActive: true })
        expect(wrapper.classes()).toContain("slds-show")
        expect(wrapper.classes()).not.toContain("slds-hide")
    })


    it("has no axe-detectable accessibility violations when wrapped properly", async () => {
        const Host = defineComponent({
            render() {
                return h("div", {}, [
                    h("ul", { role: "tablist" }, [
                        h("li", { role: "presentation" }, [
                            h("a", { id: "details__item", role: "tab", "aria-controls": "tab-default-details", "aria-selected": "true" }, "Details"),
                        ]),
                    ]),
                    h(SldsTabContent, { name: "details", isActive: true }, () => "Body"),
                ])
            },
        })

        const wrapper = mount(Host, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
