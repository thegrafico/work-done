<template>
  <v-container v-if="props.users.length > 0" fluid>
    <v-sheet elevation="8">
      <!-- Header -->
      <v-row class="header border">
        <v-col cols="1">
          <p></p>
        </v-col>

        <v-col cols="4">
          <p>User</p>
        </v-col>


        <v-col cols="3">
          <p>Status</p>
        </v-col>


        <v-col cols="2">
          <p>Options</p>
        </v-col>

      </v-row>
    </v-sheet>

    <!-- Body -->
    <v-container class="tableBody fluid px-0 mt-10">

      <v-sheet elevation="4" v-for="user in props.users" :key="user._id">

        <v-row class="mb-10 px-2" align="center">
          <v-col cols="1">
            <v-checkbox color="info" value="info" hide-details></v-checkbox>
          </v-col>

          <v-col cols="4">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="4" class=" pa-0 ma-0">
                  <v-avatar color="info" size="x-large">
                  </v-avatar>
                </v-col>
                <v-col cols="8" class="userinfo pa-0 ma-0">
                  <p class="username pa-0">{{ user.username }}</p>
                  <p class="gray pa-0">
                    added: {{ user.creationDate }}
                  </p>
                </v-col>
              </v-row>
            </v-container>

          </v-col>

          <v-col cols="3">
            <v-avatar :color="(user.status === 'pending') ? 'warning' : 'success'" size="16">
            </v-avatar>
            {{ user.status }}
          </v-col>


          <v-col cols="2">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>

              <v-list v-if="(user.status != 'pending')">

                <v-list-item v-for="options in userOptions" :key="options.title">
                  <v-list-item-title>
                    <ButtonWithModal v-bind="options" :data="null" />
                  </v-list-item-title>
                </v-list-item>
              </v-list>

              <v-list v-else>

                <v-list-item v-for="(options) in pendingUserOptions" :key="options.title">
                  <v-list-item-title>
                    <ButtonWithModal v-bind="options" :data="user" />
                  </v-list-item-title>
                </v-list-item>

              </v-list>
            </v-menu>
          </v-col>

        </v-row>

      </v-sheet>

    </v-container>
  </v-container>

  <v-container v-else>
    <!-- In case there is not project created yet -->
    <v-row class="pt-4">
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <v-sheet elevation="21">
          <v-card class="pa-10" align="center">
            <h3>
              It seems you don't have any collaborator for this proyect yet. <br>
              You can send some invitations to your friends.
            </h3>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </v-container>

</template>

<script setup>

import { defineProps, onMounted, ref } from "vue";
import ButtonWithModal from "@/components/button/ButtonWithModal.vue";
import { useActiveProjectStore } from "@/stores/active.project.store";

const { cancelInvitation } = useActiveProjectStore();

const props = defineProps({
  users: Array,
});

onMounted(() => {
  console.log("Users: ", props.users);
});

// I dont fucking like this but I need to do this fast
const userOptions = ref([
  {
    title: "Edit",
    icon: "mdi-pencil",
    action: null,
    template: "CreateTask"
  },
  {
    title: "Remove",
    icon: "mdi-delete",
    action: null,
    template: "RemoveTask",
  },
]);

const pendingUserOptions = ref([
  {
    title: "Cancel",
    icon: "mdi-account-cancel",
    action: async (user) => { await cancelInvitation(user._id) },
    template: "CancelTemplate",
    config: {
      title: "Cancel Invitation",
      message: "Are you sure you want to cancel this invitation?",
      closeButtonTittle: "Close"
    }
  }
]);

</script>

<style scoped>
.header {
  background-color: white;
  border-radius: 10px;
  padding-top: .5em;
  padding-bottom: .5em;
}

.br {
  border-radius: 10px !important;
}

.tableBody p {
  color: black;
}

.points {
  font-weight: bolder;
}

.username {
  color: black;
  font-weight: bold;
  font-size: 0.9em;
}

.userinfo {
  position: relative;
  left: -10%;
}

.gray {
  color: gray !important;
  font-style: italic;
}

.header p {
  font-weight: bolder;
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.15em;
  text-align: left;
}
</style>
