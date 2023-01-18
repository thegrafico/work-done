<template>
  <v-main>
    <v-container width="80" class="myBG mt-10" >
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="4">
          <v-text-field
            v-model.trim="userSearchInput"
            clearable
            label="Search"
            prepend-icon="mdi-magnify"
            variant="underlined"
          ></v-text-field>
        </v-col>

        <v-col cols="2" class="mt-3">
          <!-- Create project btn with modal -->
          <ButtonWithModal v-bind="createProjectButtonConfig" />
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>

      <!-- Project List -->
      <ProjectList
        :filter-tearm="userSearchInput"
        :projects="projects"
        @update-projects="updateProjects"
      />
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import secureApi from "@/api/authApi";

// Components
import ProjectList from "@/components/dashboard/ProjectList.vue";
import ButtonWithModal from "@/components/button/ButtonWithModal.vue";

const projects = ref([]);
const userSearchInput = ref("");

const createProject = async (project) => {
  const newProject = await secureApi
    .post("/createProject", project)
    .catch((err) => {
      console.error("Error creating project: ", err);
    });

  if (newProject) {
    projects.value.push(newProject.data.project);
    updateProjects();
  }
};

const createProjectButtonConfig = ref({
  title: "PROJECT",
  icon: "mdi-plus",
  action: createProject,
  template: "CreateProject",
  color: "success",
  variant: "tonal",
});

// Modal

onMounted(async () => {
  // getting the projects
  projects.value = await getProjects();
});

const getProjects = async () => {
  const response = await secureApi.get("/projects");
  return response.data;
};

const updateProjects = async () => {
  projects.value = await getProjects();
};
</script>

<style scoped>
.myBG{
  background-color: #14171907;
  max-height: 80vh;
}
</style>
