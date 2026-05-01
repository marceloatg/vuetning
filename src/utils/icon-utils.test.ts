import { describe, it, expect } from "vitest"

import iconUtils from "./icon-utils"

describe("iconUtils", () => {
    describe("isValidName", () => {
        it("accepts a category:name pair", () => {
            expect(iconUtils.isValidName("utility:check")).toBe(true)
        })

        it("rejects a name without a colon", () => {
            expect(iconUtils.isValidName("utilitycheck")).toBe(false)
        })

        it("rejects an empty string", () => {
            expect(iconUtils.isValidName("")).toBe(false)
        })

        it("rejects names that begin with a digit", () => {
            expect(iconUtils.isValidName("utility:1check")).toBe(false)
        })
    })

    describe("getCategory", () => {
        it("returns the category for a valid icon name", () => {
            expect(iconUtils.getCategory("utility:check")).toBe("utility")
        })

        it("returns an empty string for an invalid icon name", () => {
            expect(iconUtils.getCategory("invalid")).toBe("")
        })
    })

    describe("getName", () => {
        it("returns the name segment for a valid icon name", () => {
            expect(iconUtils.getName("utility:check")).toBe("check")
        })

        it("returns the name segment when it includes underscores", () => {
            expect(iconUtils.getName("utility:change_owner")).toBe("change_owner")
        })

        it("returns an empty string for an invalid icon name", () => {
            expect(iconUtils.getName("nope")).toBe("")
        })
    })

    describe("computeBackgroundClass", () => {
        it("returns an SLDS background class for a valid icon", () => {
            expect(iconUtils.computeBackgroundClass("utility:check")).toBe("slds-icon-utility-check")
        })

        it("converts underscores in the name to dashes", () => {
            expect(iconUtils.computeBackgroundClass("utility:change_owner")).toBe("slds-icon-utility-change-owner")
        })

        it("returns an empty string for invalid input", () => {
            expect(iconUtils.computeBackgroundClass("bogus")).toBe("")
        })
    })
})
