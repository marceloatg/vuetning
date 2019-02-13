import Vue from 'vue'

// Import lightning components
import SldsAlert from './components/Alert'
import SldsAvatar from './components/Avatar'
import SldsBadge from './components/Badge'
import SldsButton from './components/Button'
import SldsButtonIcon from './components/ButtonIcon'
import SldsCombobox from './components/Combobox'
import SldsDataTable from "./components/DataTable";
import SldsGlobalHeader from './components/GlobalHeader'
import SldsIcon from './components/Icon'
import SldsIllustration from './components/Illustration'
import SldsMenu from './components/Menu'
import SldsPicklist from './components/Picklist/Index'
import SldsPill from './components/Pill/Index'
import SldsSection from './components/ExpandableSection'
import SldsSpinner from './components/Spinner'
import SldsSvg from './components/SVG'
import SldsTrialBar from './components/TrialBar'

// Registering lightning components
const Components = {
    SldsAlert,
    SldsAvatar,
    SldsBadge,
    SldsButton,
    SldsButtonIcon,
    SldsCombobox,
    SldsDataTable,
    SldsGlobalHeader,
    SldsIcon,
    SldsIllustration,
    SldsMenu,
    SldsPicklist,
    SldsPill,
    SldsSection,
    SldsSpinner,
    SldsSvg,
    SldsTrialBar,
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components;