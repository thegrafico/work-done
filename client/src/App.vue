<template>
  <v-app>
    <v-scroll-y-reverse-transition>
      <v-alert class="alertPosition mt-2 ml-2" v-show="expand" :type="alertType">{{ alertMessage }}.</v-alert>
    </v-scroll-y-reverse-transition>

    <router-view></router-view>
  </v-app>

</template>

<script setup>
import { ref, onErrorCaptured } from 'vue';
import { alertTypes, alertWaitTime, alertMaxTime } from "@/utils/Constants"

const expand = ref(false);
const alertMessage = ref("");
const alertType = ref(alertTypes.warning);

onErrorCaptured((err) => {

  setTimeout(() => {
    alertMessage.value = err.message;
    alertType.value = err.type;
    expand.value = true
  }, alertWaitTime);


  // reset de alert
  setTimeout(() => {
    expand.value = false;
    alertMessage.value = "";
    alertType.value = alertTypes.warning;
  }, alertMaxTime);
})

</script>

<style>
.alertPosition {
  position: absolute;
  width: 20%;
  /* height: 30%; */
}

.linkColor {
  color: #37474F;
}

.linkColor:hover {
  color: #546E7A;
}
</style>