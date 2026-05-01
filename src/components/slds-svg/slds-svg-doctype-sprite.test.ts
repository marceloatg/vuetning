import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import SldsSvgDoctypeSprite from "./slds-svg-doctype-sprite.vue"

describe("SldsSvgDoctypeSprite", () => {
    it("renders inert sprite markup inside an <svg> host", () => {
        const Host = defineComponent({
            render() {
                return h("svg", {}, [h(SldsSvgDoctypeSprite, { id: "default" })])
            },
        })

        const wrapper = mount(Host)
        expect(wrapper.find("svg").exists()).toBe(true)
    })
})
