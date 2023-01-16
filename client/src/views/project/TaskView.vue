<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="12">
          <h1>{{ title }}</h1>
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
      <TaskList v-if="dataIsLoaded" :filter-tearm="searchTaskInput" :tasks="tasks" @on-task-updated="refreshTaskList" />

    </v-container>
  </v-main>
</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";
import ButtonWithModal from "@/components/button/ButtonWithModal.vue";
import TaskList from "@/components/task/TaskList.vue"
import secureApi from "@/api/authApi";
import { useAuthStore } from "@/stores/auth.store";
const title = "Task";

const props = defineProps({
  projectId: String
});

// Refs
const searchTaskInput = ref("");
const tasks = ref([]);
const dataIsLoaded = ref(false);
const user = ref(null);

// Get project task
const getTask = async () => {
  dataIsLoaded.value = false;
  const projectTask = await secureApi.get(`/projects/${props.projectId}/tasks`);
  dataIsLoaded.value = true;
  if (!projectTask || !projectTask.data || !projectTask.data.tasks) return [];

  return projectTask.data.tasks;
};

// Create Task
const createTask = async (task) => {
  const response = await secureApi.post(`/projects/${props.projectId}/task/create`, task);
  const newTask = response.data;

  // check is task was created
  if (newTask && newTask._id) {

    tasks.value.push(newTask);
    return;
  }

  alert("oops, it seems there was a problem creating the task");
};


// Mounted hook
onMounted(async () => {

  const useStore = useAuthStore();
  user.value = useStore.user;

  // Load tasks
  tasks.value = await getTask();

  // reset loaded state
  dataIsLoaded.value = true;
});


const refreshTaskList = async (updatedTask, updateType) => {

  const index = tasks.value.findIndex(taks => {
    return taks._id === updatedTask._id;
  });

  // Update task list

  if (updateType === 'remove') { 
    tasks.value.splice(index, 1);
    return;
  }
  
  // replace existing
  tasks.value.splice(index, 1, updatedTask);
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