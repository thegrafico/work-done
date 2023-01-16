<template>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <h1>{{ title }}</h1>
      </v-container>
    </v-main>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  
  
  const title = "Config"
  onMounted(async () => {
    console.log("Project Config loaded");
  });
  </script>
  