import { defineStore } from "pinia";

// import router from '@/router/index';

export const useActiveProjectStore = defineStore("activeProject", {
  state: () => ({
    loading: false,
    id: undefined,
  }),
  actions: {
    setActiveProject(projectId) {
      console.log("Setting active project: ", projectId);
      this.id = projectId;
    },
  },
});
