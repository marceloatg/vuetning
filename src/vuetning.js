import Vue from 'vue'
import Clipboard from 'v-clipboard'
import {RecycleScroller} from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

// Import lightning components
import SldsAlert from './components/slds-alert'
import SldsAvatar from './components/slds-avatar'
import SldsBadge from './components/slds-badge'
import SldsBrandBand from './components/slds-brand-band'
import SldsBreadcrumb from './components/slds-breadcrumb'
import SldsButton from './components/slds-button'
import SldsButtonIcon from './components/slds-button-icon'
import SldsCheckbox from './components/slds-checkbox'
import SldsCheckboxButton from './components/slds-checkbox-button'
import SldsCheckboxButtonGroup from './components/slds-checkbox-button-group'
import SldsCheckboxToggle from './components/slds-checkbox-toggle'
import SldsCombobox from './components/slds-combobox'
import SldsDataTable from './components/slds-data-table';
import SldsDockedComposer from './components/slds-docked-composer';
import SldsGlobalHeader from './components/slds-global-header'
import SldsGlobalNavigation from './components/slds-global-navigation'
import SldsIcon from './components/slds-icon'
import SldsIllustration from './components/slds-illustration'
import SldsInput from './components/slds-input'
import SldsLookup from './components/slds-lookup'
import SldsMenu from './components/slds-menu'
import SldsModal from './components/slds-modal'
import SldsNotification from './components/slds-notification'
import SldsPagination from './components/slds-pagination'
import SldsPill from './components/slds-pill'
import SldsPopover from './components/slds-popover'
import SldsProgressBar from './components/slds-progress-bar'
import SldsExpandableSection from './components/slds-expandable-section'
import SldsSpinner from './components/slds-spinner'
import SldsSvg from './shared/svg'
import SldsTextArea from './components/slds-text-area'
import SldsToast from './components/slds-toast'
import SldsTooltip from './components/slds-tooltip'
import SldsTrialBar from './components/slds-trial-bar'
import SldsVerticalNavigation from './components/slds-vertical-navigation'
import SldsVirtualTable from './components/slds-virtual-table'
import SldsWideRadioGroup from './components/slds-wide-radio-group'

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
Vue.component('slds-checkbox-button-group', SldsCheckboxButtonGroup);
Vue.component('slds-checkbox-toggle', SldsCheckboxToggle);
Vue.component('slds-combobox', SldsCombobox);
Vue.component('slds-data-table', SldsDataTable);
Vue.component('slds-docked-composer', SldsDockedComposer);
Vue.component('slds-global-header', SldsGlobalHeader);
Vue.component('slds-global-navigation', SldsGlobalNavigation);
Vue.component('slds-icon', SldsIcon);
Vue.component('slds-illustration', SldsIllustration);
Vue.component('slds-input', SldsInput);
Vue.component('slds-lookup', SldsLookup);
Vue.component('slds-menu', SldsMenu);
Vue.component('slds-modal', SldsModal);
Vue.component('slds-notification', SldsNotification);
Vue.component('slds-pagination', SldsPagination);
Vue.component('slds-pill', SldsPill);
Vue.component('slds-popover', SldsPopover);
Vue.component('slds-progress-bar', SldsProgressBar);
Vue.component('slds-expandable-section', SldsExpandableSection);
Vue.component('slds-spinner', SldsSpinner);
Vue.component('slds-svg', SldsSvg);
Vue.component('slds-text-area', SldsTextArea);
Vue.component('slds-toast', SldsToast);
Vue.component('slds-tooltip', SldsTooltip);
Vue.component('slds-trial-bar', SldsTrialBar);
Vue.component('slds-vertical-navigation', SldsVerticalNavigation);
Vue.component('slds-virtual-table', SldsVirtualTable);
Vue.component('slds-wide-radio-group', SldsWideRadioGroup);
