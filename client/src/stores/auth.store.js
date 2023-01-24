import { defineStore } from "pinia";
import router from "@/router/index";
import Api from "../api/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      const user = await Api.login(username, password);
      if (!user || !user._id) {
        return false;
      }

      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));

      router.push(this.returnUrl || "/dashboard");
    },

    logout() {
      this.clearUser();
      router.push("/login");
    },

    clearUser() {
      this.user = null;
      localStorage.removeItem("user");
    },

    redirectToHome() {
      router.push("/dashboard");
    },
  },
  getters: {
    getUser(state) {
      if (state.user && state.user.accessToken) {
        return state.user;
      }

      return null;
    },

    userToken(state) {
      if (!this.getUser) {
        return null;
      }
      return state.user.accessToken;
    },
  },
});
