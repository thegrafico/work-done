<template>
  <div>bye</div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth.store";

onBeforeMount(() => {
    const useAuth = useAuthStore();
    useAuth.logout();
});
</script>

<style scoped></style>
