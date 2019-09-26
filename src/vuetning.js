import Vue from 'vue'
import Clipboard from 'v-clipboard'
import {RecycleScroller} from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

// Import lightning components
import SldsAlert from './components/Alert'
import SldsAvatar from './components/Avatar'
import SldsBadge from './components/Badge'
import SldsBrandBand from './components/BrandBand'
import SldsBreadcrumb from './components/Breadcrumb'
import SldsButton from './components/Button'
import SldsButtonIcon from './components/ButtonIcon'
import SldsCheckbox from './components/Checkbox'
import SldsCheckboxButton from './components/CheckboxButton'
import SldsCheckboxToggle from './components/CheckboxToggle'
import SldsCombobox from './components/Combobox'
import SldsDataTable from './components/DataTable';
import SldsDockedComposer from './components/DockedComposer';
import SldsGlobalHeader from './components/GlobalHeader'
import SldsGlobalNavigation from './components/GlobalNavigation'
import SldsIcon from './components/Icon'
import SldsIllustration from './components/Illustration'
import SldsInput from './components/Input'
import SldsMenu from './components/Menu'
import SldsModal from './components/Modal'
import SldsNotification from './components/Notification'
import SldsPagination from './components/Pagination'
import SldsPill from './components/Pill'
import SldsProgressBar from './components/ProgressBar'
import SldsExpandableSection from './components/ExpandableSection'
import SldsSpinner from './components/Spinner'
import SldsSvg from './shared/Svg'
import SldsTextArea from './components/TextArea'
import SldsToast from './components/Toast'
import SldsTrialBar from './components/TrialBar'
import SldsVerticalNavigation from './components/VerticalNavigation'
import SldsVirtualTable from './components/VirtualTable'
import SldsWideRadioGroup from './components/WideRadioGroup'

// Using imports
Vue.use(Clipboard);

// Registering lightning components
Vue.component('RecycleScroller', RecycleScroller);
Vue.component('slds-alert', SldsAlert);
Vue.component('slds-avatar', SldsAvatar);
Vue.component('slds-badge', SldsBadge);
Vue.component('slds-brand-band', SldsBrandBand);
Vue.component('slds-breadcrumb', SldsBreadcrumb);
Vue.component('slds-button', SldsButton);
Vue.component('slds-button-icon', SldsButtonIcon);
Vue.component('slds-checkbox', SldsCheckbox);
Vue.component('slds-checkbox-button', SldsCheckboxButton);
Vue.component('slds-checkbox-toggle', SldsCheckboxToggle);
Vue.component('slds-combobox', SldsCombobox);
Vue.component('slds-data-table', SldsDataTable);
Vue.component('slds-docked-composer', SldsDockedComposer);
Vue.component('slds-global-header', SldsGlobalHeader);
Vue.component('slds-global-navigation', SldsGlobalNavigation);
Vue.component('slds-icon', SldsIcon);
Vue.component('slds-illustration', SldsIllustration);
Vue.component('slds-input', SldsInput);
Vue.component('slds-menu', SldsMenu);
Vue.component('slds-modal', SldsModal);
Vue.component('slds-notification', SldsNotification);
Vue.component('slds-pagination', SldsPagination);
Vue.component('slds-pill', SldsPill);
Vue.component('slds-progress-bar', SldsProgressBar);
Vue.component('slds-expandable-section', SldsExpandableSection);
Vue.component('slds-spinner', SldsSpinner);
Vue.component('slds-svg', SldsSvg);
Vue.component('slds-text-area', SldsTextArea);
Vue.component('slds-toast', SldsToast);
Vue.component('slds-trial-bar', SldsTrialBar);
Vue.component('slds-vertical-navigation', SldsVerticalNavigation);
Vue.component('slds-virtual-table', SldsVirtualTable);
Vue.component('slds-wide-radio-group', SldsWideRadioGroup);
