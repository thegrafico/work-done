<template>
  <v-row>
    <v-col cols="3" v-for="project in filteredProjects" :key="project._id">
      <v-card variant="tonal" height="100%">
        <v-toolbar>
          <v-toolbar-title>
            <router-link
              class="font-weight-black linkColor"
              style="text-decoration: none"
              :to="`/project/${project._id}/task`"
            >
              {{ project.title }}
            </router-link>
          </v-toolbar-title>

          <!-- Three Dots options -->
          <template v-slot:append>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(options, i) in projectOptions" :key="i">
                  <v-list-item-title>
                    <ButtonWithModalVue v-bind="options" :project="project" />
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

// TODO: Create notify system for errors and messages
<script setup>
import { onBeforeUpdate, defineProps, ref, defineEmits } from "vue";
import _ from "lodash";
import secureApi from "@/api/authApi";
import ButtonWithModalVue from "../button/ButtonWithModal.vue";

const emit = defineEmits(["updateProjects"]);

const props = defineProps({
  projects: Array,
  filterTearm: String,
});
const filteredProjects = ref([]);

const edit = async (update) => {
  await secureApi.post("updateProject", update).catch((err) => {
    console.log("Error updating project: ", err);
  });
  emit("updateProjects");
};

const remove = async (projectId) => {
  await secureApi.delete(`/deleteProject/${projectId}`);
  emit("updateProjects");
};

const share = (projectId) => {
  console.log("Share Project...", projectId);
};

// I dont fucking like this but I need to do this fast
const projectOptions = ref([
  { title: "Edit", icon: "mdi-pencil", action: edit, template: "EditProject" },
  {
    title: "Share",
    icon: "mdi-share",
    action: share,
    template: "ShareProject",
    disabled: true,
  },
  {
    title: "Remove",
    icon: "mdi-delete",
    action: remove,
    template: "RemoveProject",
  },
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

  const filteredProjects = projects.filter((project) => {
    return project.title.toLowerCase().includes(filterTearm);
  });

  return filteredProjects;
};
</script>


