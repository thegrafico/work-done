<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="12">
          <h1>
            Collabs
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field v-model.trim="searchUserInput" clearable label="Search User" prepend-icon="mdi-magnify"
            variant="underlined"></v-text-field>
        </v-col>

        <v-col cols="6" class="mt-3">
          <!-- Create project btn with modal -->
          <ButtonWithModal v-bind="inviteUserBtn" />
        </v-col>

      </v-row>

      <!-- List of user -->
      <UserList v-if="!loadingUsers" :users="users" />

    </v-container>
  </v-main>
</template>

<script setup>

import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import ButtonWithModal from "@/components/button/ButtonWithModal.vue";
import UserList from "@/components/projects/UserList.vue";

// stores
import { useActiveProjectStore } from "@/stores/active.project.store";

// state
const { users, loadingUsers } = storeToRefs(useActiveProjectStore());

// functions 
const { sendInvitation, loadProjectUsers } = useActiveProjectStore();

// Refs
const searchUserInput = ref("");


onMounted(async () => {
  await loadProjectUsers();
});


// Create Task button
const inviteUserBtn = ref({
  title: "Invite User",
  icon: "mdi-account-multiple-plus",
  action: sendInvitation,
  template: "UserInvitation",
  color: "success",
  variant: "tonal",
});
</script>