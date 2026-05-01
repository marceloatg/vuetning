import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsScopedTab from "./slds-scoped-tab.vue"

describe("SldsScopedTab", () => {
    it("renders an <li> with a tab role anchor", () => {
        const wrapper = mount(SldsScopedTab, {
            props: { label: "Details", name: "details" },
        })

        expect(wrapper.find("li.slds-tabs_scoped__item").exists()).toBe(true)
        expect(wrapper.find("[role=\"tab\"]").exists()).toBe(true)
        expect(wrapper.text()).toContain("Details")
    })

    it("adds the slds-is-active class when isActive is true", () => {
        const wrapper = mount(SldsScopedTab, {
            props: { label: "Details", name: "details", isActive: true },
        })
        expect(wrapper.find("li").classes()).toContain("slds-is-active")
    })


    it("has no axe-detectable accessibility violations when wrapped in a tablist with a matching panel", async () => {
        const Host = defineComponent({
            components: { SldsScopedTab },
            render() {
                return h("div", {}, [
                    h("ul", { class: "slds-tabs_scoped__nav", role: "tablist" }, [
                        h(SldsScopedTab, { label: "Details", name: "details", isActive: true }),
                    ]),
                    h("div", { id: "scoped-tab-default-details", role: "tabpanel", "aria-labelledby": "scoped-tab-default-details__item" }, "Body"),
                ])
            },
        })

        const wrapper = mount(Host, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
