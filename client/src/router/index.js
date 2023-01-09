import { useAuthStore } from '@/stores/auth.store';
import { createRouter, createWebHashHistory } from 'vue-router'

import AuthView from '../views/AuthView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: AuthView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to) => {
  const publicPages = ["/login"];

  // All routes but login
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  // check page user is visiting and if the user is logged in
  if (authRequired && !auth.user){
    auth.returnUrl = to.fullPath;
    return '/login';
  }

  // setTimeout( () => {auth.logout()}, 5000);
})

export default router;
