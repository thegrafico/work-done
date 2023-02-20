<template>
  <v-app id="inspire">
    <!-- Header -->
    <Header title="Work Done" :username="user.username" />

    <!-- Main Container -->
    <Dashboard v-if="user._id" :user-id="user._id" />
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from "@/stores/auth.store";
// Components
import Header from "@/components/layout/HeaderView.vue";

// Dynamic load views - Main section
import Dashboard from "@/components/dashboard/DashboardController.vue";

// TODO: getting username for the header. Probably is better to have this inside the component
const authStore = useAuthStore();
const user = ref(authStore.getUser);
</script>