import { defineStore } from "pinia";

// import router from '@/router/index';

export const useActiveProjectStore = defineStore("projects", {
  state: () => ({
    projects: [],
    loading: false,
    activeProjectId: undefined,
  }),
  actions: {
    setActiveProject(projectId) {
      console.log("Setting active project: ", projectId);
      this.activeProjectId = projectId;
    },
  },
});