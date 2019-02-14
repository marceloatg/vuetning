import Vue from 'vue'

// Import lightning components
import SldsAlert from './components/Alert/Index'
import SldsAvatar from './components/Avatar/Index'
import SldsBadge from './components/Badge/Index'
import SldsButton from './components/Button/Index'
import SldsButtonIcon from './components/ButtonIcon/Index'
import SldsCombobox from './components/Combobox/Index'
import SldsDataTable from "./components/DataTable/Index";
import SldsGlobalHeader from './components/GlobalHeader/Index'
import SldsIcon from './components/Icon/Index'
import SldsIllustration from './components/Illustration/Index'
import SldsMenu from './components/Menu/Index'
import SldsPicklist from './components/Picklist/Index'
import SldsPill from './components/Pill/Index'
import SldsSection from './components/ExpandableSection/Index'
import SldsSpinner from './components/Spinner/Index'
import SldsSvg from './shared/Svg'
import SldsTrialBar from './components/TrialBar/Index'

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