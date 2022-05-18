import { createRouter, createWebHistory } from "vue-router";
import MainPage from '~/pages/MainPage';
import ResultPage from '~/pages/ResultPage';
import NotFound from '~/pages/NotFound';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainPage
        },
        {
            path: '/result/:keyword',
            component: ResultPage
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound
        }
    ]
})
