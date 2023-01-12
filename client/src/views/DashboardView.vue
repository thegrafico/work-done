<template>
  <v-app id="inspire">
    <!-- Header -->
    <Header title="Work Done" />

    <!-- SIDEBAR -->
    <NavSideBar :username="user.username || ''" />

    <!-- Main Container -->
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.trim="userSearchInput"
              clearable
              label="Search"
              prepend-icon="mdi-magnify"
              variant="underlined"
            ></v-text-field>
          </v-col>

          <v-col cols="8" class="mt-3">
            <!-- Create project btn with modal -->
            <ButtonWithModal v-bind="createProjectButtonConfig"/>
          </v-col>
        </v-row>

        <!-- Project List -->
        <ProjectList :filter-tearm="userSearchInput" :projects="projects" @update-projects="updateProjects"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import secureApi from "@/api/authApi";

// Components
import Header from "@/components/layout/HeaderView.vue";
import NavSideBar from "@/components/layout/NavSideBar.vue";
import ProjectList from "@/components/dashboard/ProjectList.vue";
import ButtonWithModal from "@/components/button/ButtonWithModal.vue";

const projects = ref([]);
const user = ref({});
const userSearchInput = ref('');

const createProject = async (project) => { 
  
  const newProject = await secureApi.post("/createProject", project).catch( err => { 
    console.error("Error creating project: ", err);
  });

  if (newProject) { 
    projects.value.push(newProject.data.project);
  }
}

const createProjectButtonConfig = ref({
  title: "PROJECT",
  icon: "mdi-plus",
  action: createProject,
  template: "CreateProject",
  color: 'success',
  variant: 'tonal'
});

// Modal

onMounted(async () => {
  user.value = getUser();
  
  // getting the projects
  projects.value = await getProjects();
});

const getProjects = async () => {
  const response = await secureApi.get('/projects');
  return response.data;
};


const updateProjects = async () => { 
  projects.value = await getProjects();
}

const getUser = () => {
  const useAuth = useAuthStore();
  return useAuth.user;
};

</script>

<style scoped></style>
