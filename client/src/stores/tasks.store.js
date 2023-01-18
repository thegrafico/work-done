import { defineStore } from "pinia";
import { updateType } from "@/utils/Constants";
import { useAuthStore } from "./auth.store";
import Task from "@/modals/Task";
import secureApi from "@/api/authApi";
// import router from '@/router/index';

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  actions: {
    async loadTasks(projectId) {
      // reset just in case
      this.tasks = [];
      this.loading = true;
      const projectTask = await secureApi.get(`/projects/${projectId}/tasks`);
      this.loading = false;

      if (!projectTask || !projectTask.data || !projectTask.data.tasks)
        return [];

      this.tasks = projectTask.data.tasks.map((task) => new Task(task));
    },
    async refreshTaskList(taskToUpdate, taskUpdateType) {
      const index = this.tasks.findIndex((taks) => {
        return taks._id === taskToUpdate._id;
      });

      // Update task list
      if (taskUpdateType === updateType.remove) {
        this.tasks.splice(index, 1);
        return;
      }

      // replace existing
      this.tasks.splice(index, 1, taskToUpdate);
    },
    async incrementUserPoints(taskId) {
      const updatedTask = await secureApi.post(
        `/projects/task/${taskId}/increment`
      );

      if (updatedTask && updatedTask.data) {
        await this.refreshTaskList(updatedTask.data);
      }
    },
    async decrementUserPoints(taskId) {
      const updatedTask = await secureApi.post(
        `/projects/task/${taskId}/decrement`
      );

      if (updatedTask && updatedTask.data) {
        await this.refreshTaskList(updatedTask.data);
      }
    },
    async addMyPointsToTasks() {
      const {user} = useAuthStore();
      // check if points are empty
      if (!this.tasks.points.length) {
        return 0;
      }

      // this.tasks = this.tasks.map(task => {})

      const myPoints = this.tasks.points.find(
        (userPoints) =>
          userPoints.userId.toString() === user._id.toString()
      );

      if (myPoints && myPoints.value) {
        return myPoints.value;
      }

      return 0;
    },
  },
  getters: {
    myPoints: (state) => {
      // check if there is an user
      if (!user.value || !user.value._id) {
        console.error("Sorry, cannot get yours points now");
        return 0;
      }

      // check if there is points
      if (!Array.isArray(taskPoints)) {
        console.error("Error: Points seems to be damaged");
        return 0;
      }

      // check if points are empty
      if (!taskPoints.length) {
        return 0;
      }

      const myPoints = taskPoints.find(
        (userPoints) =>
          userPoints.userId.toString() === user.value._id.toString()
      );

      if (myPoints && myPoints.value) {
        return myPoints.value;
      }

      return 0;
    },
  },
});
