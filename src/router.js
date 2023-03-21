import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        exact: true,
        component: () => import('./components/HelloWorld.vue'),
        meta: {
            breadcrumb: [{ label: 'Dashboard' }],
        }
    },
    {
        path: '/formlayout',
        name: 'formlayout',
        component: () => import('./components/FormLayoutDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Form Layout' }],
        },
    },
    {
        path: '/input',
        name: 'input',
        component: () => import('./components/InputDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Input' }],
        },
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