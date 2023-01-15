<template>
  <v-row class="pt-4">
    <v-col cols="3" v-for="item in filteredList" :key="item._id">
      <v-sheet elevation="21">
        <v-card class="mx-auto">

          <v-toolbar color="rgb(0,0,0,0)">
            <v-toolbar-title>
              <h4>
                {{ item.title }}
              </h4>
            </v-toolbar-title>

            <!-- Three Dots options -->
            <template v-slot:append>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                </template>

                <v-list>

                </v-list>
              </v-menu>
            </template>
          </v-toolbar>
          <!-- Points and Icon -->
          <v-card-text class="py-0">
            <v-row class="pl-3 pb-3 mb-2"> <!-- Priority or Points? -->
              <v-icon icon="mdi-alert" size="18" color="error" class="mr-1 pb-1"></v-icon>
              {{ item.description }}
            </v-row>
            <v-row align="center" no-gutters>
              <v-col cols="6">
                <v-avatar :color="(item.color) ? item.color : 'info'" size="x-large">
                  <h2>
                    {{ item.myPoints }}
                  </h2>
                </v-avatar>
              </v-col>

              <v-col cols="6" class="text-right">
                <v-icon :icon="item.icon" size="60"></v-icon>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Amound of people that worked in this task -->
          <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-account-group-outline">
              <v-list-item-subtitle>3 People had done this task.</v-list-item-subtitle>
            </v-list-item>
          </div>

          <!-- Divider -->
          <v-divider></v-divider>

          <!-- Action Buttons for adding or subtracting -->
          <TaskButton />
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>
®‰‰ ‰
<script setup>
import { onBeforeUpdate, defineProps, ref, onMounted } from "vue";
import TaskButton from "@/components/button/TaskButton.vue";
import _ from "lodash";
// import secureApi from "@/api/authApi";

// const emit = defineEmits(["updateProjects"]);

const props = defineProps({
  list: Array,
  filterTearm: String,
});
const filteredList = ref([]);

// const edit = async (update) => {
//   await secureApi.post("updateProject", update).catch((err) => {
//     console.log("Error updating project: ", err);
//   });
//   emit("updateProjects");
// };

// const remove = async (projectId) => {
//   await secureApi.delete(`/deleteProject/${projectId}`);
//   emit("updateProjects");
// };

onMounted(() => {
  filteredList.value = filterArray(props.list, props.filterTearm);
});

onBeforeUpdate(async () => {
  filteredList.value = filterArray(props.list, props.filterTearm);
});

// /**
//  * Filter array with
//  * @param {Array} projects
//  * @param {String} filterTearm
//  * @returns {Array}
//  */
const filterArray = (arr, filterTearm) => {
  if (!_.isString(filterTearm)) {
    return arr;
  }

  if (_.isEmpty(arr)) {
    return [];
  }

  // check if the current item title math what the user entered
  const filteredList = arr.filter((item) => {
    return item.title.toLowerCase().includes(filterTearm);
  });

  return filteredList;
};
</script>
