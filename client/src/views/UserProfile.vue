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
            <v-text-field label="Old Password" type="password"></v-text-field>
          </v-col>

          <v-col justify="center" cols="3">
            <v-text-field label="New Password" type="password"></v-text-field>
          </v-col>
          <v-col justify="center" cols="3">
            <v-text-field label="Confirm Password" type="password"></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="4" class="ml-9">
            <v-switch label="Allow Project invitations" color="success" hide-details></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col align="center">
            <v-btn color="primary">save</v-btn>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// Components
import Header from "@/components/layout/HeaderView.vue";

import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useAuthStore());

onMounted(() => {
  console.log(user);
})

</script>

<style scoped>
.myBG {
  background-color: #14171907;
  max-height: 80vh;
}
</style>