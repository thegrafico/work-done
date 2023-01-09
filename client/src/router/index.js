import { createRouter, createWebHashHistory } from 'vue-router'

import AuthView from '../components/auth/AuthView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: AuthView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/DashboardView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
