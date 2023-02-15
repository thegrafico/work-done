import { defineStore } from "pinia";
// import secureApi from "@/api/authApi";

/**
 * Holds information about the user notification such as messages and project invitations.
 */
export const useUserNotificationStore = defineStore("userNotifications", {
  state: () => ({
    /** @type {Array<Notification>} */
    notifications: [],

    /** @type {Boolean} */
    loading: false,
  }),
  actions: {
    /**
     * @param {{_id: String, users: [], ...}} projectId - id of the current project
     */
    async loadNotifications() {
      this.notifications = [];
      this.loading = true;
    },
  },
  getters: {},
});
