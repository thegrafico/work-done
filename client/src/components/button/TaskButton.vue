<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col v-if="userCanDecrement" :cols="(userCanIncrement) ? 6 : 12">
        <button class="button-54 red" style="width:100%" @click="$emit('on-decrement', props.taskId)">-{{ props.taskValue }}</button>
      </v-col>
      <v-col v-if="userCanIncrement" :cols="(userCanDecrement) ? 6 : 12">
        <button class="button-54 green" style="width:100%" @click="$emit('on-increment', props.taskId)">+{{ props.taskValue }}</button>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>

import { defineProps, onMounted, ref, onUpdated } from 'vue';

const props = defineProps({
  taskId: String,
  taskValue: Number,
  userPoints: Number,
});

const userCanDecrement = ref(false);
const userCanIncrement = ref(false);

// TODO: add constants instead of harcoded values for limits.
onMounted(() => { 
  userCanDecrement.value = (props.userPoints - props.taskValue) >= 0;
  userCanIncrement.value = (props.userPoints + props.taskValue) <= 100;
});

onUpdated(() => {
  userCanDecrement.value = (props.userPoints - props.taskValue) >= 0;
  userCanIncrement.value = (props.userPoints + props.taskValue) <= 100;
});


</script>

<style scoped>
.button-54 {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: rgb(0, 0, 0, 00.75em);
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
    5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.red{
  color: rgba(188, 53, 46, 0.662);
}
.green{
  color: rgba(57, 191, 70, 0.553);
}

.button-54:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
}

@media (min-width: 768px) {
  .button-54 {
    padding: 0.25em 0.75em;
  }
}
</style>

<!-- HTML !-->

/* CSS */
