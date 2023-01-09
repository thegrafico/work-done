<template>
  <h1>Dashboard Route</h1>  
</template>

<script setup>
import { onMounted} from 'vue';
import Api from "@/api/api";

// const api = new Api();

onMounted(() => {

  const projects = Api.getUserProjects();

  console.log("Projects: " + projects);

});
// const getUserProjects = async () => {
//   api.
// }
</script>

<style scoped>
</style>
