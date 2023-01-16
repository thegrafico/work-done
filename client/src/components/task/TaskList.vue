<template>
  <v-row class="pt-4">
    <v-col cols="3" v-for="task in filteredList" :key="task._id">
      <v-sheet elevation="21">
        <v-card class="mx-auto">

          <v-toolbar color="rgb(0,0,0,0)">
            <v-toolbar-title>
              <h4>
                {{ task.title }}
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
              {{ task.description }}
            </v-row>
            <v-row align="center" no-gutters>
              <v-col :cols="task.icon ? 6: 12"  :align="!task.icon ? 'center' : null">
                <v-avatar :color="(task.color) ? task.color : 'info'" size="x-large">
                  <h2>
                    {{  getMyPoints(task.points) }}
                  </h2>
                </v-avatar>
              </v-col>

              <v-col v-if="task.icon" cols="6" class="text-right">
                <v-icon :icon="task.icon" size="60"></v-icon>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Amound of people that worked in this task -->
          <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-account-group-outline">
              <v-list-item-subtitle> {{ task.points.length }} People had done this task.</v-list-item-subtitle>
            </v-list-item>
          </div>

          <!-- Divider -->
          <v-divider></v-divider>

          <!-- Action Buttons for adding or subtracting -->
          <TaskButton @on-submit="updateTaskUserPoints" :task-id="task._id"/>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { onBeforeUpdate, defineProps, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import TaskButton from "@/components/button/TaskButton.vue";
import secureApi from "@/api/authApi";
import _ from "lodash";

// const emit = defineEmits(["updateProjects"]);

const props = defineProps({
  tasks: Array,
  filterTearm: String,
});

const filteredList = ref([]);
const user = ref({});


onMounted(() => {
  const useStore = useAuthStore();
  user.value = useStore.user
  filteredList.value = filterArray(props.tasks, props.filterTearm);
});


onBeforeUpdate(async () => {
  filteredList.value = filterArray(props.tasks, props.filterTearm);
});



const updateTaskUserPoints = async (taskId, updateType) => { 
  const taskWasUpdated = await secureApi.post(`/projects/task/${taskId}/updatePoints`, updateType)
  return  taskWasUpdated.data;
}

/**
 * get current user points
 * @param {Array} taskPoints 
 */
const getMyPoints = (taskPoints) => { 

  // check if there is an user
  if (!user.value || !user.value._id) { 
    console.error("Sorry, cannot get yours points now");
    return 0;
  }

  // check if there is points
  if (!_.isArray(taskPoints) ) { 
    console.error("Error: Points seems to be damaged");
    return 0;
  }

  // check if points are empty
  if (_.isEmpty(taskPoints)) { return 0 }

  const myPoints = taskPoints.filter(userPoints => userPoints.userId.toString() === user.value._id.toString());

  if (myPoints &&  myPoints.length > 0) { 
    return myPoints[0].points;
  }

  return 0;
}

// /**
//  * Filter array with
//  * @param {Array} projects
//  * @param {String} filterTearm
//  * @returns {Array}
//  */
const filterArray = (arr, filterTearm) => {

  // console.log("Filtering: ", arr);
  // console.log("Tearm: ", filterTearm);
  
  if (!_.isString(filterTearm) || _.isEmpty(filterTearm)) {
    return arr;
  }

  if (!arr || _.isEmpty(arr)) {
    return [];
  }

  // check if the current item title math what the user entered
  const tempFilteredArr = arr.filter((item) => {
    return item.title.toLowerCase().includes(filterTearm);
  });

  return tempFilteredArr;
};
</script>
