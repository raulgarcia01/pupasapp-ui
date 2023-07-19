import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        exact: true,
        component: () => import('./components/companies/Dashboard.vue'),
        meta: {
            breadcrumb: [{ parent: 'Company', label: 'Dashboard' }],
        }
    },
    {
        path: '/companyProfile',
        name: 'companyProfile',
        exact: true,
        component: () => import('./components/companies/CompanyProfile.vue'),
        meta: {
            breadcrumb: [{ parent: 'Company', label: 'Company Profile' }],
        }
    },
    {
        path: '/companyCampaign',
        name: 'companyCampaign',
        exact: true,
        component: () => import('./components/companies/SocialCampaign.vue'),
        meta: {
            breadcrumb: [{ parent: 'Company', label: 'Social Campaign' }],
        }
    },
    {
        path: '/qrGenerator',
        name: 'qrGenerator',
        component: () => import('./components/companies/QRClientReferral.vue'),
        meta: {
            breadcrumb: [{ parent: 'Company', label: 'QR Generator' }],
        },
    },
    {
        path: '/companyWizard',
        name: 'companyWizard',
        component: () => import('./components/companies/CompanyWizard.vue'),
        meta: {
            breadcrumb: [{ parent: 'Company', label: 'Wizard' }],
        },
    },
    {
        path: '/clientCatalog',
        name: 'clientCatalog',
        exact: true,
        component: () => import('./components/clients/ClientCatalog.vue'),
        meta: {
            breadcrumb: [{ parent: 'Client', label: 'Client Catalog' }],
        }
    },
    {
        path: '/clientHistOrders',
        name: 'clientHistOrders',
        exact: true,
        component: () => import('./components/clients/ClientHistOrders.vue'),
        meta: {
            breadcrumb: [{ parent: 'Client', label: 'Hist Orders' }],
        }
    },
    {
        path: '/clientProfile',
        name: 'clientProfile',
        exact: true,
        component: () => import('./components/clients/ClientProfile.vue'),
        meta: {
            breadcrumb: [{ parent: 'Client', label: 'Client Profile' }],
        }
    },
    {
        path: '/clientWizard',
        name: 'clientWizard',
        component: () => import('./components/clients/ClientWizard.vue'),
        meta: {
            breadcrumb: [{ parent: 'Client', label: 'Wizard' }],
        },
    },
    {
        path: '/productCatalog',
        name: 'productCatalog',
        exact: true,
        component: () => import('./components/products/ProductCatalog.vue'),
        meta: {
            breadcrumb: [{ parent: 'Product', label: 'Product Catalog' }],
        }
    },
    {
        path: '/providerCatalog',
        name: 'providerCatalog',
        exact: true,
        component: () => import('./components/providers/ProviderCatalog.vue'),
        meta: {
            breadcrumb: [{ parent: 'Provider', label: 'Provider Catalog' }],
        }
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('./pages/Help.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Help' }],
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('./pages/Landing.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    },
    {
        path: '/graph',
        name: 'graph',
        component: () => import('./pages/ConsumptionGraph.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior () {
        return { left: 0, top: 0 };
    }
});

export default router;