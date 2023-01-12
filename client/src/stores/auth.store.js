import { defineStore } from 'pinia';
import router from '@/router/index';
import Api from "../api/api";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null,
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            const user = await Api.login(username, password);

            this.user = user;

            localStorage.setItem('user', JSON.stringify(user));

            router.push(this.returnUrl || '/dashboard');
        },

        logout() {
            this.clearUser();
            router.push('/login');
        },

        clearUser() {
            this.user = null;
            localStorage.removeItem("user");
        },

        redirectToHome() {
            router.push("/dashboard");
        },

        getUser() {
            if (this.user && this.user.accessToken) {
                return this.user
            }

            return null;
        },

        getToken() {
            if (!this.user || !this.user.accessToken) {
                return null
            }
            return this.user.accessToken;
        }

    },
});