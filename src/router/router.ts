import {createRouter, createWebHistory} from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import MainPage from '../pages/MainPage/MainPage.vue'
import DefaultCalculatorPage from "../pages/DefaultCalculator/DefaultCalculatorPage.vue";

const routes = [
    {
        path: '/',
        name: 'main-layout',
        component: MainLayout,
        redirect: { name: 'main-page' },
        children: [
            {
                path: '/',
                name: 'main-page',
                component: MainPage,
            },
            {
                path: '/default-calculator',
                name: 'default-calculator',
                component: DefaultCalculatorPage
            }
        ]
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
