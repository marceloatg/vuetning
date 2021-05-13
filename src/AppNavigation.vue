<template>
    <div>
        Components
    </div>
</template>

<script>
export default {
    name: "AppNavigation",

    data() {
        return {
            items: [
                {
                    label: 'CTO',
                    name: 'CTO',
                    expanded: false,
                    items: [
                        {
                            label: 'Director',
                            name: 'CTO-DIR',
                            expanded: false,
                            items: [
                                {
                                    label: 'Manager 1',
                                    name: 'CTO-MGR-1',
                                    expanded: false,
                                    items: [
                                        {
                                            label: 'Assistant Manager 1',
                                            name: 'CTO-ASM-1',
                                            expanded: false,
                                            items: [
                                                {
                                                    label: 'Supervisor 1',
                                                    name: 'CTO-MGR-1-ASM-1-SUP-1',
                                                    expanded: false,
                                                    items: [
                                                        {
                                                            label: 'Staff 1',
                                                            name:
                                                                'CTO-MGR-1-ASM-1-SUP-1-STA-1',
                                                        },
                                                        {
                                                            label: 'Staff 2',
                                                            name:
                                                                'CTO-MGR-1-ASM-1-SUP-1-STA-2',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            label: 'Assistant Manager 2',
                                            name: 'CTO-ASM-2',
                                            expanded: false,
                                            items: [
                                                {
                                                    label: 'Supervisor 1',
                                                    name: 'CTO-MGR-1-ASM-2-SUP-1',
                                                    expanded: false,
                                                    items: [
                                                        {
                                                            label: 'Staff 1',
                                                            name:
                                                                'CTO-MGR-1-ASM-2-SUP-1-STA-1',
                                                        },
                                                        {
                                                            label: 'Staff 2',
                                                            name:
                                                                'CTO-MGR-1-ASM-2-SUP-1-STA-2',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Manager 2',
                                    name: 'CTO-MGR-2',
                                    expanded: false,
                                    items: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'CFO',
                    name: 'CFO',
                    expanded: true,
                    items: [
                        {
                            label: 'Director',
                            name: 'CFO-DIR',
                            expanded: false,
                            items: [
                                {
                                    label: 'Manager 1',
                                    name: 'CFO-MGR-1',
                                    expanded: false,
                                    items: [
                                        {
                                            label: 'Assistant Manager 1',
                                            name: 'CFO-ASM-1',
                                        },
                                    ],
                                },
                                {
                                    label: 'Manager 2',
                                    name: 'CFO-MGR-2',
                                },
                            ],
                        },
                    ],
                },
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
        onClick() {
            this.items.push({
                label: 'Foo',
                name: 'Foo',
                items: []
            })
        },

        async onSelect(item) {
            this.selectedItem = item
            await this.$router.push(item.name)
        }
    }
}
</script>

<style scoped lang="scss">
.app-navigation {
    height: 100%;
    width: 245px;
    background: #fafaf9;
    overflow-y: auto;
}
</style>
