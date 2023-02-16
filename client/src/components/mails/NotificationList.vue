<template>
  <v-list lines="two">
    <v-list-subheader inset>Project Invitations</v-list-subheader>

    <v-list-item v-for="notification in props.notifications" 
      :key="notification._id" 
      :title="notification.message"
      :subtitle="notification.createdAt"
      :class="{'red-fill': notification.activeAnimation}">
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          {{ notification.message.slice(0, 2).toUpperCase() }}
        </v-avatar>
      </template>

      <template v-slot:append>
        <v-btn color="success" icon="mdi-check-circle" variant="text"
          @click="acceptNotification(notification._id, notification.type)"></v-btn>
        <v-btn color="error" icon="mdi-cancel" variant="text"
          @click="removeNotification(notification._id, notification.type)"></v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { defineProps, ref } from 'vue';
// import { notificationTypes } from "@/utils/Constants"


const props = defineProps({
  notifications: Array,
});


const activeAnimation = ref(false);

const acceptNotification = (notificationId, notificationType) => {
  const notification = props.notifications.find(notification => notification._id.toString() === notificationId.toString())
  notification.activeAnimation = false;
  console.log(notificationId, notificationType);
  activeAnimation.value = !activeAnimation.value;
}

const removeNotification = (notificationId, notificationType) => {
  const notification = props.notifications.find(notification => notification._id.toString() === notificationId.toString())
  console.log(notification)
  console.log(notificationId, notificationType);
  notification.animationClass = undefined;
  notification.activeAnimation = true;
}


</script>

<style>
.red-fill {
  position: relative;
  overflow: hidden;
}

.red-fill::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 0;
  background-color: red;
  animation: fill-from-right 2s ease forwards;
}

@keyframes fill-from-right {
  0% {
    width: 0%;
    right: 0;
  }
  100% {
    width: 80%;
    right: 100%;
  }
}
</style>