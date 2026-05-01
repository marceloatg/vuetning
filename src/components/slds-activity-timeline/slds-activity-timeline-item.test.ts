import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsActivityTimelineItem from "./slds-activity-timeline-item.vue"

describe("SldsActivityTimelineItem", () => {
    it("renders the timeline item with the subject", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:task", type: "task", subject: "Call John", date: "2024-01-01" },
        })

        expect(wrapper.find(".slds-timeline__item_expandable").exists()).toBe(true)
        expect(wrapper.text()).toContain("Call John")
    })

    it("appends the type modifier class", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "Hi" },
        })

        expect(wrapper.find(".slds-timeline__item_expandable").classes()).toContain("slds-timeline__item_email")
    })

    it("renders the assistive-text span when assistiveText is provided", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:task", type: "task", subject: "X", assistiveText: "task hint" },
        })

        const span = wrapper.find(".slds-assistive-text")
        expect(span.exists()).toBe(true)
        expect(span.text()).toBe("task hint")
    })

    it("omits the assistive-text span when assistiveText is empty", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:task", type: "task", subject: "X" },
        })

        expect(wrapper.find(".slds-assistive-text").exists()).toBe(false)
    })

    it("renders a checkbox only for type=task", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:task", type: "task", subject: "X" },
        })
        expect(wrapper.find("input[type=\"checkbox\"]").exists()).toBe(true)

        const otherWrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "X" },
        })
        expect(otherWrapper.find("input[type=\"checkbox\"]").exists()).toBe(false)
    })

    it("renders the date in the right column", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:task", type: "task", subject: "X", date: "Yesterday" },
        })

        expect(wrapper.find(".slds-timeline__date").text()).toBe("Yesterday")
    })

    it("renders the actions slot", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:task", type: "task", subject: "X" },
            slots: { actions: "<button class=\"action-btn\">Go</button>" },
        })

        expect(wrapper.find(".action-btn").exists()).toBe(true)
    })

    it("renders the activity slot", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:task", type: "task", subject: "X" },
            slots: { activity: "<span class='activity-body'>Body</span>" },
        })

        expect(wrapper.find(".activity-body").exists()).toBe(true)
    })

    it("does not render an expandable trigger button when not expandable", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "X" },
        })

        expect(wrapper.find(".slds-timeline__details-action-icon").exists()).toBe(false)
        expect(wrapper.find("article.slds-timeline__item_details").exists()).toBe(false)
    })

    it("applies non-hoverable class to the subject grid when not expandable", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "X" },
        })

        expect(wrapper.find(".slds-timeline__trigger").classes()).toContain("non-hoverable")
    })

    it("does not apply non-hoverable class to the subject grid when expandable", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "X", expandable: true },
        })

        expect(wrapper.find(".slds-timeline__trigger").classes()).not.toContain("non-hoverable")
    })

    it("toggles the expandable details box when the switch is clicked", async () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "X", expandable: true },
            slots: { default: "<div class='details'>Details</div>" },
        })

        expect(wrapper.find("article.slds-timeline__item_details").exists()).toBe(false)
        expect(wrapper.find(".slds-is-open").exists()).toBe(false)

        const button = wrapper.find("button")
        await button.trigger("click")

        expect(wrapper.find("article.slds-timeline__item_details").exists()).toBe(true)
        expect(wrapper.find(".details").exists()).toBe(true)
        expect(wrapper.find(".slds-timeline__item_expandable").classes()).toContain("slds-is-open")

        await button.trigger("click")
        expect(wrapper.find("article.slds-timeline__item_details").exists()).toBe(false)
    })

    it("applies the call icon class when call prop is true", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:log_a_call", type: "call", subject: "X", call: true },
        })

        const icon = wrapper.findAll(".slds-timeline__icon")
        expect(icon.some((i) => i.classes().includes("slds-icon-standard-log-a-call"))).toBe(true)
    })

    it("applies the default icon class when default prop is true", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:default", type: "default", subject: "X", default: true },
        })

        const icon = wrapper.findAll(".slds-timeline__icon")
        expect(icon.some((i) => i.classes().includes("slds-icon-standard-generic-loading"))).toBe(true)
    })

    it("applies the email icon class when email prop is true", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "X", email: true },
        })

        const icon = wrapper.findAll(".slds-timeline__icon")
        expect(icon.some((i) => i.classes().includes("slds-icon-standard-email"))).toBe(true)
    })

    it("applies the event icon class when event prop is true", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:event", type: "event", subject: "X", event: true },
        })

        const icon = wrapper.findAll(".slds-timeline__icon")
        expect(icon.some((i) => i.classes().includes("slds-icon-standard-event"))).toBe(true)
    })

    it("applies the task icon class when task prop is true", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:task", type: "task", subject: "X", task: true },
        })

        const icon = wrapper.findAll(".slds-timeline__icon")
        expect(icon.some((i) => i.classes().includes("slds-icon-standard-task"))).toBe(true)
    })

    it("renders nothing extra in icon class when no variant prop is set", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "X" },
        })

        const icon = wrapper.findAll(".slds-timeline__icon")
        const variantClasses = ["slds-icon-standard-log-a-call", "slds-icon-standard-generic-loading", "slds-icon-standard-email", "slds-icon-standard-event", "slds-icon-standard-task"]
        const found = icon.some((i) => variantClasses.some((c) => i.classes().includes(c)))
        expect(found).toBe(false)
    })

    it("renders subject icons when subjectIconsNames is a string", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "X", subjectIconsNames: "utility:lock" },
        })

        const icons = wrapper.findAllComponents({ name: "slds-icon" })
        expect(icons.length).toBeGreaterThanOrEqual(2)
    })

    it("renders subject icons when subjectIconsNames is a string array", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "X", subjectIconsNames: ["utility:lock", "utility:adduser"] },
        })

        const icons = wrapper.findAllComponents({ name: "slds-icon" })
        expect(icons.length).toBeGreaterThanOrEqual(3)
    })

    it("renders no subject icons when subjectIconsNames is an array of non-strings", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "X", subjectIconsNames: [1, 2] as unknown as string[] },
        })

        const subjectIconWrapper = wrapper.find(".slds-no-flex")
        expect(subjectIconWrapper.findAllComponents({ name: "slds-icon" }).length).toBe(0)
    })

    it("renders the subject-action-icons slot when provided, overriding default subject icons", () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:email", type: "email", subject: "X", subjectIconsNames: "utility:lock" },
            slots: { "subject-action-icons": "<i class='custom-icon'></i>" },
        })

        expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations for the task variant", async () => {
        const wrapper = mount(SldsActivityTimelineItem, {
            props: { iconName: "standard:task", type: "task", subject: "Follow up" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
