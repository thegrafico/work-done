class Notification {
  constructor(from, message, type, projectId, actions) {
    this.from = from;
    this.message = message;
    this.type = type;
    this.actions = actions;
    this.projectId = projectId;
  }
}

export default Notification;
