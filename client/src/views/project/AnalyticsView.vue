<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="12">
          <h1>Analytics</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field v-model.trim="searchTaskInput" clearable label="Search" prepend-icon="mdi-magnify"
            variant="underlined"></v-text-field>
        </v-col>

        <v-col cols="6" class="mt-3">
          <!-- Create project btn with modal -->
          <ButtonWithModal v-bind="createTaskButton" />
        </v-col>
        <v-col cols="2 mt-3">
          <v-btn disabled>Last 30 days</v-btn>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <!--  Plosts and Char -->
      <AnalyticsChart />

    </v-container>
  </v-main>
</template>

<script setup>

import { onMounted, ref } from "vue";
import ButtonWithModal from "@/components/button/ButtonWithModal.vue";
import AnalyticsChart from "@/components/projects/AnalyticsChart.vue";

// Refs
const searchTaskInput = ref("");


// Mounted hook
onMounted(async () => {
});


// Create Task button
const createTaskButton = ref({
  title: "TASK",
  icon: "mdi-plus",
  action: null,
  template: "createTask",
  color: "success",
  variant: "tonal",
});
</script>