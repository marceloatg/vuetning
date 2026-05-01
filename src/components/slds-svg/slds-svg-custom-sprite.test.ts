import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import SldsSvgCustomSprite from "./slds-svg-custom-sprite.vue"

describe("SldsSvgCustomSprite", () => {
    it("renders inert sprite markup inside an <svg> host", () => {
        const Host = defineComponent({
            render() {
                return h("svg", {}, [h(SldsSvgCustomSprite, { id: "default" })])
            },
        })

        const wrapper = mount(Host)
        expect(wrapper.find("svg").exists()).toBe(true)
    })
})
