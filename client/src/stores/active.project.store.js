import { defineStore } from "pinia";
import { useProjectsStore } from "@/stores/projects.store";
import { useAuthStore } from "./auth.store";
import { useAlertMessageStore } from "./alert.message.store";
import router from "@/router/index";
import secureApi from "@/api/authApi";
import { alertTypes } from "@/utils/Constants";

/**
 * Holds information about the current active project
 */
export const useActiveProjectStore = defineStore("activeProject", {
  state: () => ({
    /** @type {{_id: string, title: string, users: [{_id: string, username, string}], }} */
    project: {},

    /** @type {[{_id: string, username: string, creationDate: Date }]} */
    users: [],

    /** @type {boolean} */
    loadingUsers: false,

    /** @type {boolean} */
    loadingProject: false,

    /** @type {boolean} */
    isProjectOwner: false,
  }),
  actions: {
    /**
     * Set the active project
     * @param {String} projectId - id of the current project
     * @param {Boolean} activeProject - you can load the project from the store or the server
     */
    async setActiveProject(projectId, loadFromStore = false) {
      if (!projectId) {
        this.project = {};
        return;
      }

      if (loadFromStore) {
        this.loadProjectFromStore(projectId);
      } else {
        // Load project from the server
        await this.loadProjectFromServer(projectId);
      }

      const authStore = useAuthStore();
      this.isProjectOwner = authStore.getUserId === this.project.owner;
    },

    loadProjectFromStore(projectId) {
      this.loadingProject = true;
      const projects = useProjectsStore();
      this.project = projects.getProjectById(projectId);
      this.loadingProject = false;

      // if not project is found
      if (!this.project) {
        router.push("/dashboard");
        return;
      }
    },

    async loadProjectFromServer(projectId) {
      this.loadingProject = true;
      const response = await secureApi
        .get(`/projects/${projectId}`)
        .catch((err) => {
          console.error(
            "Error getting the project from the server: ",
            err.message
          );
        });
      this.loadingProject = false;

      if (response.status !== 200) {
        // TODO: show global popup error
        return;
      }

      // TODO: create modal for project
      this.project = response.data.project;
    },

    async loadProjectUsers() {
      if (!this.getId) {
        return;
      }

      this.loadingUsers = true;

      const usersResponse = await secureApi.get(
        `/projects/${this.getId}/users`
      );
      this.loadingUsers = false;
      // bad response
      if (!usersResponse || !usersResponse.data) {
        this.users = [];
        return;
      }

      this.users = usersResponse.data.users;
    },

    async sendInvitation(invitation) {
      const alertMessage = useAlertMessageStore();

      const request = {
        username: invitation.to,
        email: null,
      };
      this.loading = true;

      const response = await secureApi.post(
        `/projects/${this.getId}/sendInvitation`,
        request
      );

      this.loading = false;

      if (!response || !response.data || !response.data.invitation) {
        return;
      }

      alertMessage.show({
        message: response.data.message,
        type: response.data.type,
      });

      // add user to list
      this.users.push(response.data.user);
    },

    async cancelInvitation(userId) {
      const alertMessage = useAlertMessageStore();

      // check if there is an userId
      if (!userId) {
        alertMessage.show({
          message:
            "Oops, there is something wrong with the user. Please refresh or try later.",
          type: alertTypes.error,
        });
        return;
      }

      this.loadingUsers = true;

      const response = await secureApi.post(
        `/projects/${this.getId}/cancelInvitation`,
        { userId: userId }
      );

      this.loadingUsers = false;

      // check if a response was received
      if (!response) {
        alertMessage.show({
          message:
            "Oops, there was something wrong canceling the invitation. Please refresh or try later.",
          type: alertTypes.error,
        });
        return;
      }

      // show success message
      alertMessage.show({
        message: response.data.message,
        type: response.data.type,
      });

      // update the user list
      this.users = this.users.filter((user) => {
        return user._id.toString() !== userId;
      });
    },

    /**
     * Update the project information
     * @param {{title: string, description: string}} update
     */
    async updateProjectConfig(update) {
      const { updateProject } = useProjectsStore();

      // add project Id to the request
      update["projectId"] = this.getId;

      await updateProject(update);

      this.loadProjectFromStore(update.projectId);
    },
  },
  getters: {
    getId(state) {
      return state.project._id;
    },
    getUsers(state) {
      return state.project.users;
    },
    getTitle(state) {
      return state.project.title;
    },
  },
});
