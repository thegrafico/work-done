import { alertTypes } from "@/utils/Constants";
class GlobalError extends Error {
  constructor(errorResponse) {
    if (errorResponse.response) {
      super(errorResponse.response.data.message);
      this.type = errorResponse.response.data.type || alertTypes.error;
      this.status = errorResponse.response.status;
    } else {
      super(errorResponse.message);
      this.type = alertTypes.error;
      this.status = 400; // BAD REQUEST
    }
  }
}

export default GlobalError;
