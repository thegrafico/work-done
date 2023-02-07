import { defineStore } from "pinia";
import secureApi from "@/api/authApi";

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: [],
    loading: false,
  }),
  actions: {

    /**
     * Load user projects list for the dashboard page.
     * @returns 
     */
    async loadProjects() {
      this.projects = [];
      this.loading = true;

      const response = await secureApi.get("/projects");

      this.loading = false;
      if (!response.data) {
        console.error("Oops! Something went wrong");
        return;
      }

      this.projects = response.data;
    },

    async createProject(projectData) {
      this.loading = true;
      const newProject = await secureApi
        .post("/createProject", projectData)
        .catch((err) => {
          console.error("Error creating project: ", err);
        });

      this.loading = false;
      if (newProject) {
        this.projects.push(newProject.data.project);
        console.log("New project added");
      }
    },

    async removeProject(projectId) { 
      await secureApi.delete(`/deleteProject/${projectId}`);

      await this.loadProjects();
    },

    async updateProject(update) {
      const updatedProjectResponse = await secureApi.post("updateProject", update).catch((err) => {
        console.log("Error updating project: ", err);
      });

      // Not new project found
      if (!updatedProjectResponse.data) {
        console.error("Project not found: ", updatedProjectResponse);
        return;
      }

      // getting the new updated project
      const updatedProject = updatedProjectResponse.data;

      // get the index of the old project
      const outDatedProjectIndex = this.projects.findIndex(project => {
        return project._id === updatedProject._id;
      });


      if (outDatedProjectIndex === -1) {
        console.error("Index not found for the updated project: ", updatedProject);
        return;
      }

      // replace previus project with new one
      this.projects.splice(outDatedProjectIndex, 1, updatedProject);
      await this.loadProjects();

    },


    /**
     * Load a project by id from the server and refresh is data withing the current project store
     * @param {string} projectId 
     */
    async loadProjectById(projectId) { 
      this.loading = true;

      const response = await secureApi.get(`/projects/${projectId}`);
      this.loading = false;

      console.log(response);
    },

    // TODO:
    async shareProject() { console.log("TODO SHARING PROJECTS");},

  },
  getters: { 

    /**
     * Get a project by id from the store
     * @param {Object} state 
     * @returns {Object} - project
     */
    getProjectById: (state) => {
      return (projectId) => state.projects.find((project) => project._id === projectId)
    }
  }
});
