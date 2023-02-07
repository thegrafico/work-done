import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { apiBaseUrl, maxRequestTimeOut } from '@/utils/Constants';

// Axios configuration
const config = {
  baseURL: apiBaseUrl,
  timeout: maxRequestTimeOut,
}

/**
 * Creating the instance of Axios
 * It is because in large-scale application, we may need
 * to consume APIs from more than a single server,
 */
const secureApi = axios.create(config);


// Interceptoor for authorization
secureApi.interceptors.request.use((config) => {
  // console.log("Seding Auth Request");
  const authStore = useAuthStore();
  const token = authStore.userToken;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor for Response 
secureApi.interceptors.response.use((response) => {
  return Promise.resolve(response);
}, (error) => {
  // console.log("Error on response: ", error)

  if (error.response && error.response.status === 401 || error.response.status === 403) {
    const authStore = useAuthStore();
    authStore.logout()
    return;
  }

  throw error
});

export default secureApi;