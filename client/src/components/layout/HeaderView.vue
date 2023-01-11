<template>
  <v-app-bar :elevation="2" rounded>
    <v-app-bar-title> {{ title }} </v-app-bar-title>

    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-account" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title> <v-icon :icon="item.icon"></v-icon> {<router-link to="/logout">About</router-link> {{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
import { onMounted, defineProps, toRefs, ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";

const props = defineProps({
  title: String,
});

const useAuth = useAuthStore();

const items = ref([
  { title: "Profile", icon: 'mdi-account-box-outline'},
  { title: "Config", icon:  'mdi-cog-outline'},
  { title: "Logout", icon: 'mdi-logout', action: useAuth.logout},
]);

const { title } = toRefs(props);

onMounted(async () => {
  console.log("Mounted Header");
});
</script>
