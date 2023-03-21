import { createApp, provide, h } from 'vue';
import router from './router';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import BadgeDirective from 'primevue/badgedirective';
import Button from 'primevue/button';
import ColorPicker from 'primevue/colorpicker';
import Column from 'primevue/column';
import ConfirmationService from 'primevue/confirmationservice';
import Dropdown from 'primevue/dropdown';
import Fieldset from 'primevue/fieldset';
import InlineMessage from 'primevue/inlinemessage';
import Inplace from 'primevue/inplace';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Knob from 'primevue/knob';
import Listbox from 'primevue/listbox';
import MegaMenu from 'primevue/megamenu';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import OrderList from 'primevue/orderlist';
import OrganizationChart from 'primevue/organizationchart';
import OverlayPanel from 'primevue/overlaypanel';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import PanelMenu from 'primevue/panelmenu';
import Ripple from 'primevue/ripple';
import SelectButton from 'primevue/selectbutton';
import ScrollPanel from 'primevue/scrollpanel'
import ScrollTop from 'primevue/scrolltop';
import Slider from 'primevue/slider';
import Sidebar from 'primevue/sidebar';
import Skeleton from 'primevue/skeleton';
import SpeedDial from 'primevue/speeddial';
import SplitButton from 'primevue/splitbutton';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import StyleClass from 'primevue/styleclass';
import Textarea from 'primevue/textarea';
import Tooltip from 'primevue/tooltip';

import CodeHighlight from './AppCodeHighlight';

import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css'
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';

import Access from './pages/Access';
import Error from './pages/Error';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import * as Realm from "realm-web"
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const id = "pupas-backdev-gugas";
const config = {
  id,
};

const appRealm = new Realm.App(config);

const httpLink = createHttpLink({
  uri: 'https://eastus2.azure.realm.mongodb.com/api/client/v2.0/app/pupas-backdev-gugas/graphql',
  fetch: async (uri, options) => {
    const accessToken = await getValidAccessToken();
    options.headers.Authorization = `Bearer ${accessToken}`;
    return fetch(uri, options);
  },
})

async function getValidAccessToken() {
  if (!appRealm.currentUser) {
    await appRealm.logIn(Realm.Credentials.apiKey(process.env.ATLAS_API_KEY));
  } else {
    await appRealm.currentUser.refreshCustomData();
  }
  return appRealm.currentUser.accessToken;
}

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
});

const app = createApp({
	setup () {
		provide(DefaultApolloClient, apolloClient)
	},
    computed: {
        ViewComponent () {
			switch (this.$route.path) {
				case '/login':
					return Login;
				case '/error':
					return Error;
				case '/access':
					return Access;
				case '/notfound':
					return NotFound;
				default:
					return App;
			}
		}
    },
    render () { return h(this.ViewComponent) }
});

app.use(PrimeVue, { ripple: true });
app.use(ConfirmationService);
app.use(router);

app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('code', CodeHighlight);
app.directive('badge', BadgeDirective);
app.directive('styleclass', StyleClass);

app.component('Button', Button);
app.component('ColorPicker', ColorPicker);
app.component('Column', Column);
app.component('Dropdown', Dropdown);
app.component('Fieldset', Fieldset);
app.component('InlineMessage', InlineMessage);
app.component('Inplace', Inplace);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('Knob', Knob);
app.component('Listbox', Listbox);
app.component('MegaMenu', MegaMenu);
app.component('Menu', Menu);
app.component('Menubar', Menubar);
app.component('Message', Message);
app.component('MultiSelect', MultiSelect);
app.component('OrderList', OrderList);
app.component('OrganizationChart', OrganizationChart);
app.component('OverlayPanel', OverlayPanel);
app.component('Paginator', Paginator);
app.component('Panel', Panel);
app.component('PanelMenu', PanelMenu);
app.component('SelectButton', SelectButton);
app.component('ScrollPanel', ScrollPanel);
app.component('ScrollTop', ScrollTop);
app.component('Slider', Slider);
app.component('Sidebar', Sidebar);
app.component('Skeleton', Skeleton);
app.component('SpeedDial', SpeedDial);
app.component('SplitButton', SplitButton);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('Textarea', Textarea);


app.mount('#app');