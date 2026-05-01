import { describe, it, expect } from "vitest"

import domUtils from "./dom-utils"

describe("domUtils", () => {
    describe("addClass", () => {
        it("adds a class to an element via classList", () => {
            const element = document.createElement("div")
            domUtils.addClass(element, "foo")
            expect(element.classList.contains("foo")).toBe(true)
        })

        it("falls back to className concatenation when classList is unavailable", () => {
            const fakeElement = { className: "existing" } as unknown as Element
            domUtils.addClass(fakeElement, "new")
            expect(fakeElement.className).toBe("existing new")
        })
    })

    describe("removeClass", () => {
        it("removes a class via classList", () => {
            const element = document.createElement("div")
            element.classList.add("foo")
            element.classList.add("bar")
            domUtils.removeClass(element, "foo")
            expect(element.classList.contains("foo")).toBe(false)
            expect(element.classList.contains("bar")).toBe(true)
        })

        it("falls back to regex replace when classList is unavailable", () => {
            const fakeElement = { className: "alpha beta gamma" } as unknown as Element
            domUtils.removeClass(fakeElement, "beta")
            expect(fakeElement.className).not.toContain("beta")
        })
    })

    describe("hasClass", () => {
        it("returns true when class is present via classList", () => {
            const element = document.createElement("div")
            element.classList.add("foo")
            expect(domUtils.hasClass(element, "foo")).toBe(true)
        })

        it("returns false when class is not present via classList", () => {
            const element = document.createElement("div")
            expect(domUtils.hasClass(element, "foo")).toBe(false)
        })

        it("falls back to regex test when classList is unavailable", () => {
            const fakeElement = { className: "alpha beta" } as unknown as Element
            expect(domUtils.hasClass(fakeElement, "alpha")).toBe(true)
            expect(domUtils.hasClass(fakeElement, "gamma")).toBe(false)
        })

        it("returns false when element is null/undefined", () => {
            expect(domUtils.hasClass(null as unknown as Element, "foo")).toBe(false)
            expect(domUtils.hasClass(undefined as unknown as Element, "foo")).toBe(false)
        })
    })
})
