import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsPagination from "./slds-pagination.vue"

describe("SldsPagination", () => {
    it("renders the button group container", () => {
        const wrapper = mount(SldsPagination, {
            props: { currentPage: 1, totalPages: 5 },
        })

        expect(wrapper.find(".slds-button-group").exists()).toBe(true)
    })

    it("disables the previous button when on the first page", () => {
        const wrapper = mount(SldsPagination, {
            props: { currentPage: 1, totalPages: 5 },
        })
        const previousButton = wrapper.findAll("button")[0]
        expect(previousButton.attributes("disabled")).toBeDefined()
    })

    it("emits page-changed when next is clicked", async () => {
        const wrapper = mount(SldsPagination, {
            props: { currentPage: 1, totalPages: 5 },
        })

        const buttons = wrapper.findAll("button")
        await buttons[buttons.length - 1].trigger("click")

        expect(wrapper.emitted("pagechanged")).toBeTruthy()
        expect(wrapper.emitted("pagechanged")![0]).toEqual([2])
    })

    it("disables the next button when on the last page", () => {
        const wrapper = mount(SldsPagination, {
            props: { currentPage: 5, totalPages: 5 },
        })
        const buttons = wrapper.findAll("button")
        expect(buttons[buttons.length - 1].attributes("disabled")).toBeDefined()
    })

    it("disables all buttons when disabled prop is true", () => {
        const wrapper = mount(SldsPagination, {
            props: { currentPage: 3, totalPages: 5, disabled: true },
        })
        for (const button of wrapper.findAll("button")) {
            expect(button.attributes("disabled")).toBeDefined()
        }
    })

    it("emits page-changed when previous is clicked", async () => {
        const wrapper = mount(SldsPagination, {
            props: { currentPage: 3, totalPages: 5 },
        })

        await wrapper.findAll("button")[0].trigger("click")
        expect(wrapper.emitted("pagechanged")![0]).toEqual([2])
    })

    it("emits page-changed when a page button is clicked", async () => {
        const wrapper = mount(SldsPagination, {
            props: { currentPage: 1, totalPages: 5 },
        })

        // Buttons: prev, page 1, page 2, page 3, next  -> click page 2
        const buttons = wrapper.findAll("button")
        await buttons[2].trigger("click")
        expect(wrapper.emitted("pagechanged")![0]).toEqual([2])
    })

    it("does not emit when clicking the current page button", async () => {
        const wrapper = mount(SldsPagination, {
            props: { currentPage: 1, totalPages: 5 },
        })

        const buttons = wrapper.findAll("button")
        // Page "1" button is the current page
        await buttons[1].trigger("click")
        expect(wrapper.emitted("pagechanged")).toBeFalsy()
    })

    it("highlights the current page with the brand variant", () => {
        const wrapper = mount(SldsPagination, {
            props: { currentPage: 2, totalPages: 5 },
        })
        // Find the page button for "2"
        const brandButton = wrapper.findAll("button").find(button => button.text() === "2" && button.classes().includes("slds-button_brand"))
        expect(brandButton).toBeTruthy()
    })

    it("uses neutral variant for non-current pages", () => {
        const wrapper = mount(SldsPagination, {
            props: { currentPage: 2, totalPages: 5 },
        })
        const neutralButton = wrapper.findAll("button").find(button => button.text() === "1" && button.classes().includes("slds-button_neutral"))
        expect(neutralButton).toBeTruthy()
    })

    it("clamps the start page when currentPage is near the end", () => {
        const wrapper: any = mount(SldsPagination, {
            props: { currentPage: 5, totalPages: 5 },
        })
        // With range=3, half=1; currentPage(5) >= totalPages(5)-1=4 -> startPage = 5 - 3 + 1 = 3
        expect(wrapper.vm.startPage).toBe(3)
        expect(wrapper.vm.endPage).toBe(5)
    })

    it("clamps the start page to 1 when currentPage <= halfRange", () => {
        const wrapper: any = mount(SldsPagination, {
            props: { currentPage: 1, totalPages: 5 },
        })
        expect(wrapper.vm.startPage).toBe(1)
    })

    it("centres the page window for middle pages", () => {
        const wrapper: any = mount(SldsPagination, {
            props: { currentPage: 3, totalPages: 7 },
        })
        // halfRange = 1; startPage = 3 - 1 = 2
        expect(wrapper.vm.startPage).toBe(2)
        expect(wrapper.vm.endPage).toBe(4)
    })

    it("respects a custom range prop", () => {
        const wrapper: any = mount(SldsPagination, {
            props: { currentPage: 5, totalPages: 9, range: 5 },
        })
        // halfRange = 2, startPage = 3, endPage = 7
        expect(wrapper.vm.startPage).toBe(3)
        expect(wrapper.vm.endPage).toBe(7)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsPagination, {
            props: { currentPage: 1, totalPages: 5 },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
