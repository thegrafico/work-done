<template>

  <v-scroll-y-reverse-transition>
    <v-alert class="alertPosition mt-5 mr-2" v-if="showAnimation" :type="props.type">

      <h3>
        {{ props.message }}
      </h3>

    </v-alert>
  </v-scroll-y-reverse-transition>

</template>

<script setup>

import { defineProps, onMounted, ref } from "vue";


// id = ProjectId, tab = ['task', 'analytics'...];
const props = defineProps({
  type: String,
  message: String,
});

const showAnimation = ref(false);

onMounted(() => {
  showAnimation.value = true;
});


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
