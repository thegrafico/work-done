<template>
  <v-row>
    <v-col cols="4" v-for="item in filteredList" :key="item._id">
      <template>
        <v-card class="mx-auto" max-width="368">
          <v-card-item title="Florida">
            <template v-slot:subtitle>
              <v-icon
                icon="mdi-alert"
                size="18"
                color="error"
                class="mr-1 pb-1"
              ></v-icon>

              Extreme Weather Alert
            </template>
          </v-card-item>

          <v-card-text class="py-0">
            <v-row align="center" no-gutters>
              <v-col class="text-h2" cols="6"> 64&deg;F </v-col>

              <v-col cols="6" class="text-right">
                <v-icon
                  color="error"
                  icon="mdi-weather-hurricane"
                  size="88"
                ></v-icon>
              </v-col>
            </v-row>
          </v-card-text>

          <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-weather-windy">
              <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
              <v-list-item-subtitle>48%</v-list-item-subtitle>
            </v-list-item>
          </div>

          <v-expand-transition>
            <div v-if="expand">
              <div class="py-2">
                <v-slider
                  v-model="time"
                  :max="6"
                  :step="1"
                  :ticks="labels"
                  class="mx-4"
                  color="primary"
                  density="compact"
                  hide-details
                  show-ticks="always"
                  thumb-size="10"
                ></v-slider>
              </div>

              <v-list class="bg-transparent">
                <v-list-item
                  v-for="item in forecast"
                  :key="item.day"
                  :title="item.day"
                  :append-icon="item.icon"
                  :subtitle="item.temp"
                >
                </v-list-item>
              </v-list>
            </div>
          </v-expand-transition>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn @click="expand = !expand">
              {{ !expand ? "Full Report" : "Hide Report" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-col>
  </v-row>
</template>

<script setup>
import { onBeforeUpdate, defineProps, ref, onMounted } from "vue";
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
  console.log("Before filtering: ", arr.length, _.isString(filterTearm));

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
  console.log("Filtered elements: ", filteredList.length);

  return filteredList;
};

// // I dont fucking like this but I need to do this fast
// const taskOptions = ref([
//   { title: "Edit", icon: "mdi-pencil", action: edit, template: "EditProject" },
//   {
//     title: "Remove",
//     icon: "mdi-delete",
//     action: remove,
//     template: "RemoveProject",
//   },
// ]);

const labels = ref({
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WED",
  4: "TH",
  5: "FR",
  6: "SA",
});
const expand = ref(false);
const time = ref(0);
const forecast = ref([
  { day: "Tuesday", icon: "mdi-white-balance-sunny", temp: "24\xB0/12\xB0" },
  { day: "Wednesday", icon: "mdi-white-balance-sunny", temp: "22\xB0/14\xB0" },
  { day: "Thursday", icon: "mdi-cloud", temp: "25\xB0/15\xB0" },
]);
</script>
