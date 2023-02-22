<template>
  <v-main>
    <v-container width="80" class="myBG mt-10">
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="4">
          <v-text-field v-model.trim="userSearchInput" clearable label="Search" prepend-icon="mdi-magnify"
            variant="underlined"></v-text-field>
        </v-col>

        <v-col cols="2" class="mt-3">
          <!-- Create project btn with modal -->
          <ButtonWithModal v-bind="createProjectButtonConfig" />
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>

      <!-- Project List -->
      <ProjectList v-show="!loading" :project-options="projectOptions" :filter-tearm="userSearchInput"
        :projects="projects" @update-projects="loadProjects" />
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProjectsStore } from "@/stores/projects.store";

// Components
import ProjectList from "@/components/dashboard/ProjectList.vue";
import ButtonWithModal from "@/components/button/ButtonWithModal.vue";

// use 'loading' cariable from useProjectStore
const { projects, loading } = storeToRefs(useProjectsStore());
const { loadProjects, createProject, updateProject, shareProject, removeProject } = useProjectsStore();

const userSearchInput = ref("");

onMounted(async () => {
  // getting the projects
  console.log(loading.value)
  await loadProjects();
  console.log(loading.value);

});

const createProjectButtonConfig = ref({
  title: "PROJECT",
  icon: "mdi-plus",
  action: createProject,
  template: "CreateProject",
  color: "success",
  variant: "tonal",
});

// I dont fucking like this but I need to do this fast
const projectOptions = ref([
  { title: "Edit", icon: "mdi-pencil", action: updateProject, template: "EditProject" },
  {
    title: "Share",
    icon: "mdi-share",
    action: shareProject,
    template: "ShareProject",
    disabled: true,
  },
  {
    title: "Remove",
    icon: "mdi-delete",
    action: removeProject,
    template: "RemoveProject",
  },
]);

</script>

<style scoped>
.myBG {
  background-color: #14171907;
  max-height: 80vh;
}
</style>
