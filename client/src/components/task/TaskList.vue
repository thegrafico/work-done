<template>

  <div class="overflow-y-auto px-4" style="max-height: 70vh;">
    <v-row class="pt-4" v-if="filteredList.length > 0">
      <v-col cols="3" v-for="task in filteredList" :key="task._id">
        <v-sheet elevation="8">
          <v-card class="mx-auto">

            <v-toolbar color="rgb(0,0,0,0)">
              <v-toolbar-title>
                <h5>
                  {{ task.title }}
                </h5>
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
                      {{ task.myPoints || 0 }}
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
            <TaskButton :task-id="task._id" :task-value="task.value" :user-points="task.myPoints" />
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- In case there is not project created yet -->
    <v-row v-if="!props.tasks.length" class="pt-4">
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
import { onBeforeUpdate, defineProps, ref, onMounted } from "vue";
import { filterArray } from "@/utils/Helpers";
import { useTaskStore } from "@/stores/tasks.store";
import TaskButton from "@/components/button/TaskButton.vue";
import ButtonWithModal from "../button/ButtonWithModal.vue";

const { removeTask, updateTask } = useTaskStore();

const props = defineProps({
  tasks: Array,
  filterTearm: String,
});

const filteredList = ref([]);


onMounted(() => {
  filteredList.value = filterArray(props.tasks, props.filterTearm);
});


onBeforeUpdate(async () => {
  filteredList.value = filterArray(props.tasks, props.filterTearm);
});

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

</script>