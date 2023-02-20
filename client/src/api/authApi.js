import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { apiBaseUrl, maxRequestTimeOut } from "@/utils/Constants";
import { useAlertMessageStore } from "@/stores/alert.message.store";
import { alertTypes } from "@/utils/Constants";

// Axios configuration
const config = {
  baseURL: apiBaseUrl,
  timeout: maxRequestTimeOut,
};

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
secureApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    console.log("Error on response: ", error);
    const alertMessage = useAlertMessageStore();

    // Timeout error
    if (error.code && error.code === "ECONNABORTED") {
      alertMessage.show({
        message: `Timeout: ${error.message}`,
        type: alertTypes.error,
      });
      return;
    }

    // Show global errors from response
    if (error.response && error.response.data && error.response.data.message) {
      console.log("oops, something went bad: ", error.message);

      if (error.response.status === 403) {
        const authStore = useAuthStore();
        authStore.logout();
      }

      alertMessage.show({
        message: error.response.data.message,
        type: error.response.data.type || "error",
      });

      return;
    }

    throw error;
  }
);

export default secureApi;
