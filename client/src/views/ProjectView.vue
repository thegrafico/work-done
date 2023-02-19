<template>
  <v-app id="inspire">

    <AlertView v-if="showAlert" :type="type" :message="message" />

    <!-- Header -->
    <Header title="Work Done" :username="user.username" />

    <!-- SIDEBAR -->
    <NavSideBar v-if="!loadingProject" options="project" :project-name="project.title" />

    <!-- Main Container -->
    <component v-if="!loadingProject" :is="tabs[props.tab]"></component>
  </v-app>
</template>

<script setup>
import { ref, defineProps, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import { useAlertMessageStore } from "@/stores/alert.message.store";
import { useActiveProjectStore } from "@/stores/active.project.store";

// Components
import Header from "@/components/layout/HeaderView.vue";
import NavSideBar from "@/components/layout/NavSideBar.vue";
import AlertView from "@/components/error/AlertView.vue";

const { loadingProject, project } = storeToRefs(useActiveProjectStore());
const { setActiveProject } = useActiveProjectStore();

// TODO: get rid of this
const user = ref({});

// Alert message
const { showAlert, type, message } = storeToRefs(useAlertMessageStore());


// id = ProjectId, tab = ['task', 'analytics'...];
const props = defineProps({
  id: String,
  tab: String,
});

// Navigation tabs inside project ( Componets for project - AKA routes)
const tabs = {
  task: defineAsyncComponent(() =>
    import("../views/project/TaskView.vue")),
  analytics: defineAsyncComponent(() =>
    import("../views/project/AnalyticsView.vue")),
  collabs: defineAsyncComponent(() =>
    import("../views/project/CollabView.vue")),
  config: defineAsyncComponent(() =>
    import("../views/project/ProjectConfigView.vue")),
};

onBeforeMount(async () => {
  user.value = getUser();
  await setActiveProject(props.id);
});


onUnmounted(async () => {
  await setActiveProject(null);
});


const getUser = () => {
  const useAuth = useAuthStore();
  return useAuth.user;
};
</script>