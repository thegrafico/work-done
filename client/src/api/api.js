import axios from "axios";

// TODO: Error handle on response?
export default class Api {
  // `message` will not be reactive value
  message = undefined;

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
}
