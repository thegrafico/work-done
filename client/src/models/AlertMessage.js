import { alertTypes } from "@/utils/Constants";

class AlertMessage {
  constructor(message, type) {
    this.message = message;

    // by default show wrning if not show what alert was.
    this.type = !(alertTypes in alertTypes) ? alertTypes.warning : type;
  }
}

export default AlertMessage;
