import { defineStore } from "pinia";
import { useProjectsStore } from "@/stores/projects.store";
import router from "@/router/index";
import secureApi from "@/api/authApi";


/**
 * Holds information about the current active project
 */
export const useActiveProjectStore = defineStore("activeProject", {
  state: () => ({
    /** @type {boolean} */
    loading: false,

    /** @type {{_id: string, title: string, users: [{_id: string, username, string}], }} */
    project: {},
  }),
  actions: {
    /**
     * @param {{_id: String, users: [], ...}} projectId - id of the current project
     */
    async setActiveProject(projectId) {

      // TODO: remove just for development purposes
      const useProjectFromStore = false;

      if (useProjectFromStore) { 
        this.loadProjectFromStore(projectId);
      } else {  // Load project from the server
        await this.loadProjectFromServer(projectId);
      } 
      

      // this.setActiveProjectUsers(project.users || []);
    },

    loadProjectFromStore(projectId) { 
      // console.log("Loading project from Store...");
      const projects = useProjectsStore();
      this.project =  projects.getProjectById(projectId);

      // if not project is found
      if (!this.project) { 
        router.push("/dashboard");
        return;
      }
    },

    async loadProjectFromServer(projectId) { 
      // console.log("Loading project from server...", projectId);
      
      const response = await secureApi.get(`/projects/${projectId}`).catch(err => {
        console.error("Error getting the project from the server: ", err.message);
      });

      if (response.status !== 200) { 
      // TODO: show global popup error
        return;
      }

      // TODO: create modal for project
      this.project = response.data.project;
    },
  },
  getters: {
    getId(state) { 
      return state.project._id;
    },
    getUsers(state) { 
      return state.project.users;
    }
  }
});
