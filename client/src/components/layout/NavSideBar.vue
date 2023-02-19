<template>
  <v-navigation-drawer v-model="drawer">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-center">
            <v-avatar class="aling-center" color="info" size="64">
              <span class="font-weight-bold text-h5">
                {{ props.projectName.slice(0, 2).toUpperCase() }}
              </span>
            </v-avatar>
          </div>
        </v-col>

        <v-col cols="12">
          <div class="d-flex justify-center">
            <div class="font-weight-black">{{ capitalize(props.projectName) }}</div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text, url] in links" :key="icon" link class="pa-0 ma-0">
        <router-link :to="url" class="font-weight-black linkColor" style="text-decoration: none">
          <v-list-item-title class="pa-2">
            <v-icon>{{ icon }}</v-icon> {{ text }}</v-list-item-title>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { capitalize, onMounted } from "vue";
import { ref, defineProps } from "vue";
import { sideOptions } from "@/utils/Constants";

const props = defineProps({
  options: String,
  projectName: String,
});


const drawer = ref(null);
const links = ref([]);

onMounted(() => {
  links.value = getSideOption(props.options || "dashboard");
});

const getSideOption = (option) => {
  return sideOptions[option];
};
</script>
