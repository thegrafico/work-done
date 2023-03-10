import { defineStore } from "pinia";
import Task from "@/models/Task";
import secureApi from "@/api/authApi";
import { useActiveProjectStore } from "@/stores/active.project.store";
// import router from '@/router/index';

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  actions: {
    async loadTasks() {
      const activeProjectStore = useActiveProjectStore();
      const projectId = activeProjectStore.getId;

      // reset just in case
      this.tasks = [];
      this.loading = true;
      const projectTask = await secureApi.get(`/projects/${projectId}/tasks`);
      this.loading = false;

      if (!projectTask || !projectTask.data || !projectTask.data.tasks)
        return [];

      this.tasks = projectTask.data.tasks.map((task) => new Task(task));
    },

    async loadTaskWithAnalytics() {
      const projectId = this.getProjectId;

      // reset just in case
      this.tasks = [];
      this.loading = true;
      const response = await secureApi.get(
        `/projects/${projectId}/tasksAnalytics`
      );
      this.loading = false;

      if (!response || !response.data || !response.data.tasks) return [];

      this.tasks = response.data.tasks.map((task) => new Task(task));
    },

    async createTask(taskData) {
      const projectId = this.getProjectId;

      const response = await secureApi.post(
        `/projects/${projectId}/task/create`,
        taskData
      );
      const newTask = response.data;

      // check is task was created
      if (newTask && newTask._id) {
        //   tasks.value.push(newTask);
        this.tasks.push(new Task(newTask));
        return;
      }

      alert("Oops, There was a problem creating the task");
    },

    async updateTask(updatedTask) {
      const projectId = this.getProjectId;

      const response = await secureApi.post(
        `/projects/${projectId}/task/update`,
        updatedTask
      );
      const newTask = response.data;

      // check is task was created
      if (newTask && newTask._id) {
        this.refreshTaskList(new Task(newTask));
        return;
      }

      alert("Oops, There was a problem updating the task");
    },

    // TODO: change url to have project id
    async removeTask(taskId) {
      const taskWasRemoved = await secureApi.delete(
        `/projects/tasks/${taskId}`
      );

      if (taskWasRemoved.status === 200) {
        // in order to work need to pass the _id parameter
        const index = this.tasks.findIndex((taks) => {
          return taks._id === taskId;
        });

        this.tasks.splice(index, 1);
      }
    },

    async refreshTaskList(taskToUpdate) {
      const index = this.tasks.findIndex((taks) => {
        return taks._id === taskToUpdate._id;
      });

      // replace existing
      this.tasks.splice(index, 1, taskToUpdate);
    },

    // TODO: change url to have project id
    async incrementUserPoints(taskId) {
      const updatedTask = await secureApi.post(
        `/projects/task/${taskId}/increment`
      );

      if (updatedTask && updatedTask.data) {
        await this.refreshTaskList(new Task(updatedTask.data));
      }
    },

    // TODO: change url to have project id
    async decrementUserPoints(taskId) {
      const updatedTask = await secureApi.post(
        `/projects/task/${taskId}/decrement`
      );

      if (updatedTask && updatedTask.data) {
        await this.refreshTaskList(new Task(updatedTask.data));
      }
    },
  },
  getters: {
    getProjectId() {
      const activeProjectStore = useActiveProjectStore();
      return activeProjectStore.getId;
    },
  },
});
