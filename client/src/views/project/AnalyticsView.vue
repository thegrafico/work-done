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
          <v-select v-model="filterTimeSelect" prepend-icon="mdi-filter" label="Time"
            :items="['One Week ago', 'Two Weeks ago', 'One Month ago', 'A Year ago']" variant="underlined"></v-select>
        </v-col>

      </v-row>

      <v-divider></v-divider>

      <!--  Plosts and Char -->
      <AnalyticsChart />

    </v-container>
  </v-main>
</template>

<script setup>
import AnalyticsChart from "@/components/projects/AnalyticsChart.vue";
import { ref } from "vue";

const filterTimeSelect = ref('One Month ago');
</script>