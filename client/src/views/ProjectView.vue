<template>
  <v-app id="inspire">
    <!-- Header -->
    <Header title="Work Done" />

    <!-- SIDEBAR -->
    <NavSideBar options="project" :username="user.username" />

    <!-- Main Container -->
    <component v-if="!loading" :is="tabs[props.tab]"></component>
  </v-app>
</template>

<script setup>
import { ref, defineProps, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import { useActiveProjectStore } from "@/stores/active.project.store";

// Components
import Header from "@/components/layout/HeaderView.vue";
import NavSideBar from "@/components/layout/NavSideBar.vue";

const { loading } = storeToRefs(useActiveProjectStore());

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
// const tab = ref(props.tab);
const { setActiveProject } = useActiveProjectStore();

const user = ref({});
// const currentProjectId = ref('');

onBeforeMount(async () => {
  console.log("New project loaded!");
  user.value = getUser();
  await setActiveProject(props.id);
});


onUnmounted(async () => {
  await setActiveProject(null);
})


const getUser = () => {
  const useAuth = useAuthStore();
  return useAuth.user;
};
</script>
