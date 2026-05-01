import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import SldsPageHeaderDropdownHeading from "./slds-page-header-dropdown-heading.vue"

describe("SldsPageHeaderDropdownHeading", () => {
    it("renders an <li> separator with the label", () => {
        const wrapper = mount(SldsPageHeaderDropdownHeading, {
            props: { label: "Section" },
        })

        expect(wrapper.find("li[role=\"separator\"]").exists()).toBe(true)
        expect(wrapper.text()).toContain("Section")
    })

    it("renders the heading inside the listbox option header", () => {
        const wrapper = mount(SldsPageHeaderDropdownHeading, {
            props: { label: "Section" },
        })
        expect(wrapper.find("h3.slds-listbox__option-header").text()).toBe("Section")
    })
})
