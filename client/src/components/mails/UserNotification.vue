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
          <v-tab :value="2">Messages</v-tab>
          <v-tab :value="3">Project Invitations</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item v-for="n in 3" :key="n" :value="n">
            <v-container fluid>
              <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8">
                  <v-list lines="two">
                    <v-list-subheader inset>Project Invitations</v-list-subheader>

                    <v-list-item v-for="notification in notifications" :key="notification._id"
                      :title="notification.message" subtitle="02/15/2023">
                      <template v-slot:prepend>
                        <v-avatar color="grey-lighten-1">
                          RA
                        </v-avatar>
                      </template>

                      <template v-slot:append>
                        <v-btn color="success" icon="mdi-check-circle" variant="text"></v-btn>
                        <v-btn color="error" icon="mdi-cancel" variant="text"></v-btn>
                      </template>
                    </v-list-item>
                  </v-list>
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
import { ref, onMounted } from 'vue';
import { useUserNotificationStore } from '@/stores/user.notification.store';
import { storeToRefs } from 'pinia';

const dialog = ref(false);
const tab = ref(null);

// store functions
const { loadingNotifications, notifications } = storeToRefs(useUserNotificationStore());
const { loadNotifications } = useUserNotificationStore();

onMounted(async () => {
  console.log("Loading notifications...");
  await loadNotifications();
  // await loadNotifications();
});

</script>