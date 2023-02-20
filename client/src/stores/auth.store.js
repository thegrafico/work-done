import { defineStore } from "pinia";
import router from "@/router/index";
import Api from "../api/api";
import { useAlertMessageStore } from "./alert.message.store";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      let error = null;
      const user = await Api.login(username, password).catch((err) => {
        error = err;
      });
      console.log("Error is: ", error);

      if (error) {
        const alertMessage = useAlertMessageStore();

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alertMessage.show({
            message: error.response.data.message,
            type: error.response.data.type,
          });
        } else {
          // default
          alertMessage.show({ message: error.message, type: "error" });
        }
        return;
      }

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

    getUserId(state) {
      return state.user._id.toString();
    },

    userToken(state) {
      if (!this.getUser) {
        return null;
      }
      return state.user.accessToken;
    },
  },
});
