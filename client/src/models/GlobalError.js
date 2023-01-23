import { alertTypes } from "@/utils/Constants"
class GlobalError extends Error {

  constructor(errorResponse) {
    if (errorResponse.response) {
      super(errorResponse.response.message);
      this.type = errorResponse.response.type;
    } else {
      super(errorResponse.message)
      this.type = alertTypes.error
    }

  }

}

export default GlobalError;
