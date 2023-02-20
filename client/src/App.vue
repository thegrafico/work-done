<template>
  <v-app>
    <AlertView v-if="showAlert" :type="type" :message="message" />

    <router-view></router-view>
  </v-app>

</template>

<script setup>
import AlertView from "@/components/error/AlertView.vue";
import { storeToRefs } from "pinia";
import { useAlertMessageStore } from "@/stores/alert.message.store";
const { showAlert, type, message } = storeToRefs(useAlertMessageStore());

</script>

<style>
.linkColor {
  color: #37474F;
}

.linkColor:hover {
  color: #546E7A;
}
</style>