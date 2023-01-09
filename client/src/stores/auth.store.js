import { defineStore } from 'pinia';
import router from '@/router/index';
import Api from "../api/api";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: localStorage.getItem('user'),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            const user = await Api.login(username, password);

            this.user = user;
            
            localStorage.setItem('user', JSON.stringify(user));

            router.push(this.returnUrl || '/');
        },

        logout() { 
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});