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
    loading: false,
    alertMessage: useAlertMessageStore(),
  }),
  actions: {
    async login(username, password) {
      let error = null;
      const user = await Api.login(username, password).catch((err) => {
        error = err;
      });

      if (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.alertMessage.show({
            message: error.response.data.message,
            type: error.response.data.type,
          });
        } else {
          // default
          this.alertMessage.show({ message: error.message, type: "error" });
        }
        return;
      }

      if (!user || !user._id) {
        console.log("Not User found: ", user);
        return false;
      }

      this.setUser(user);

      router.push(this.returnUrl || "/dashboard");

      this.alertMessage.show({ message: "Welcome Back", type: "success" });
    },

    /**
     * Create a new user with the information
     * @param {{username: String, password: String, email: String}} newUser
     */
    async signIn(newUser) {
      this.loading = true;

      const userResponse = await Api.post("/signin", newUser).catch((err) => {
        let errMessage = err.message;
        let errType = "error";

        if (err.response && err.response.data && err.response.data.message) {
          errMessage = err.response.data.message;
          errType = err.response.data.type;
        }

        this.alertMessage.show({ message: errMessage, type: errType });
      });
      this.loading = false;

      this.login(userResponse.user.username, userResponse.user.password);
    },

    setUser(user, showAlert = false) {
      // Avoind possible errors for the future
      // check if we received a user, but there is not access token since the user was updated
      if (user && !user.accessToken && this.user.accessToken) {
        user["accessToken"] = this.user.accessToken;
      }

      if (showAlert) {
        this.alertMessage.show({
          message: "User information updated!",
          type: "success",
        });
      }

      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
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
