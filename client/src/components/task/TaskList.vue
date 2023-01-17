<template>

  <div>
    <v-row class="pt-4" v-if="filteredList.length > 0">
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
                    <v-list-item v-for="(options, i) in taskOptions" :key="i">
                      <v-list-item-title>
                        <ButtonWithModal v-bind="options" :data="task" />
                      </v-list-item-title>
                    </v-list-item>
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
                <v-col :cols="task.icon ? 6 : 12" :align="!task.icon ? 'center' : null">
                  <v-avatar :color="(task.color) ? task.color : 'info'" size="x-large">
                    <h2>
                      {{ getMyPoints(task.points) }}
                    </h2>
                  </v-avatar>
                </v-col>

                <v-col v-if="task.icon" cols="6" class="text-right">
                  <v-icon :icon="task.icon" size="60"></v-icon>
                </v-col>
              </v-row>
            </v-card-text>

            <!-- Amound of people that worked in this task -->
            <div class="d-flex py-2 justify-space-between">
              <v-list-item density="compact" prepend-icon="mdi-account-group-outline">
                <v-list-item-subtitle> {{ task.points.length }} People have done this task.</v-list-item-subtitle>
              </v-list-item>
            </div>

            <!-- Divider -->
            <v-divider></v-divider>

            <!-- Action Buttons for adding or subtracting -->
            <TaskButton @on-increment="incrementUserPoints" @on-decrement="decrementUserPoints" :task-id="task._id"
              :task-value="task.value" :user-points="getMyPoints(task.points)" />
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- In case there is not project created yet -->
    <v-row v-if="!filteredList.length" class="pt-4">
      <v-col cols="3"></v-col>
      <v-col cols="6">
         <v-sheet elevation="21">
          <v-card class="pa-10">
            <h3>
              It seems you don't have any task for this proyect yet.
            </h3>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>

  </div>

</template>

<script setup>
import { onBeforeUpdate, defineProps, ref, onMounted, defineEmits } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import TaskButton from "@/components/button/TaskButton.vue";
import ButtonWithModal from "../button/ButtonWithModal.vue";
import secureApi from "@/api/authApi";
import _ from "lodash";

const emit = defineEmits(["on-task-updated"]);

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


const incrementUserPoints = async (taskId) => {
  const updatedTask = await secureApi.post(`/projects/task/${taskId}/increment`);
  emit('on-task-updated', updatedTask.data);
}
const decrementUserPoints = async (taskId) => {
  const updatedTask = await secureApi.post(`/projects/task/${taskId}/decrement`);
  emit('on-task-updated', updatedTask.data);
}

const updateTask = async (updatedTask) => {
  console.log("updated: ", updatedTask);
}
const removeTask = async (taskId) => {
  const taskWasRemoved = await secureApi.delete(`/projects/tasks/${taskId}`);

  if (taskWasRemoved.status === 200) {
    // in order to work need to pass the _id parameter
    emit('on-task-updated', { _id: taskId }, 'remove');
  }
}

// I dont fucking like this but I need to do this fast
const taskOptions = ref([
  {
    title: "Edit",
    icon: "mdi-pencil",
    action: updateTask,
    template: "createTask"
  },
  {
    title: "Remove",
    icon: "mdi-delete",
    action: removeTask,
    template: "removeTask",
  },
]);

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
  if (!_.isArray(taskPoints)) {
    console.error("Error: Points seems to be damaged");
    return 0;
  }

  // check if points are empty
  if (_.isEmpty(taskPoints)) { return 0 }

  const myPoints = taskPoints.find(userPoints => userPoints.userId.toString() === user.value._id.toString());

  if (myPoints && myPoints.value) {
    return myPoints.value;
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
