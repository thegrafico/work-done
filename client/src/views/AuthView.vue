<template>
  <v-form class="form" ref="form">
    <!-- Login -->
    <LoginTab @login="loginUser" />
  </v-form>
</template>

<script setup>
import LoginTab from "../components/auth/LoginTab.vue";

import { useAuthStore } from '@/stores/auth.store';
import { onMounted } from "vue";

onMounted(() => {
  checkIfUserIsLoggedIn();
});

// Method called by emit
const loginUser = async (username, password, resetLoadingFunc) => {

  const { login } = useAuthStore();
  await login(username, password);
  resetLoadingFunc();
}

const checkIfUserIsLoggedIn = () => {

  const useStore = useAuthStore();
  if (useStore.getUser) {
    return useStore.redirectToHome();
  }

  // clean store just in case
  useStore.clearUser();
}

</script>