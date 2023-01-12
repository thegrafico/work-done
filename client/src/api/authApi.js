import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

// Move to env variable
const apiBaseUrl = 'http://localhost:3000/api/';

// Axios configuration
const config = {
  baseUrl: apiBaseUrl
}

/**
 * Creating the instance of Axios
 * It is because in large-scale application, we may need
 * to consume APIs from more than a single server,
 */
const secureApi = axios.create(config);

const authInterceptor = config => {
  const authStore = useAuthStore();
  const token = authStore.getToken();
  config.headers.Authorization = `Bearer ${token}`
  config.headers.common.Accept = 'Application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'
  return config
}


/**
 * Logger interceptors
 * @description Log app requests.
 * @param {*} config
 */
const loggerInterceptor = config =>
  /** Add logging here */
  config

/** Adding the request interceptors */
secureApi.interceptors.request.use(authInterceptor);
secureApi.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
secureApi.interceptors.response.use(
  response => Promise.resolve(response),
  error => {
    const authStore = useAuthStore();
    Event.$emit('error', 500, error.response.data.message)
    if (error.response.status === 401) authStore.logout()
    const errorMessage = error.response.data.message
    error.response.data.message = errorMessage.length > 200
      ? JSON.parse(errorMessage.split('code :').pop()).error.message.split(':')[0]
      : errorMessage
    throw error
    // Promise.reject(error)
  }
);

export default secureApi