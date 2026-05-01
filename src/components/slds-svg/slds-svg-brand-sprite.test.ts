import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import SldsSvgBrandSprite from "./slds-svg-brand-sprite.vue"

describe("SldsSvgBrandSprite", () => {
    it("renders inert sprite markup inside an <svg> host", () => {
        const Host = defineComponent({
            render() {
                return h("svg", {}, [h(SldsSvgBrandSprite, { id: "default" })])
            },
        })

        const wrapper = mount(Host)
        expect(wrapper.find("svg").exists()).toBe(true)
    })
})
