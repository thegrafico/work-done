<template>
  <h1>Dashboard Route</h1>  
</template>

<script setup>
import { onMounted} from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import Api from "@/api/api";


onMounted( async () => {
  const projects = await getProjects();

  console.log("Projects: ", projects);
});

const getProjects = async () => {
  const user = getUser();
  return await Api.getUserProjects(user);
}

const getUser = () => { 
  const useAuth = useAuthStore();
  // useAuth.logout()
  return useAuth.user;
}


</script>

<style scoped>
</style>
