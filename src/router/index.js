import Vue from 'vue'
import VueRouter from 'vue-router'

import Accordion from '../views/components/Accordion'
import ActivityTimeline from '../views/components/ActivityTimeline'
import Alert from '../views/components/Alert'
import AppLauncher from '../views/components/AppLauncher'
import Avatar from '../views/components/Avatar'
import AvatarGroup from '../views/components/AvatarGroup'
import Badge from '../views/components/Badge'
import BrandBand from '../views/components/BrandBand'
import Breadcrumbs from '../views/components/Breadcrumbs'
import BuilderHeader from '../views/components/BuilderHeader'
import Button from '../views/components/Button'
import ButtonGroup from '../views/components/ButtonGroup'
import ButtonIcon from '../views/components/ButtonIcon'
import Card from '../views/components/Card'
import Carousel from '../views/components/Carousel'
import Chat from '../views/components/Chat'
import Checkbox from '../views/components/Checkbox'
import CheckboxButton from '../views/components/CheckboxButton'
import CheckboxButtonGroup from '../views/components/CheckboxButtonGroup'
import CheckboxGroup from '../views/components/CheckboxGroup'
import CheckboxToggle from '../views/components/CheckboxToggle'
import CodeBlock from '../views/components/CodeBlock'
import ColorPicker from '../views/components/ColorPicker'
import Combobox from '../views/components/Combobox'
import Counter from '../views/components/Counter'
import DataTable from '../views/components/DataTable'
import DatePicker from '../views/components/DatePicker'
import DatetimePicker from '../views/components/DatetimePicker'
import DockedComposer from '../views/components/DockedComposer'
import DockedFormFooter from '../views/components/DockedFormFooter'
import DockedUtilityBar from '../views/components/DockedUtilityBar'
import DropZone from '../views/components/DropZone'
import DuelingPicklist from '../views/components/DuelingPicklist'
import DynamicIcon from '../views/components/DynamicIcon'
import DynamicMenu from '../views/components/DynamicMenu'
import ExpandableSection from '../views/components/ExpandableSection'
import Expression from '../views/components/Expression'
import Feed from '../views/components/Feed'
import File from '../views/components/File'
import FileSelector from '../views/components/FileSelector'
import GlobalHeader from '../views/components/GlobalHeader'
import GlobalNavigation from '../views/components/GlobalNavigation'
import Home from '../views/Home.vue'
import Icon from '../views/components/Icon'
import Illustration from '../views/components/Illustration'
import Input from '../views/components/Input'
import ListBuilder from '../views/components/ListBuilder'
import Lookup from '../views/components/Lookup'
import Map from '../views/components/Map'
import Menu from '../views/components/Menu'
import Modal from '../views/components/Modal'
import MultiPicklist from '../views/components/MultiPicklist'
import Notifications from '../views/components/Notifications'
import PageHeader from '../views/components/PageHeader'
import Panel from '../views/components/Panel'
import Path from '../views/components/Path'
import Picklist from '../views/components/Picklist'
import Pill from '../views/components/Pill'
import Popover from '../views/components/Popover'
import ProgressBar from '../views/components/ProgressBar'
import ProgressIndicator from '../views/components/ProgressIndicator'
import ProgressRing from '../views/components/ProgressRing'
import Prompt from '../views/components/Prompt'
import Publisher from '../views/components/Publisher'
import RadioButtonGroup from '../views/components/RadioButtonGroup'
import RadioGroup from '../views/components/RadioGroup'
import RichTextEditor from '../views/components/RichTextEditor'
import ScopedNotification from '../views/components/ScopedNotification'
import ScopedTabs from '../views/components/ScopedTabs'
import SetupAssistant from '../views/components/SetupAssistant'
import Slider from '../views/components/Slider'
import Spinner from '../views/components/Spinner'
import SplitView from '../views/components/SplitView'
import SummaryDetail from '../views/components/SummaryDetail'
import Tabs from '../views/components/Tabs'
import TextArea from '../views/components/TextArea'
import Tile from '../views/components/Tile'
import TimePicker from '../views/components/TimePicker'
import Toasts from '../views/components/Toasts'
import Tooltip from '../views/components/Tooltip'
import Tree from '../views/components/Tree'
import TreeGrid from '../views/components/TreeGrid'
import TrialBar from '../views/components/TrialBar'
import VerticalNavigation from '../views/components/VerticalNavigation'
import VerticalTabs from '../views/components/VerticalTabs'
import VisualPicker from '../views/components/VisualPicker'
import WelcomeMat from '../views/components/WelcomeMat'
import WideRadioGroup from '@/views/components/WideRadioGroup'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Accordion',
    name: 'Accordion',
    component: Accordion
  },
  {
    path: '/ActivityTimeline',
    name: 'ActivityTimeline',
    component: ActivityTimeline
  },
  {
    path: '/Alert',
    name: 'Alert',
    component: Alert
  },
  {
    path: '/AppLauncher',
    name: 'AppLauncher',
    component: AppLauncher
  },
  {
    path: '/Avatar',
    name: 'Avatar',
    component: Avatar
  },
  {
    path: '/AvatarGroup',
    name: 'AvatarGroup',
    component: AvatarGroup
  },
  {
    path: '/Badge',
    name: 'Badge',
    component: Badge
  },
  {
    path: '/BrandBand',
    name: 'BrandBand',
    component: BrandBand
  },
  {
    path: '/Breadcrumbs',
    name: 'Breadcrumbs',
    component: Breadcrumbs
  },
  {
    path: '/BuilderHeader',
    name: 'BuilderHeader',
    component: BuilderHeader
  },
  {
    path: '/Button',
    name: 'Button',
    component: Button
  },
  {
    path: '/ButtonGroup',
    name: 'ButtonGroup',
    component: ButtonGroup
  },
  {
    path: '/ButtonIcon',
    name: 'ButtonIcon',
    component: ButtonIcon
  },
  {
    path: '/Card',
    name: 'Card',
    component: Card
  },
  {
    path: '/Carousel',
    name: 'Carousel',
    component: Carousel
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/CheckboxButton',
    name: 'CheckboxButton',
    component: CheckboxButton
  },
  {
    path: '/CheckboxButtonGroup',
    name: 'CheckboxButtonGroup',
    component: CheckboxButtonGroup
  },
  {
    path: '/Checkbox',
    name: 'Checkbox',
    component: Checkbox
  },
  {
    path: '/CheckboxGroup',
    name: 'CheckboxGroup',
    component: CheckboxGroup
  },
  {
    path: '/CheckboxToggle',
    name: 'CheckboxToggle',
    component: CheckboxToggle
  },
  {
    path: '/CodeBlock',
    name: 'CodeBlock',
    component: CodeBlock
  },
  {
    path: '/ColorPicker',
    name: 'ColorPicker',
    component: ColorPicker
  },
  {
    path: '/Combobox',
    name: 'Combobox',
    component: Combobox
  },
  {
    path: '/Counter',
    name: 'Counter',
    component: Counter
  },
  {
    path: '/DataTable',
    name: 'DataTable',
    component: DataTable
  },
  {
    path: '/DatePicker',
    name: 'DatePicker',
    component: DatePicker
  },
  {
    path: '/DatetimePicker',
    name: 'DatetimePicker',
    component: DatetimePicker
  },
  {
    path: '/DockedComposer',
    name: 'DockedComposer',
    component: DockedComposer
  },
  {
    path: '/DockedFormFooter',
    name: 'DockedFormFooter',
    component: DockedFormFooter
  },
  {
    path: '/DockedUtilityBar',
    name: 'DockedUtilityBar',
    component: DockedUtilityBar
  },
  {
    path: '/DropZone',
    name: 'DropZone',
    component: DropZone
  },
  {
    path: '/DuelingPicklist',
    name: 'DuelingPicklist',
    component: DuelingPicklist
  },
  {
    path: '/DynamicIcon',
    name: 'DynamicIcon',
    component: DynamicIcon
  },
  {
    path: '/DynamicMenu',
    name: 'DynamicMenu',
    component: DynamicMenu
  },
  {
    path: '/ExpandableSection',
    name: 'ExpandableSection',
    component: ExpandableSection
  },
  {
    path: '/Expression',
    name: 'Expression',
    component: Expression
  },
  {
    path: '/Feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/File',
    name: 'File',
    component: File
  },
  {
    path: '/FileSelector',
    name: 'FileSelector',
    component: FileSelector
  },
  {
    path: '/GlobalHeader',
    name: 'GlobalHeader',
    component: GlobalHeader
  },
  {
    path: '/GlobalNavigation',
    name: 'GlobalNavigation',
    component: GlobalNavigation
  },
  {
    path: '/Icon',
    name: 'Icon',
    component: Icon
  },
  {
    path: '/Illustration',
    name: 'Illustration',
    component: Illustration
  },
  {
    path: '/Input',
    name: 'Input',
    component: Input
  },
  {
    path: '/ListBuilder',
    name: 'ListBuilder',
    component: ListBuilder
  },
  {
    path: '/Lookup',
    name: 'Lookup',
    component: Lookup
  },
  {
    path: '/Map',
    name: 'Map',
    component: Map
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/Modal',
    name: 'Modal',
    component: Modal
  },
  {
    path: '/MultiPicklist',
    name: 'MultiPicklist',
    component: MultiPicklist
  },
  {
    path: '/Notifications',
    name: 'Notifications',
    component: Notifications
  },
  {
    path: '/PageHeader',
    name: 'PageHeader',
    component: PageHeader
  },
  {
    path: '/Panel',
    name: 'Panel',
    component: Panel
  },
  {
    path: '/Path',
    name: 'Path',
    component: Path
  },
  {
    path: '/Picklist',
    name: 'Picklist',
    component: Picklist
  },
  {
    path: '/Pill',
    name: 'Pill',
    component: Pill
  },
  {
    path: '/Popover',
    name: 'Popover',
    component: Popover
  },
  {
    path: '/ProgressBar',
    name: 'ProgressBar',
    component: ProgressBar
  },
  {
    path: '/ProgressIndicator',
    name: 'ProgressIndicator',
    component: ProgressIndicator
  },
  {
    path: '/ProgressRing',
    name: 'ProgressRing',
    component: ProgressRing
  },
  {
    path: '/Prompt',
    name: 'Prompt',
    component: Prompt
  },
  {
    path: '/Publisher',
    name: 'Publisher',
    component: Publisher
  },
  {
    path: '/RadioButtonGroup',
    name: 'RadioButtonGroup',
    component: RadioButtonGroup
  },
  {
    path: '/RadioGroup',
    name: 'RadioGroup',
    component: RadioGroup
  },
  {
    path: '/RichTextEditor',
    name: 'RichTextEditor',
    component: RichTextEditor
  },
  {
    path: '/ScopedNotification',
    name: 'ScopedNotification',
    component: ScopedNotification
  },
  {
    path: '/ScopedTabs',
    name: 'ScopedTabs',
    component: ScopedTabs
  },
  {
    path: '/SetupAssistant',
    name: 'SetupAssistant',
    component: SetupAssistant
  },
  {
    path: '/Slider',
    name: 'Slider',
    component: Slider
  },
  {
    path: '/Spinner',
    name: 'Spinner',
    component: Spinner
  },
  {
    path: '/SplitView',
    name: 'SplitView',
    component: SplitView
  },
  {
    path: '/SummaryDetail',
    name: 'SummaryDetail',
    component: SummaryDetail
  },
  {
    path: '/Tabs',
    name: 'Tabs',
    component: Tabs
  },
  {
    path: '/TextArea',
    name: 'TextArea',
    component: TextArea
  },
  {
    path: '/Tile',
    name: 'Tile',
    component: Tile
  },
  {
    path: '/TimePicker',
    name: 'TimePicker',
    component: TimePicker
  },
  {
    path: '/Toasts',
    name: 'Toasts',
    component: Toasts
  },
  {
    path: '/Tooltip',
    name: 'Tooltip',
    component: Tooltip
  },
  {
    path: '/Tree',
    name: 'Tree',
    component: Tree
  },
  {
    path: '/TreeGrid',
    name: 'TreeGrid',
    component: TreeGrid
  },
  {
    path: '/TrialBar',
    name: 'TrialBar',
    component: TrialBar
  },
  {
    path: '/VerticalNavigation',
    name: 'VerticalNavigation',
    component: VerticalNavigation
  },
  {
    path: '/VerticalTabs',
    name: 'VerticalTabs',
    component: VerticalTabs
  },
  {
    path: '/VisualPicker',
    name: 'VisualPicker',
    component: VisualPicker
  },
  {
    path: '/WelcomeMat',
    name: 'WelcomeMat',
    component: WelcomeMat
  },
  {
    path: '/WideRadioGroup',
    name: 'WideRadioGroup',
    component: WideRadioGroup
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
