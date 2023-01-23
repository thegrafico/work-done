import axios from "axios";
import GlobalError from "@/models/GlobalError";
import { apiBaseUrl, maxRequestTimeOut } from "@/utils/Constants";

// Axios configuration
const config = {
  baseURL: apiBaseUrl,
  timeout: maxRequestTimeOut
}

/**
 * Creating the instance of Axios
 * It is because in large-scale application, we may need
 * to consume APIs from more than a single server,
 */
const publicApi = axios.create(config);


// TODO: Error handle on response?
class Api {
  async get(url) {
    const response = await publicApi.get(url).catch(err => {
      throw new GlobalError(err);
    });
    return response.data;
  }

  async post(url, data) {
    // TODO: Improve the error handly
    const response = await publicApi.post(url, data).catch((err) => {
      throw new GlobalError(err);
    });

    return response.data;
  }

  async login(username, password) {
    const response = await this.post("/login", {
      username,
      password,
    });

    return response;
  }

}

export default new Api();
