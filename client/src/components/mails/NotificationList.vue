<template>
  <v-list lines="two" v-if="props.notifications && props.notifications.length > 0">
    <v-list-subheader inset>Project Invitations</v-list-subheader>

    <v-list-item v-for="notification in props.notifications" :key="notification._id" :title="notification.message"
      :subtitle="notification.createdAt">
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          {{ notification.message.slice(0, 2).toUpperCase() }}
        </v-avatar>
      </template>

      <template v-slot:append>

        <ButtonConfirmationPopup :button-config="AcceptConfirmationButton" :id="notification._id"
          :type="notification.type" @on-submit="confirmAccept" />

        <ButtonConfirmationPopup :button-config="deleteConfirmationButton" :id="notification._id"
          :type="notification.type" @on-submit="confirmDelete" />

      </template>
    </v-list-item>
  </v-list>

  <v-row v-else>
    <v-divider></v-divider>
    <v-col align="center">
      <p class="font-weight-bold pa-2 text-h5">
        It looks you don't have any notifications so far.
      </p>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps } from 'vue';
import { useUserNotificationStore } from '@/stores/user.notification.store';
import ButtonConfirmationPopup from '@/components/confirmation/ConfirmationPopup.vue';

// define props
const props = defineProps({
  notifications: Array,
});

// get store functions
const { removeNotification, acceptNotification } = useUserNotificationStore();

const AcceptConfirmationButton = {
  color: 'success',
  variant: 'text',
  icon: 'mdi-check-circle',
}
const deleteConfirmationButton = {
  color: 'error',
  variant: 'text',
  icon: 'mdi-trash-can',
}

/**
 * 
 * @param {Object} data 
 * @param {Function} onClose 
 */
const confirmAccept = async (data, onClose) => {

  // const notification = props.notifications.find(notification => notification._id.toString() === notificationId.toString())
  await acceptNotification(data.id, data.type);

  // close popup
  onClose();
}

/**
 * 
 * @param {Object} data - data sent to the confirmation popup
 * @param {Function} onClose - function to close the popup after finishing the action
 */
const confirmDelete = async (data, onClose) => {
  // const notification = props.notifications.find(notification => notification._id.toString() === notificationId.toString())
  await removeNotification(data.id, data.type);

  // close popup
  onClose();
}

</script>
