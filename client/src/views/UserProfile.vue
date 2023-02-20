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
          <v-col align="center">
            {Username}
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            {password}
            {confirm password}
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            {allow project invitations}
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

// Dynamic load views - Main section

// TODO: getting username for the header. Probably is better to have this inside the component
</script>

<style scoped>
.myBG {
  background-color: #14171907;
  max-height: 80vh;
}
</style>