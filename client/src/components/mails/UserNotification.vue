<template>
  <div>

    <v-dialog v-model="dialog" scrollable>
      <template v-slot:activator="{ props }">
        <v-btn stacked v-bind="props">
          <v-badge v-if="!loadingNotifications && notifications.length > 0"
            :content="(notifications.length > 9) ? '9+' : notifications.length.toString()" color="error">
            <v-icon icon="mdi-newspaper-variant"></v-icon>
          </v-badge>
          <v-icon v-else icon="mdi-newspaper-variant"></v-icon>
          <p>
            Mails
          </p>
        </v-btn>
      </template>
      <v-card class="border pa-2 ml-auto mr-auto" width="80%" height="60%">
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
          <v-tab :value="1">All</v-tab>
          <v-tab :value="2" disabled>Messages</v-tab>
          <v-tab :value="3" disabled>Project Invitations</v-tab>
        </v-tabs>

        <v-window v-model="tab" style="max-height:60vh; overflow-y: scroll; overflow-x: hidden;">
          <!-- TODO: finish window-item 2 and 3 -->
          <v-window-item :value="1">
            <v-container fluid>
              <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8">
                  <NotificationList v-if="!loadingNotifications" :notifications="notifications" />
                </v-col>
              </v-row>

            </v-container>
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import { useUserNotificationStore } from '@/stores/user.notification.store';
import { storeToRefs } from 'pinia';
import NotificationList from './NotificationList.vue';

const dialog = ref(false);
const tab = ref(null);

// store functions
const { loadingNotifications, notifications } = storeToRefs(useUserNotificationStore());
const { loadNotifications } = useUserNotificationStore();

onMounted(async () => {
  await loadNotifications();
  // await loadNotifications();
});

onUpdated(async () => {

  // if modal is open
  if (dialog.value) {
    await loadNotifications();
  }
})



</script>