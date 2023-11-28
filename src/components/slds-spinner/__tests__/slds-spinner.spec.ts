import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import SldsSpinner from "../slds-spinner.vue"

describe("SldsSpinner", () => {
    it("renders properly", () => {
        const wrapper = mount<any>(SldsSpinner, { props: { brand: true } })
        expect(wrapper.classes()).toContain("slds-spinner_brand")
    })
})


