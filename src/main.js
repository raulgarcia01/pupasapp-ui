import { createApp, provide, h } from 'vue';
import router from './router';
import App from './App.vue';
import PrimeVue from 'primevue/config';

import ConfirmationService from 'primevue/confirmationservice';
import Ripple from 'primevue/ripple';

//-- Prime VUE 3 components used
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toolbar from 'primevue/toolbar';

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

app.directive('ripple', Ripple)


app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Toolbar', Toolbar);

app.mount('#app');