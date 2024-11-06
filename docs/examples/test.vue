<template>

    <example-container class="slds-m-bottom_medium">
        <slds-button-group
            :dropdown-options="dropdownOptions"
        >
            <slds-button
                disabled
                label="foo"
                neutral
            />
        </slds-button-group>
    </example-container>

    <example-container class="slds-m-bottom_medium">
        <slds-button-group
            :dropdown-options="dropdownOptions"
            @delete="foo"
        >
            <slds-button
                label="foo"
                neutral
            />
            <slds-button
                disabled
                label="foo"
                neutral
            />
            <slds-button
                disabled
                label="foo"
                neutral
            />
        </slds-button-group>
    </example-container>

    <example-container class="slds-m-bottom_medium">
        <slds-menu
            :options="dropdownOptions"
        />
    </example-container>

    <example-container class="slds-m-bottom_medium">
        <span class="slds-icon_container slds-icon-utility-add slds-current-color" @click="foo">
            <slds-svg class="slds-icon slds-icon_x-small slds-cursor_not-allowed" icon="utility:add"/>
        </span>
    </example-container>

    <!-- Checkbox output group -->
    <example-container class="slds-m-bottom_medium">
        <slds-checkbox-output-group
            :value="values"
            :options="options1"
            label="alo"
        />
        value: {{ values }}
    </example-container>

    <!-- Checkbox group -->
    <example-container class="slds-m-bottom_medium">
        <slds-checkbox-group
            v-model="values"
            :options="options1"
            inline
        />
        value: {{ values }}
    </example-container>

    <!-- Lookup -->
    <example-container class="slds-m-bottom_medium">
        <slds-grid>

            <slds-column size="1/2">
                <slds-input
                    v-model="test"
                    label="Test"
                    required
                    stacked
                />
            </slds-column>

            <slds-column size="1/2">
                <slds-lookup
                    v-model="test1"
                    label="Test"
                    required
                    stacked
                    :options="options2"
                />
            </slds-column>

        </slds-grid>
    </example-container>

    <!-- Notification -->
    <example-container class="slds-m-bottom_medium">
        <slds-notification
            subject="title test 2"
            message="message 2"
            icon-name="standard:employee"
            icon-class="slds-icon-account"
        />
        <br>
        <slds-button neutral @click="newNotification">
            New notification
        </slds-button>

        <slds-notification-group
            :notifications="notifications"
            @close="handleCloseNotification"
        />
    </example-container>

    <!-- Dueling Picklist -->
    <example-container class="slds-m-bottom_medium">
        <slds-dueling-picklist
            v-model="values"
            source-label="Available"
            selected-label="Selected"
            :options="options1"
            label="Select Languages"
        >
            value: {{ values }}
        </slds-dueling-picklist>
    </example-container>

    <!-- Publisher -->
    <example-container class="slds-m-bottom_medium">
        <slds-publisher
            rich-text
            :model-value="value"
        />
    </example-container>

    <!-- Checkbox button -->
    <example-container class="slds-m-bottom_medium">
        <slds-checkbox-button
            v-model="test"
            label="Test"
            stacked
            readonly
        />

        <slds-checkbox-button
            label="Test"
            icon-checked="utility:ban"
            icon-unchecked="utility:away"
            inline
            stacked
            disabled
        />
    </example-container>

    <!-- Counter -->
    <example-container class="slds-m-bottom_medium">
        <slds-counter
            v-model="counter"
            label="Test"
            min="5"
            max="50"
            :errors="errors"
        />
    </example-container>

    <!-- Pagination -->
    <example-container class="slds-m-bottom_medium">
        <slds-pagination
            :current-page="currentPage"
            :total-pages="10"
            @pagechanged="clickNextPage"
        />
    </example-container>

    <!-- Scoped Tabs -->
    <example-container class="slds-m-bottom_medium">
        <slds-scoped-tabs :active="activeScopedTab" :scoped-tabs="scopedTabs" @click-tab="activeScopedTab = $event">
            <template #first>
                hello
            </template>
            <template #second>
                bye
            </template>
        </slds-scoped-tabs>
    </example-container>

    <!-- Prompt -->
    <!-- <example-container class="slds-m-bottom_medium">
      <slds-prompt
          button-label="Test"
          shade-theme
          @submit="foo"
      >

          <template #header>
              HEHEHE
          </template>

          <template #content>
              ALO ALO
          </template>

      </slds-prompt>
  </example-container> -->

    <!-- Picklist -->
    <example-container class="slds-m-bottom_medium">
        <slds-picklist
            label="Teste"
            :options="[]"
        />
    </example-container>

    <!-- Combobox -->
    <example-container class="slds-m-bottom_medium">
        <slds-combobox
            label="Teste"
            :options="[]"
            disabled
        />
    </example-container>

    <!-- Panel -->
    <example-container class="slds-m-bottom_medium">
        <slds-panel
            assistive-text="Collapse Panel Header"
            title="Sei la"
            centered-header
            back-button
            :close-button="false"
        >
            <template #header>
                <slds-button
                    label="BUTTON"
                    neutral
                />
            </template>

            A panel body accepts any layout or component
        </slds-panel>
    </example-container>

    <!-- Tabs -->
    <example-container class="slds-m-top_medium">
        <slds-tabs :active="activeTab" :tabs="tabs" @click-tab="activeTab = $event"/>
    </example-container>

    <!-- Vertical Navigation -->
    <example-container class="slds-m-top_medium">
        <slds-vertical-navigation has-quickfind active="recent">

            <slds-vertical-navigation-section title="Reports">
                <slds-vertical-navigation-item label="Recent" name="recent" badge="3"/>
                <slds-vertical-navigation-item label="Created by Me" name="created"/>
                <slds-vertical-navigation-item label="Private Reports" name="private"/>
                <slds-vertical-navigation-item label="Public Reports" name="public"/>
                <slds-vertical-navigation-item label="All Reports" name="all"/>
            </slds-vertical-navigation-section>

            <slds-vertical-navigation-section title="Folders">
                <slds-vertical-navigation-item
                    label="Created by Me"
                    name="created-by-me"
                    icon-name="utility:open_folder"
                />
                <slds-vertical-navigation-item
                    label="Shared with Me"
                    name="shared-with-me"
                    icon-name="utility:open_folder"
                />
                <slds-vertical-navigation-item label="All Reports" name="all-reports"/>
            </slds-vertical-navigation-section>

        </slds-vertical-navigation>
    </example-container>

    <!-- Menu -->
    <example-container class="slds-m-top_medium">

        <slds-menu :options="menuOptions" class="slds-p-right_small"/>

        <slds-menu :options="menuOptions" small class="slds-p-right_small"/>

        <slds-menu :options="menuOptions" x-small class="slds-p-right_small"/>

        <div class="slds-p-vertical_x-small"/>

        <slds-menu :options="menuOptions" class="slds-p-right_small"/>

        <slds-menu :options="menuOptions" center-alignment class="slds-p-right_small"/>

        <slds-menu :options="menuOptions" right-alignment class="slds-p-right_small"/>

        <div class="slds-p-vertical_x-small"/>

        <slds-menu :options="menuOptions" bottom-alignment class="slds-p-right_small"/>

        <slds-menu
            :options="menuOptions"
            bottom-alignment
            center-alignment
            class="slds-p-right_small"
        />

        <slds-menu
            :options="menuOptions"
            bottom-alignment
            right-alignment
            class="slds-p-right_small"
        />

    </example-container>

    <!-- Combobox -->
    <example-container class="slds-m-top_medium">

        <slds-combobox
            v-model="value"
            label="Relate To"
            :options="options"
            placeholder="Select an option..."
        />

        <slds-combobox
            v-model="value"
            label="Empty picklist"
            placeholder="Select an option..."
        />

        <slds-combobox
            v-model="value"
            label="Loading"
            placeholder="Select an option..."
            show-spinner
        />

        <br>

        Value: {{ value }}
    </example-container>

    <!-- Picklist -->
    <example-container class="slds-m-top_medium">

        <slds-picklist
            v-model="value"
            label="Relate To"
            :options="options"
            placeholder="Select an option..."
        />

        <slds-picklist
            v-model="value"
            label="Empty picklist"
            placeholder="Select an option..."
        />

        <slds-picklist
            v-model="value"
            label="Loading"
            placeholder="Select an option..."
            show-spinner
        />

        <br>

        Value: {{ value }}
    </example-container>

    <!-- Multi Picklist -->
    <example-container class="slds-m-top_medium">

        <slds-multi-picklist
            v-model="values"
            label="Relate To"
            :options="options"
            placeholder="Select an option..."
        />

        <br>

        Values: {{ values }}
    </example-container>

    <!-- Checkbox -->
    <example-container class="slds-m-top_medium">

        <slds-checkbox v-model="checkboxValue" label="My Checkbox" inline/>

        <slds-checkbox v-model="checkboxValue" label="My Checkbox"/>

        <slds-checkbox v-model="checkboxValue" label="My Checkbox">
            <template #error>
                Foo
            </template>
        </slds-checkbox>

        <slds-checkbox v-model="checkboxValue" label="My Checkbox">
            <template #tooltip>
                Lorem ipsum dolor sit amet
            </template>
        </slds-checkbox>

    </example-container>

    <!-- Button -->
    <example-container class="slds-m-top_medium">

        <slds-button neutral class="vp-raw">
            Slot Button
        </slds-button>

        <slds-button neutral label="Prop Button"/>

        <br>
        <br>

        <slds-button label="Button"/>
        <slds-button neutral label="Button"/>
        <slds-button brand label="Button"/>

        <br>
        <br>

        <slds-button
            neutral
            label="Button"
            icon-name="utility:add"
            icon-left
        />

        <br>
        <br>

        <slds-button
            neutral
            label="Button"
            icon-name="utility:add"
            icon-right
        />

    </example-container>

    <!-- Checkbox Button Group -->
    <example-container class="slds-m-top_medium">

        <slds-checkbox-button-group
            v-model="values"
            :options="checkboxButtonOptions"
        />

        <br>

        Values: {{ values }}
    </example-container>

</template>

<script>
import { v4 as newId } from "uuid"
import SldsButton from "../../src/components/slds-button/slds-button.vue"
import ExampleContainer from "./example-container.vue"
import SldsCheckbox from "../../src/components/slds-checkbox/slds-checkbox.vue"
import SldsPicklist from "../../src/components/slds-picklist/slds-picklist.vue"
import SldsMultiPicklist from "../../src/components/slds-multi-picklist/slds-multi-picklist.vue"
import SldsCombobox from "../../src/components/slds-combobox/slds-combobox.vue"
import SldsMenu from "../../src/components/slds-menu/slds-menu.vue"
import SldsCheckboxButtonGroup from "../../src/components/slds-checkbox-button-group/slds-checkbox-button-group.vue"
import SldsVerticalNavigation from "../../src/components/slds-vertical-navigation/slds-vertical-navigation.vue"
import SldsVerticalNavigationItem from "../../src/components/slds-vertical-navigation/slds-vertical-navigation-item.vue"
import SldsVerticalNavigationSection from "../../src/components/slds-vertical-navigation/slds-vertical-navigation-section.vue"
import SldsTabs from "../../src/components/slds-tabs/slds-tabs.vue"
import SldsPanel from "../../src/components/slds-panel/slds-panel.vue"
import SldsScopedTabs from "../../src/components/slds-scoped-tabs/slds-scoped-tabs.vue"
import SldsPagination from "../../src/components/slds-pagination/slds-pagination.vue"
import SldsCounter from "../../src/components/slds-counter/slds-counter.vue"
import SldsCheckboxButton from "../../src/components/slds-checkbox-button/slds-checkbox-button.vue"
import SldsPublisher from "../../src/components/slds-publisher/slds-publisher.vue"
import SldsDuelingPicklist from "../../src/components/slds-dueling-picklist/slds-dueling-picklist.vue"
import SldsNotification from "../../src/components/slds-notification/slds-notification.vue"
import SldsNotificationGroup from "../../src/components/slds-notification/slds-notification-group.vue"
import SldsLookup from "../../src/components/slds-lookup/slds-lookup.vue"
import SldsGrid from "../../src/components/slds-grid/slds-grid.vue"
import SldsColumn from "../../src/components/slds-grid/slds-column.vue"
import SldsInput from "../../src/components/slds-input/slds-input.vue"
import SldsCheckboxGroup from "../../src/components/slds-checkbox-group/slds-checkbox-group.vue"
import SldsCheckboxOutputGroup from "../../src/components/slds-checkbox-output-group/slds-checkbox-output-group.vue"
import SldsSvg from "../../src/components/slds-svg/slds-svg.vue"
import SldsButtonGroup from "../../src/components/slds-button-group/slds-button-group.vue"
import SldsButtonIcon from "../../src/components/slds-button-icon/slds-button-icon.vue"

export default {
    name: "test",

    components: {
        SldsButtonIcon,
        SldsButtonGroup,
        SldsSvg,
        SldsCheckboxOutputGroup,
        SldsCheckboxGroup,
        SldsInput,
        SldsColumn,
        SldsGrid,
        SldsNotificationGroup,
        SldsNotification,
        SldsLookup,
        SldsDuelingPicklist,
        SldsPublisher,
        SldsCheckboxButton,
        SldsCounter,
        SldsPagination,
        SldsScopedTabs,
        SldsPanel,
        SldsTabs,
        SldsVerticalNavigationSection,
        SldsVerticalNavigationItem,
        SldsVerticalNavigation,
        SldsCheckboxButtonGroup,
        SldsMenu,
        SldsCombobox,
        SldsMultiPicklist,
        SldsPicklist,
        SldsCheckbox,
        ExampleContainer,
        SldsButton,
    },

    data() {
        return {
            activeTab: "details",

            dropdownOptions: [
                {
                    label: "Cancel",
                    value: "cancel",
                },
                {
                    label: "Delete",
                    value: "delete",
                },
            ],

            activeScopedTab: "first",

            checkboxButtonOptions: [
                { value: "mon", label: "Monday" },
                { value: "tue", label: "Tuesday" },
                { value: "wed", label: "Wednesday" },
                { value: "thu", label: "Thursday" },
                { value: "fri", label: "Friday" },
            ],

            checkboxValue: false,

            menuOptions: [
                { label: "Option A", value: "A" },
                { label: "Option B", value: "B", iconName: "utility:anchor", disabled: true },
                {
                    label: "Option C",
                    value: "C",
                    description: "Lorem ipsum dolor sit amet.",
                    iconName: "utility:anchor",
                },
                { isDivider: true },
                {
                    label: "Burlington Textiles Corp of America",
                    value: "D",
                    description: "Account • Burlington, NC",
                    iconName: "standard:account",
                },
                { label: "Option ABCDEFGHIJKLMNOPQRSTUVWXYZ", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
            ],

            options: [
                { label: "First Section", isHeading: true },
                { label: "Option A", value: "A" },
                { label: "Option B", value: "B", iconName: "utility:anchor", disabled: true },
                {
                    label: "Option C",
                    value: "C",
                    description: "Lorem ipsum dolor sit amet.",
                    iconName: "utility:anchor",
                },
                { label: "Lorem Ipsum", isHeading: true },
                {
                    label: "Burlington Textiles Corp of America",
                    value: "D",
                    description: "Account • Burlington, NC",
                    iconName: "standard:account",
                },
                { label: "Option ABCDEFGHIJKLMNOPQRSTUVWXYZ", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
            ],

            notifications: [],

            scopedTabs: [
                { name: "first", label: "Tab 1" },
                { name: "second", label: "Tab 2" },
            ],

            tabs: [
                { name: "details", label: "Details" },
                { name: "related", label: "Related" },
            ],

            value: "",

            values: [],

            currentPage: 1,

            counter: 5,

            errors: [],

            test: false,

            test1: "en",

            options1: [
                {
                    label: "English",
                    value: "en",
                    description: "Lorem ipsum dolor sit amet.",
                    iconName: "standard:user",
                },
                { label: "German", value: "de", description: "Lorem ipsum dolor sit amet.", iconName: "standard:user" },
                {
                    label: "Spanish",
                    value: "es",
                    description: "Lorem ipsum dolor sit amet.",
                    iconName: "standard:user",
                },
                { label: "French", value: "fr", description: "Lorem ipsum dolor sit amet.", iconName: "standard:user" },
                {
                    label: "Italian",
                    value: "it",
                    description: "Lorem ipsum dolor sit amet.",
                    iconName: "standard:user",
                },
                {
                    label: "Japanese",
                    value: "ja",
                    description: "Lorem ipsum dolor sit amet.",
                    iconName: "standard:user",
                },
            ],

            options2: [
                { label: "English", value: "en", iconName: "standard:user" },
                { label: "German", value: "de", iconName: "standard:user" },
                { label: "Spanish", value: "es", iconName: "standard:user" },
                { label: "French", value: "fr", iconName: "standard:user" },
                { label: "Italian", value: "it", iconName: "standard:user" },
                { label: "Japanese", value: "ja", iconName: "standard:user" },
            ],

            options3: [
                { label: "English", value: "en" },
                { label: "German", value: "de" },
                { label: "Spanish", value: "es" },
                { label: "French", value: "fr" },
                { label: "Italian", value: "it" },
                { label: "Japanese", value: "ja" },
            ],
        }
    },

    methods: {
        clickNextPage(page) {
            this.currentPage = page
        },

        handleCloseNotification(notification) {
            const index = this.notifications.indexOf(notification)
            this.notifications.splice(index, 1)
        },

        newNotification() {
            this.notifications.push({
                iconClass: "slds-icon-account",
                iconName: "standard:employee",
                id: newId(),
                message: newId(),
                subject: "A title test1",
            })
        },

        foo() {
            console.log(1)
        },
    },
}
</script>
