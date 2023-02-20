import { defineStore } from "pinia";
// import { useProjectsStore } from "@/stores/projects.store";
// import router from "@/router/index";
// import secureApi from "@/api/authApi";

/**
 * Holds information to show the alert popput to the user
 */
export const useAlertMessageStore = defineStore("alertMessage", {
  state: () => ({
    /** @type {boolean} */
    showAlert: false,

    /** @type {string} */
    type: "warning",

    /** @type {string} */
    message: "",

    showTime: 4000, // show alert for only 4 seconds
  }),
  actions: {
    /**
     *
     * @param {AlertMessage} alert - alert
     */
    show(alert) {
      this.type = alert.type;
      this.message = alert.message;
      this.showAlert = true;
      // hide notification after showing it up.
      this.hideAfterShowTime();
    },

    /**
     *
     * @param {Number} newTime - in seconds
     */
    setShowTime(newTime) {
      this.showTime = newTime * 1000;
    },

    hideAfterShowTime() {
      const that = this;
      setTimeout(() => {
        that.hide();
      }, that.showTime);
    },

    hide() {
      this.showAlert = false;
    },
  },
});
