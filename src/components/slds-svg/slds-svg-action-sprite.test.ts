import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import SldsSvgActionSprite from "./slds-svg-action-sprite.vue"

describe("SldsSvgActionSprite", () => {
    it("renders inert sprite markup inside an <svg> host", () => {
        const Host = defineComponent({
            render() {
                return h("svg", {}, [h(SldsSvgActionSprite, { id: "default" })])
            },
        })

        const wrapper = mount(Host)
        expect(wrapper.find("svg").exists()).toBe(true)
    })
})
