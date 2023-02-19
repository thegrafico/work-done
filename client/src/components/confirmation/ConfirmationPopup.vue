<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="top">
      <template v-slot:activator="{ props }">
        <v-btn :color="myProps.buttonConfig.color" v-bind="props" :icon="myProps.buttonConfig.icon"
          :variant="myProps.buttonConfig.variant"></v-btn>
      </template>

      <v-card class="overflow-hidden" min-width="150">

        <v-row class="pa-4">
          <v-col align="center">
            <p class="font-weight-bold">
              Are you sure?
            </p>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" @click="closeMenu">
            Cancel
          </v-btn>
          <v-btn :color="myProps.buttonConfig.color" variant="text" @click="performAction">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const myProps = defineProps({
  buttonConfig: Object,
  id: String,
  type: String
});

const menu = ref(false);

const emit = defineEmits(['onSubmit']);

const performAction = async () => {
  emit("onSubmit", { "id": myProps.id, "type": myProps.type }, closeMenu);
}

const closeMenu = () => {
  menu.value = false;
}
</script>