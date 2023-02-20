<template>
  <v-row>
    <v-col cols="3" v-for="project in filteredProjects" :key="project._id">
      <v-card :color="(project.owner.toString() === userId) ? null : 'info'" variant="tonal" height="100%">
        <v-toolbar>
          <v-toolbar-title>
            <router-link class="font-weight-black linkColor" style="text-decoration: none"
              :to="`/project/${project._id}/task`">
              {{ project.title }}
            </router-link>
          </v-toolbar-title>

          <!-- Three Dots options -->
          <template v-if="(project.owner.toString() === userId)" v-slot:append>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(options, i) in props.projectOptions" :key="i">
                  <v-list-item-title>
                    <ButtonWithModalVue v-bind="options" :project="project" />
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-toolbar>
        <v-card-text>
          <span style="color: black">
            {{ project.description }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onBeforeUpdate, defineProps, ref } from "vue";
import _ from "lodash";
import ButtonWithModalVue from "../button/ButtonWithModal.vue";
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();
const props = defineProps({
  projects: Array,
  filterTearm: String,
  projectOptions: Object,
});
const filteredProjects = ref([]);
const userId = authStore.getUserId;


onBeforeUpdate(async () => {
  filteredProjects.value = filterArray(props.projects, props.filterTearm);
});

// /**
//  * Filter array with
//  * @param {Array} projects
//  * @param {String} filterTearm
//  * @returns {Array}
//  */
const filterArray = (projects, filterTearm) => {
  // console.log(projects.length, _.isString(filterTearm));

  if (!_.isString(filterTearm)) {
    return projects;
  }

  if (_.isEmpty(projects)) {
    return [];
  }

  const filteredProjects = projects.filter((project) => {
    return project.title.toLowerCase().includes(filterTearm);
  });

  return filteredProjects;
};
</script>


