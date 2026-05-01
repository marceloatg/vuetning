import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsDuelingPicklistOption from "./slds-dueling-picklist-option.vue"

describe("SldsDuelingPicklistOption", () => {
    it("renders an <li> listbox item with the label", () => {
        const wrapper = mount(SldsDuelingPicklistOption, {
            props: { label: "Red" },
        })

        expect(wrapper.find("li.slds-listbox__item").exists()).toBe(true)
        expect(wrapper.text()).toContain("Red")
    })

    it("applies the selected class when isActive is true", () => {
        const wrapper = mount(SldsDuelingPicklistOption, {
            props: { label: "Red", isActive: true },
        })
        expect(wrapper.find("[role=\"option\"]").classes()).toContain("slds-is-selected")
    })

    it("emits ctrl-click when the option is ctrl+clicked", async () => {
        const wrapper = mount(SldsDuelingPicklistOption, {
            props: { label: "Red" },
        })

        await wrapper.trigger("click", { ctrlKey: true })
        expect(wrapper.emitted("ctrl-click")).toBeTruthy()
    })

    it("has no axe-detectable accessibility violations when wrapped in a labeled listbox", async () => {
        const Host = defineComponent({
            components: { SldsDuelingPicklistOption },
            render() {
                return h("ul", { role: "listbox", "aria-label": "Options" }, [
                    h(SldsDuelingPicklistOption, { label: "Red" }),
                ])
            },
        })

        const wrapper = mount(Host, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
