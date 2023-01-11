<template>
  <v-row>
    <v-col cols="4" v-for="project in filteredProjects" :key="project._id">
      <v-card variant="tonal">
        <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
          <!-- <template v-slot:prepend>
            <v-btn icon="$menu"></v-btn>
          </template> -->

          <v-toolbar-title class="text-h6">
            {{ project.title }}
          </v-toolbar-title>
          
          <!-- Three Dots options -->
          <template v-slot:append>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-title>
                    <ButtonWithModalVue v-bind="item"/>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-toolbar>
        <v-card-text>
          {{ project.description }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onBeforeUpdate, defineProps, ref } from "vue";
import _ from "lodash";
import ButtonWithModalVue from "../button/ButtonWithModal.vue";

const props = defineProps({
  projects: Array,
  filterTearm: String,
});

// const { projects, filterTearm } = toRefs(props);
const filteredProjects = ref([]);

const edit = (projectId) => {
  console.log("Editing Project...", projectId);
};

const remove = (projectId) => {
  console.log("Removing Project...", projectId);
};

const share = (projectId) => {
  console.log("Share Project...", projectId);
};

// I dont fucking like this but I need to do this fast
const items = ref([
  { title: "Edit", icon: "mdi-pencil", action: edit, template: 'EditProject' },
  { title: "Share", icon: "mdi-share", action: share, template: 'ShareProject'},
  { title: "Remove", icon: "mdi-delete", action: remove, template: 'RemoveProject'},
]);

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
  console.log("Filtering projects: ", projects.length);

  const filteredProjects = projects.filter((project) => {
    return project.title.toLowerCase().includes(filterTearm);
  });

  return filteredProjects;
};
</script>
