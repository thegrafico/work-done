<template>
  <v-app id="inspire">

    <v-app-bar :elevation="2" rounded>

      <v-app-bar-title> Work Done</v-app-bar-title>

      <template v-slot:append>

        <v-btn icon="mdi-account"></v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">

      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-center">
              <v-avatar class="aling-center" color="grey-darken-1" size="64"></v-avatar>
            </div>
          </v-col>

          <v-col cols="12">
            <div class="d-flex justify-center">
              <div>john@google.com</div>
            </div>
          </v-col>

        </v-row>

      </v-container>


      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <template v-slot:prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>

          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="4">
            <v-text-field clearable label="Search" prepend-icon="mdi-magnify" variant="underlined"></v-text-field>
          </v-col>

          <v-col cols="8" class="mt-3">
            <v-btn color="success" prepend-icon="mdi-plus" class="">
              Project
            </v-btn>
          </v-col>
        </v-row>

        <v-row>

          <v-col cols="4" v-for="project in projects" :key="project._id">
            <v-card :title="project.title" text="..." variant="tonal">
              <v-card-actions>
                <v-btn>Click me</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import Api from "@/api/api";

const drawer = ref(null);
const links = ref([
  ['mdi-inbox-arrow-down', 'Inbox'],
  ['mdi-send', 'Send'],
  ['mdi-delete', 'Trash'],
  ['mdi-alert-octagon', 'Spam'],
]);
const projects = ref([])


onMounted(async () => {
  const userProjects = await getProjects();
  projects.value = userProjects.projects || [];
});

const getProjects = async () => {
  const user = getUser();
  return await Api.getUserProjects(user);
}

const getUser = () => {
  const useAuth = useAuthStore();
  return useAuth.user;
}


</script>

<style scoped>

</style>
