<template>
  <v-app id="inspire">
    <!-- Header -->
    <Header title="Work Done" />

    <!-- Main Container -->
    <v-main>
      <v-container width="80" class="myBG mt-10 pa-10" style="border-radius: 1%;">
        <v-row>
          <v-col align="center">
            <v-avatar color="black" size="80"> <span class="text-h4 font-weight-bold"> RA </span></v-avatar>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center" class="font-weight-bold">
            {{ user.username }}
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col justify="center" cols="3">
            <v-text-field v-model="oldPassword" label="Old Password" type="password"></v-text-field>
          </v-col>

          <v-col justify="center" cols="3">
            <v-text-field v-model="newPassword" label="New Password" type="password"></v-text-field>
          </v-col>

          <v-col justify="center" cols="3">
            <v-text-field v-model="confirmationPassword" label="Confirm Password" type="password"></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="4" class="ml-9">
            <v-switch v-model="allowProjectInvitations" label="Allow Project invitations" color="success"
              hide-details></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col align="center">
            <v-btn color="primary" @click="saveUserConfiguration">save</v-btn>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// Components
import Header from "@/components/layout/HeaderView.vue";

import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";
import secureApi from "@/api/authApi";

const { user } = storeToRefs(useAuthStore());
const { setUser } = useAuthStore();

const oldPassword = ref("");
const newPassword = ref("");
const confirmationPassword = ref("");
const allowProjectInvitations = ref(false);

onMounted(() => {
  console.log(user.value);
  allowProjectInvitations.value = user.value.allowProjectInvitations;
});

const saveUserConfiguration = async () => {

  let userUpdate = {};

  // check if we're updating the password, if so, add it to the update
  if (updatingPassword()) {
    userUpdate["oldPassword"] = oldPassword.value;
    userUpdate["newPassword"] = newPassword.value;
  }

  // check if the user changed the allow project invitations
  if (user.value.allowProjectInvitations != allowProjectInvitations.value) {
    userUpdate["allowProjectInvitations"] = allowProjectInvitations.value;
  }

  // if there is any update
  if (Object.keys(userUpdate).length > 0) {
    const userResponse = await secureApi.post("/user/update", userUpdate);

    if (!userResponse || !userResponse.data || !userResponse.data.user) {
      return;
    }

    // update the user infor in the local store
    setUser(userResponse.data.user, true);
  }

}


// const getUserConfig = (user) => {
//   if (!user) {
//     return undefined;
//   }

//   if (!user.config) { return {} }

//   return user.config;
// }

const updatingPassword = () => {
  // if any of the fields have something, then return true
  return oldPassword.value.length > 0 || newPassword.value.length > 0 || confirmationPassword.value.length > 0;
}

</script>

<style scoped>
.myBG {
  background-color: #14171907;
  max-height: 80vh;
}
</style>