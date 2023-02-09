const TASK_TITLE_MIN_LENGHT = 1;
const TASK_TITLE_MAX_LENGHT = 25;

const TASK_MIN_POINTS = 0;
const TASK_MAX_POINTS = 100;

const invitationType = {
  email: "email",
  username: "username",
};

const invitationStatus = {
  pending: "pending",
  rejected: "rejected",
  accepted: "accepted",
  active: "active",
};

const alertTypes = {
  success: "success",
  warning: "warning",
  info: "info",
  error: "error",
};

module.exports = {
  TASK_TITLE_MIN_LENGHT,
  TASK_TITLE_MAX_LENGHT,
  TASK_MIN_POINTS,
  TASK_MAX_POINTS,
  invitationType,
  invitationStatus,
  alertTypes,
};
