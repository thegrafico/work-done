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

      <v-row>
        <v-col cols="4">
          <v-text-field label="Name" v-model.trim="projectTitle" :model-value="projectTitle"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-select clearable label="Reset Points Time"
            :items="['None', 'One Week', 'Two Weeks', 'One Month', 'One Year']"></v-select>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col align="end">
          <v-btn variant="flat" color="primary" @click="submitProjectConfig">
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


const activeProjectStore = useActiveProjectStore();
const projectTitle = ref(activeProjectStore.getTitle);

const { updateProjectConfig } = useActiveProjectStore();

const submitProjectConfig = async () => {
  const update = {
    title: projectTitle.value
  }
  console.log("Updating project: ", update);
  await updateProjectConfig(update);
}
</script>