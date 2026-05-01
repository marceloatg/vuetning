import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsScopedTabContent from "./slds-scoped-tab-content.vue"

describe("SldsScopedTabContent", () => {
    it("renders a tabpanel with the correct id", () => {
        const wrapper = mount(SldsScopedTabContent, {
            props: { name: "details" },
            slots: { default: "Body" },
        })

        expect(wrapper.attributes("role")).toBe("tabpanel")
        expect(wrapper.attributes("id")).toBe("scoped-tab-default-details")
    })

    it("toggles slds-show vs slds-hide based on isActive", async () => {
        const wrapper = mount(SldsScopedTabContent, {
            props: { name: "details", isActive: false },
        })
        expect(wrapper.classes()).toContain("slds-hide")

        await wrapper.setProps({ isActive: true })
        expect(wrapper.classes()).toContain("slds-show")
    })


    it("has no axe-detectable accessibility violations when wrapped properly", async () => {
        const Host = defineComponent({
            render() {
                return h("div", {}, [
                    h("ul", { role: "tablist" }, [
                        h("li", { role: "presentation" }, [
                            h("a", { id: "scoped-tab-default-details__item", role: "tab", "aria-controls": "scoped-tab-default-details", "aria-selected": "true" }, "Details"),
                        ]),
                    ]),
                    h(SldsScopedTabContent, { name: "details", isActive: true }, () => "Body"),
                ])
            },
        })

        const wrapper = mount(Host, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
