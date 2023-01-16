<template>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <h1>{{ title }}</h1>
      </v-container>
    </v-main>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  
  
  const title = "Collabs"
  onMounted(async () => {
    console.log("Collab view loaded");
  });
  </script>
  