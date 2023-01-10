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
    component: () => import('../views/DashboardView.vue') // lazy load
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
    auth.user = null;
    return '/login';
  }

  // setTimeout( () => {auth.logout()}, 5000);
})

export default router;
