<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>

      <v-row class="mb-10">
        <v-col cols="12">
          <h1>
            Config
          </h1>
        </v-col>
      </v-row>
      <!-- list of task -->


      <v-row>
        <v-col cols="12">
          <h3>General</h3>
        </v-col>
        <v-divider></v-divider>

      </v-row>

      <!-- Project Name -->
      <v-row>
        <v-col cols="4">
          <v-text-field label="Name" v-model.trim="projectTitle" :model-value="projectTitle"></v-text-field>
        </v-col>
      </v-row>

      <!-- Show Reset Points -->
      <v-row>
        <v-col cols="4">
          <v-select clearable label="Reset Points Time" v-model="projectConfigTaskDuration" disabled
            :items="['None', 'One Week', 'Two Weeks', 'One Month', 'One Year']"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h3>Task</h3>
        </v-col>
        <v-divider></v-divider>

      </v-row>
      <!-- Allow Users to remove tasks -->
      <v-row>
        <v-col cols="4">
          <v-switch label="Allow users to remove tasks" color="success" hide-details disabled></v-switch>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col align="end">
          <v-btn :disabled="!isProjectOwner" variant="flat" color="primary" @click="submitProjectConfig">
            Save Changes
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from "vue";
import { useActiveProjectStore } from '@/stores/active.project.store';

// Active Project Store
const activeProjectStore = useActiveProjectStore();
const isProjectOwner = activeProjectStore.isProjectOwner;

const { updateProjectConfig } = useActiveProjectStore();


// ref
const projectTitle = ref(activeProjectStore.getTitle);
const projectConfigTaskDuration = ref('None');

const submitProjectConfig = async () => {
  const update = {
    title: projectTitle.value
  }
  console.log("Updating project: ", update);
  await updateProjectConfig(update);
}
</script>