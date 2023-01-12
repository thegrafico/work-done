import axios from "axios";

// TODO: Error handle on response?
class Api {
  async get(url) {
    const response = await axios.get(url);
    return response.data;
  }

  async post(url, data) {
    // TODO: Improve the error handly
    let error = null;
    const response = await axios.post(url, data).catch((err) => {
      error = err;
    });

    if (error) {
      console.log(error.response);
      return error.response;
    }

    return response.data;
  }

  async login(username, password) {
    const response = await this.post("http://localhost:3000/login", {
      username,
      password,
    });

    if (response.error) {
      console.error("Error login the user: ", response.error);
      return {};
    }

    return response;
  }

  // TODO: refactor
  async getUserProjects(user) {
    const config = {
      headers: {
        Authorization: `Bearer ${user["accessToken"]}`,
      },
    };
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/projects",
      headers: config.headers,
    });

    return response.data;
  }

  async deleteAll(user) {
    const config = {
      headers: {
        Authorization: `Bearer ${user["accessToken"]}`,
      },
    };
    await axios({
      method: "post",
      url: "http://localhost:3000/api/deleteAll",
      headers: config.headers,
      data: null,
    });
  }

  async updateProject(title, description, projectId, user) {
    const config = {
      headers: {
        Authorization: `Bearer ${user["accessToken"]}`,
      },
    };
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/updateProject",
      headers: config.headers,
      data: {
        title,
        description,
        projectId,
      },
    });

    return response.data;
  }

  // TODO: refactor
  async createProject(project, user) {
    const config = {
      headers: {
        Authorization: `Bearer ${user["accessToken"]}`,
      },
    };
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/createProject",
      headers: config.headers,
      data: project,
    });

    return response.data;
  }
}

export default new Api();
