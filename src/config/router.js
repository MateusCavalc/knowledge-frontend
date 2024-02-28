import {
    createRouter
    , createWebHistory
} from 'vue-router'

import Home from '../components/home/mfcHome.vue'
import AdminPages from '../components/admin/AdminPages.vue'
import ArticlesByCategory from '../components/article/ArticlesByCategory.vue'
import ArticleById from '../components/article/ArticleById.vue'
import UserAuth from '../components/auth/UserAuth'

const userKey = process.env.VUE_APP_USER_LOCAL_STORAGE;

const routes = [{
    name: 'auth',
    path: '/auth',
    component: UserAuth

}, {
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    // meta para passar informacoes para algum processamento na rota
    meta: { requiresAdmin: true }

}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory

}, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById

}]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// aplicando um "middleware" para navegacao na rota
router.beforeEach((to, from, next) => {
    // verifica se a rota contem requiresAdmin = true
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const localUser = JSON.parse(json)
        // se for admin, continua a navegacao
        localUser && localUser.admin ? next() : next({ path: '/' })
    } else {
        next()
    }

})

export default router