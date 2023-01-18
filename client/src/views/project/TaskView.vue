<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="12">
          <h1>Task</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field v-model.trim="searchTaskInput" clearable label="Search" prepend-icon="mdi-magnify"
            variant="underlined"></v-text-field>
        </v-col>

        <v-col cols="6" class="mt-3">
          <!-- Create project btn with modal -->
          <ButtonWithModal v-bind="createTaskButton" />
        </v-col>
        <v-col cols="2 mt-3">
          <v-btn>Last 30 days</v-btn>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <!-- list of task -->
      <TaskList v-if="!loading" :filter-tearm="searchTaskInput" :tasks="tasks" @on-task-updated="refreshTaskList"
        @on-update-points="updateTaskPoints" />

    </v-container>
  </v-main>
</template>

<script setup>

import { onMounted, ref, defineProps } from "vue";
import { storeToRefs } from "pinia";
import { useTaskStore } from "@/stores/tasks.store";

import ButtonWithModal from "@/components/button/ButtonWithModal.vue";
import TaskList from "@/components/task/TaskList.vue"
import Task from "@/modals/Task";

const { tasks, loading } = storeToRefs(useTaskStore());
const { loadTasks, refreshTaskList } = useTaskStore();
const props = defineProps({ projectId: String });

// Refs
const searchTaskInput = ref("");


// Mounted hook
onMounted(async () => {
  await loadTasks(props.projectId);
});


// /**
//  * Refresh the task list for the USER
//  * @param {Task} updatedTask - Task to update
//  * @param {updateType} udpate - look for constant file
//  */
// const refreshTaskList = async (updatedTask, udpate) => {

//   const index = tasks.value.findIndex(taks => {
//     return taks._id === updatedTask._id;
//   });

//   // Update task list
//   if (udpate === updateType.remove) {
//     tasks.value.splice(index, 1);
//     return;
//   }

//   // replace existing
//   tasks.value.splice(index, 1, updatedTask);
// }


// Create Task
const createTask = async (task) => {
  const newTask = Task.create(props.projectId, task);

  // check is task was created
  if (newTask) {
    tasks.value.push(newTask);
    return;
  }

  alert("oops, it seems there was a problem creating the task");
};


const updateTaskPoints = async (taskId, updateType) => {
  console.log("Updating task points: ", taskId, updateType);
  // const updatedTask = await secureApi.post(`/projects/task/${taskId}/increment`);
  // emit('on-task-updated', updatedTask.data, updateType.update);
}


// Create Task button
const createTaskButton = ref({
  title: "TASK",
  icon: "mdi-plus",
  action: createTask,
  template: "createTask",
  color: "success",
  variant: "tonal",
});
</script>