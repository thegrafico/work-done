<template>
  <v-app id="inspire">
    <!-- Header -->
    <Header title="Work Done" />

    <!-- SIDEBAR -->
    <NavSideBar options="project" :username="user.username" />

    <!-- Main Container -->
    <component :is="tabs[props.tab]"></component>\
  </v-app>
</template>

<script setup>
import { onMounted, ref, defineProps, defineAsyncComponent } from "vue";
import { useAuthStore } from "@/stores/auth.store";

// Components
import Header from "@/components/layout/HeaderView.vue";
import NavSideBar from "@/components/layout/NavSideBar.vue";

// Dynamic load views - Main section

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
const user = ref({});

onMounted(() => {
  user.value = getUser();
});

const getUser = () => {
  const useAuth = useAuthStore();
  return useAuth.user;
};
</script>
