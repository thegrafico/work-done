<template>
  <v-app-bar :elevation="2" rounded>
    <v-app-bar-title>
      <router-link to="/" class="font-weight-black linkColor" style="text-decoration: none">
        {{ title }}
      </router-link>
    </v-app-bar-title>

    <!-- Icon for mains for user -->
    <UserNotification />

    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-account" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item v-for="[icon, urlTitle, url] in headerOptions" :key="icon" class="ma-0 pa-0">
            <v-list-item-title width="100">
              <router-link :to="url" width="100" class="font-weight-black linkColor pa-4" style="text-decoration: none">
                <v-icon :icon="icon"></v-icon>
                {{ urlTitle }}
              </router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
import { defineProps, toRefs, ref, onMounted } from "vue";
import { headerBarOptions } from "@/utils/Constants";
import UserNotification from "../mails/UserNotification.vue";

const props = defineProps({
  title: String,
});

const headerOptions = ref([]);

onMounted(() => {
  headerOptions.value = headerBarOptions;
});


const { title } = toRefs(props);
</script>
