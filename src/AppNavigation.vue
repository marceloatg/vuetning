<template>
    <slds-vertical-navigation
        has-quickfind
        :selected-item="selectedItem"
        class="app-navigation slds-border_right"
    >
        <slds-vertical-navigation-section>
            <slds-vertical-navigation-item
                v-for="item of items"
                :key="item.name"
                :name="item.name"
                :label="item.label"
                :icon="item.icon"
                @click="onClick"
            />
        </slds-vertical-navigation-section>
    </slds-vertical-navigation>
</template>

<script>
export default {
    name: "AppNavigation",

    data() {
        return {
            items: [
                {
                    label: 'Accordion',
                    name: 'Accordion',
                },
                {
                    label: 'Activity Timeline',
                    name: 'ActivityTimeline',
                },
                {
                    label: 'Alert',
                    name: 'Alert',
                },
                {
                    label: 'App Launcher',
                    name: 'AppLauncher',
                },
                {
                    label: 'Avatar',
                    name: 'Avatar',
                },
                {
                    label: 'Avatar Group',
                    name: 'AvatarGroup',
                },
                {
                    label: 'Badge',
                    name: 'Badge',
                },
                {
                    label: 'Brand Band',
                    name: 'BrandBand',
                },
                {
                    label: 'Breadcrumbs',
                    name: 'Breadcrumbs',
                },
                {
                    label: 'Builder Header',
                    name: 'BuilderHeader',
                },
                {
                    label: 'Button',
                    name: 'Button',
                },
                {
                    label: 'Button Group',
                    name: 'ButtonGroup',
                },
                {
                    label: 'Button Icon',
                    name: 'ButtonIcon',
                },
                {
                    label: 'Card',
                    name: 'Card',
                },
                {
                    label: 'Carousel',
                    name: 'Carousel',
                },
                {
                    label: 'Chat',
                    name: 'Chat',
                },
                {
                    label: 'Checkbox',
                    name: 'Checkbox',
                },
                {
                    label: 'Checkbox Button',
                    name: 'CheckboxButton',
                },
                {
                    label: 'Checkbox Button Group',
                    name: 'CheckboxButtonGroup',
                },
                {
                    label: 'CheckboxGroup',
                    name: 'CheckboxGroup',
                },
                {
                    label: 'Checkbox Toggle',
                    name: 'CheckboxToggle',
                },
                {
                    label: 'Code Block',
                    name: 'CodeBlock',
                },
                {
                    label: 'Color Picker',
                    name: 'ColorPicker',
                },
                {
                    label: 'Combobox',
                    name: 'Combobox',
                },
                {
                    label: 'Counter',
                    name: 'Counter',
                },
                {
                    label: 'Data Table',
                    name: 'DataTable',
                },
                {
                    label: 'Date Picker',
                    name: 'DatePicker',
                },
                {
                    label: 'Datetime Picker',
                    name: 'DatetimePicker',
                },
                {
                    label: 'Docked Composer',
                    name: 'DockedComposer',
                },
                {
                    label: 'Docked Form Footer',
                    name: 'DockedFormFooter',
                },
                {
                    label: 'Docked Utility Bar',
                    name: 'DockedUtilityBar',
                },
                {
                    label: 'Drop Zone',
                    name: 'DropZone',
                },
                {
                    label: 'Dueling Picklist',
                    name: 'DuelingPicklist',
                },
                {
                    label: 'Dynamic Icon',
                    name: 'DynamicIcon',
                },
                {
                    label: 'Dynamic Menu',
                    name: 'DynamicMenu',
                },
                {
                    label: 'Expandable Section',
                    name: 'ExpandableSection',
                },
                {
                    label: 'Expression',
                    name: 'Expression',
                },
                {
                    label: 'Feed',
                    name: 'Feed',
                },
                {
                    label: 'File',
                    name: 'File',
                },
                {
                    label: 'File Selector',
                    name: 'FileSelector',
                },
                {
                    label: 'Global Header',
                    name: 'GlobalHeader',
                },
                {
                    label: 'Global Navigation',
                    name: 'GlobalNavigation',
                },
                {
                    label: 'Icon',
                    name: 'Icon',
                },
                {
                    label: 'Illustration',
                    name: 'Illustration',
                },
                {
                    label: 'Input',
                    name: 'Input',
                },
                {
                    label: 'List Builder',
                    name: 'ListBuilder',
                },
                {
                    label: 'Lookup',
                    name: 'Lookup',
                },
                {
                    label: 'Map',
                    name: 'Map',
                },
                {
                    label: 'Menu',
                    name: 'Menu',
                },
                {
                    label: 'Modal',
                    name: 'Modal',
                },
                {
                    label: 'Notifications',
                    name: 'Notifications',
                },
                {
                    label: 'Page Header',
                    name: 'PageHeader',
                },
                {
                    label: 'Panel',
                    name: 'Panel',
                },
                {
                    label: 'Path',
                    name: 'Path',
                },
                {
                    label: 'Picklist',
                    name: 'Picklist',
                },
                {
                    label: 'Pill',
                    name: 'Pill',
                },
                {
                    label: 'Popover',
                    name: 'Popover',
                },
                {
                    label: 'Progress Bar',
                    name: 'ProgressBar',
                },
                {
                    label: 'Progress Indicator',
                    name: 'ProgressIndicator',
                },
                {
                    label: 'Progress Ring',
                    name: 'ProgressRing',
                },
                {
                    label: 'Prompt',
                    name: 'Prompt',
                },
                {
                    label: 'Publisher',
                    name: 'Publisher',
                },
                {
                    label: 'Radio Button Group',
                    name: 'RadioButtonGroup',
                },
                {
                    label: 'Radio Group',
                    name: 'RadioGroup',
                },
                {
                    label: 'Rich Text Editor',
                    name: 'RichTextEditor',
                },
                {
                    label: 'Scoped Notification',
                    name: 'ScopedNotification',
                },
                {
                    label: 'Scoped Tabs',
                    name: 'ScopedTabs',
                },
                {
                    label: 'Setup Assistant',
                    name: 'SetupAssistant',
                },
                {
                    label: 'Slider',
                    name: 'Slider',
                },
                {
                    label: 'Spinner',
                    name: 'Spinner',
                },
                {
                    label: 'Split View',
                    name: 'SplitView',
                },
                {
                    label: 'Summary Detail',
                    name: 'SummaryDetail',
                },
                {
                    label: 'Tabs',
                    name: 'Tabs',
                },
                {
                    label: 'Text Area',
                    name: 'TextArea',
                },
                {
                    label: 'Tile',
                    name: 'Tile',
                },
                {
                    label: 'Time Picker',
                    name: 'TimePicker',
                },
                {
                    label: 'Toasts',
                    name: 'Toasts',
                },
                {
                    label: 'Tooltip',
                    name: 'Tooltip',
                },
                {
                    label: 'Tree',
                    name: 'Tree',
                },
                {
                    label: 'Tree Grid',
                    name: 'TreeGrid',
                },
                {
                    label: 'Trial Bar',
                    name: 'TrialBar',
                },
                {
                    label: 'Vertical Navigation',
                    name: 'VerticalNavigation',
                },
                {
                    label: 'Vertical Tabs',
                    name: 'VerticalTabs',
                },
                {
                    label: 'Visual Picker',
                    name: 'VisualPicker',
                },
                {
                    label: 'Welcome Mat',
                    name: 'WelcomeMat',
                },
            ],
            selectedItem: null
        }
    },

    methods: {
        async onClick(item) {
            this.selectedItem = item
            await this.$router.push(item)
        },
    }
}
</script>

<style scoped lang="scss">
.app-navigation {
    width: 260px;
    background: white;
}
</style>
