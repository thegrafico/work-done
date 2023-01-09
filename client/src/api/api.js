import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

// TODO: Error handle on response?
class Api {

  async get (url) { 
    const response = await axios.get(url);
    return response.data;
  }

  async post (url, data) { 

    // TODO: Improve the error handly
    let error = null;
    const response = await axios.post(url, data).catch( err => { 
        error = err;
    });

    if (error) {
        console.log(error.response);
        return error.response;
    }

    return response.data;
  }

  async login(username, password) { 
    const response =  await this.post("http://localhost:3000/login", {username, password});
    
    if (response.error) { 
        console.error("Error login the user: ", response.error);
        return {};
    }
    
    return response;
  }

  async getUserProjects(user) { 

    const config = {
      headers: {
        Authorization : `Bearer ${user.getItem("access_token")}`
      }
    }
    
    const response =  await this.post("http://localhost:3000/login", {username, password});

    console.log("user: ", user);
  }
}

export default new Api();