<template>
  <v-app id="inspire">
    <!-- Header -->
    <Header title="Work Done" />

    <!-- SIDEBAR -->
    <NavSideBar options="project"/>

    <!-- Main Container -->
    <component :is="DashboardView"></component>
  </v-app>
</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";
import { useAuthStore } from "@/stores/auth.store";


// Components
import Header from "@/components/layout/HeaderView.vue";
import NavSideBar from "@/components/layout/NavSideBar.vue";

// Dynamic load views - Main section
import DashboardView from "@/views/DashboardView.vue";

const props = defineProps({
  id: String,
  tab: String,
});

const user = ref({});
onMounted(() => {
  user.value = getUser();
  console.log("props", props);
});

const getUser = () => {
  const useAuth = useAuthStore();
  return useAuth.user;
};
</script>
