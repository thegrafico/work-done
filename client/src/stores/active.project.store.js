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
      if (!projectId) { 
        console.log("Resetting active project");
        this.project = {};
        return;
      }

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
      this.project = projects.getProjectById(projectId);     
      
      // if not project is found
      if (!this.project) {
        router.push("/dashboard");
        return;
      }
    },

    async loadProjectFromServer(projectId) {
      console.log("Loading project from server...", projectId);
      this.loading = true;
      const response = await secureApi.get(`/projects/${projectId}`).catch(err => {
        console.error("Error getting the project from the server: ", err.message);
      });
      this.loading = false;

      if (response.status !== 200) {
        // TODO: show global popup error
        return;
      }

      // TODO: create modal for project
      this.project = response.data.project;

      // TODO: remove
      this.setDummyUsers();

    },

    async loadProjectUsers() {
      this.loading = true;

      const projectUsersResponse = await secureApi.get(`/projects/${this.getId}/users`).catch(err => {
        console.error("Error loading project users: ", err);
      });

      this.loading = false;

      if (projectUsersResponse.status !== 200) {
        alert("Oops! Something went wrong loading the users for the project.");
        return;
      }

      this.project.users = projectUsersResponse.data.users;

    },

    async sendInvitation(invitation) {

      const request = {
        username: invitation.to,
        email: null
      }
      this.loading = true;

      const response = await secureApi.post(`/projects/${this.getId}/sendInvitation`, request).catch(err => {
        console.error("Error sending the invitation: ", err.message);
      });
      this.loading = false;

      if (response.status !== 200) {
        alert("Oops! Something went wrong sending the invitation. Pleasy try later.");
        return false;
      }

      return true;
    },

    setDummyUsers() {
      this.project.users = [
        { "_id": "123", "username": "user@example.com", "status": "active", "creationDate": "01/04/2023", "totalPoints": 10 },
        { "_id": "1234", "username": "user2@example.com", "status": "active", "creationDate": "01/05/2023", "totalPoints": 101 },
        { "_id": "1235", "username": "user3@example.com", "status": "inactive", "creationDate": "12/20/2023", "totalPoints": 90 },
        { "_id": "1263", "username": "user4@example.com", "status": "active", "creationDate": "03/02/2023", "totalPoints": 5 }]
    }
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
