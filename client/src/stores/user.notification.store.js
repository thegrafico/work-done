import { defineStore } from "pinia";
import secureApi from "@/api/authApi";
// import Notification from "@/models/Notification";

/**
 * Holds information about the user notification such as messages and project invitations.
 */
export const useUserNotificationStore = defineStore("userNotifications", {
  state: () => ({
    /** @type {Array<Notification>} */
    notifications: [],

    /** @type {Boolean} */
    loadingNotifications: false,
  }),
  actions: {
    /**
     * Load user notifications
     */
    async loadNotifications() {
      this.notifications = [];
      this.loadingNotifications = true;

      let error = null;
      const notificationsResponse = await secureApi
        .get(`/notifications`)
        .catch((err) => {
          error = err;
        });
      this.loadingNotifications = false;

      if (error || !notificationsResponse || !notificationsResponse.data) {
        // TODO: show notification error
        alert(error.message || "Oops. Error loading the notifications");
        return;
      }

      console.log("NotificationResponse: ", notificationsResponse.data);
      this.notifications = notificationsResponse.data.notifications; //.map(notification => { return new Notification(notification)})
    },
  },
  getters: {},
});
