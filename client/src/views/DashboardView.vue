<template>
  <v-app id="inspire">
    <!-- Header -->
    <Header title="Work Done" />
    
    <!-- Main Container -->
    <Dashboard/>
  </v-app>
</template>

<script setup>

// Components
import Header from "@/components/layout/HeaderView.vue";

// Dynamic load views - Main section
import Dashboard from "@/components/dashboard/DashboardController.vue";

</script>