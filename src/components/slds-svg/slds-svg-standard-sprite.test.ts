import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import SldsSvgStandardSprite from "./slds-svg-standard-sprite.vue"

describe("SldsSvgStandardSprite", () => {
    it("renders inert sprite markup inside an <svg> host", () => {
        const Host = defineComponent({
            render() {
                return h("svg", {}, [h(SldsSvgStandardSprite, { id: "default" })])
            },
        })

        const wrapper = mount(Host)
        expect(wrapper.find("svg").exists()).toBe(true)
    })
})
