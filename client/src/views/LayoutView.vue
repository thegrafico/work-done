<template>
  <v-app id="inspire">
    <!-- Header -->
    <Header title="Work Done" />
    
    <!-- Main Container -->
    <component :is="DashboardView"></component>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";


// Components
import Header from "@/components/layout/HeaderView.vue";

// Dynamic load views - Main section
import DashboardView from "@/views/DashboardView.vue";

// const mainComponentView = {}

const user = ref({});


onMounted(() => { 
    user.value = getUser();
    console.log("before mound: ")
});


const getUser = () => {
  const useAuth = useAuthStore();
  return useAuth.user;
};

</script>