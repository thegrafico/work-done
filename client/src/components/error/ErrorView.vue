<template>

  <v-scroll-y-reverse-transition>
    <v-alert class="alertPosition mt-5 mr-2" v-if="showAlert" type="warning">dummy message.</v-alert>
  </v-scroll-y-reverse-transition>

</template>

<script setup>

import { defineProps, ref } from "vue";

// id = ProjectId, tab = ['task', 'analytics'...];
const props = defineProps({
  type: String,
  message: String,
});

const user = ref({});

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


<style>
.alertPosition {
  position: absolute;
  width: 40%;
  right: 0;
  z-index: 999 !important;
  /* height: 30%; */
}
</style>
