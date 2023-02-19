import { defineStore } from "pinia";
import secureApi from "@/api/authApi";
import { useAlertMessageStore } from "./alert.message.store";
import { alertTypes } from "@/utils/Constants";
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

    alertMessageStore: useAlertMessageStore(),
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

    async removeNotification(notificationId, notificationType) {
      if (!notificationId) {
        console.error(
          "Cannot get the notification information: ",
          notificationId
        );
        return;
      }

      let error = null;
      const notificationResponse = await secureApi
        .post("/notifications/delete", {
          id: notificationId,
          type: notificationType,
        })
        .catch((err) => {
          error = err;
        });

      if (error || !notificationResponse || !notificationResponse.data) {
        this.alertMessageStore.show({
          type: alertTypes.error,
          message: error.message || "Oops. Error deleting the notification",
        });
        return;
      }

      const wasDeleted = notificationResponse.data.deleted;

      if (wasDeleted) {
        this.notifications = this.notifications.filter(
          (notification) =>
            notification._id.toString() !== notificationId.toString()
        );
        console.log("Notification was deleted: ", notificationId);
      }
    },
  },
  getters: {},
});
