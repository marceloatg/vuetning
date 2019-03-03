import Vue from 'vue'
import Clipboard from 'v-clipboard'

// Using imports
Vue.use(Clipboard);

// Import lightning components
import SldsAlert from './components/Alert/Index'
import SldsAvatar from './components/Avatar/Index'
import SldsBadge from './components/Badge/Index'
import SldsBrandBand from './components/BrandBand/Index'
import SldsButton from './components/Button/Index'
import SldsButtonIcon from './components/ButtonIcon/Index'
import SldsCheckbox from './components/Checkbox/Index'
import SldsCombobox from './components/Combobox/Index'
import SldsDataTable from './components/DataTable/Index';
import SldsDockedComposer from './components/DockedComposer/Index';
import SldsGlobalHeader from './components/GlobalHeader/Index'
import SldsGlobalNavigation from './components/GlobalNavigation/Index'
import SldsIcon from './components/Icon/Index'
import SldsIllustration from './components/Illustration/Index'
import SldsInput from './components/Input/Index'
import SldsMenu from './components/Menu/Index'
import SldsModal from './components/Modal/Index'
import SldsNotification from './components/Notification/Index'
import SldsPagination from './components/Pagination/Index'
import SldsPicklist from './components/Picklist/Index'
import SldsPill from './components/Pill/Index'
import SldsExpandableSection from './components/ExpandableSection/Index'
import SldsSpinner from './components/Spinner/Index'
import SldsSvg from './shared/Svg'
import SldsTrialBar from './components/TrialBar/Index'

// Registering lightning components
Vue.component('slds-alert', SldsAlert);
Vue.component('slds-avatar', SldsAvatar);
Vue.component('slds-brand-band', SldsBrandBand);
Vue.component('slds-badge', SldsBadge);
Vue.component('slds-button', SldsButton);
Vue.component('slds-button-icon', SldsButtonIcon);
Vue.component('slds-checkbox', SldsCheckbox);
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
Vue.component('slds-picklist', SldsPicklist);
Vue.component('slds-pill', SldsPill);
Vue.component('slds-expandable-section', SldsExpandableSection);
Vue.component('slds-spinner', SldsSpinner);
Vue.component('slds-svg', SldsSvg);
Vue.component('slds-trial-bar', SldsTrialBar);
