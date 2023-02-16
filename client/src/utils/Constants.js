
const dashboardSideBarOptions = [
  ["mdi-inbox-arrow-down", "Projects"],
  ["mdi-send", "Messages"],
  ["mdi-delete", "Trash"],
  ["mdi-cog-outline", "Config"],
];

const projectSideBarOptions = [
  ["mdi-calendar-check-outline", "Task", 'task'],
  ["mdi-chart-bell-curve", "Analytics", 'analytics'],
  ["mdi-account-group", "Collabs", 'collabs'],
  ["mdi-cellphone-cog", "Config", 'config'],
];

const headerBarOptions = [
    ["mdi-account-box-outline", "Profile", '/profile'],
    ["mdi-cog-outline", "Config", '/config'],
    ["mdi-logout", "Logout", '/logout'],
  ];

const sideOptions = {
    "dashboard": dashboardSideBarOptions,
    "project": projectSideBarOptions,
    "header": headerBarOptions
}

/**
 * I dont remember if I'm using this since I created the pinia store managment 
 */
const updateType = {
  "create": "create",
  "remove": "remove",
  "update": "update",
}


/**
 * The alert template that I'm using has a v-bind property for the type.
 * Dependeing the type, the color changes. The link below can be used as 
 * reference: https://next.vuetifyjs.com/en/components/alerts/
 */
const alertTypes = {
  "success": "success",
  "warning": "warning",
  "info": "info",
  "error": "error"
}

const invitationType = {
  "email": "email",
  "username": "username"
}

const invitationStatus = { 
  "pending": "pending",
  "rejected": "rejected",
  "accepted": "accepted"
};

const notificationTypes = {
  projectInvitation: "projectInvitation",
};

const apiBaseUrl = 'http://localhost:3000/api/';
const maxRequestTimeOut = 5000; // 5 seconds
const alertWaitTime = 300; // wait 300 milisecods to show the alert
const alertMaxTime = 5000 + alertWaitTime; // the wait time the alert is shown to the user

module.exports = {
  dashboardSideBarOptions,
  projectSideBarOptions,
  headerBarOptions,
  sideOptions,
  updateType,
  alertTypes,
  apiBaseUrl,
  maxRequestTimeOut,
  alertWaitTime,
  alertMaxTime,
  invitationType,
  invitationStatus,
  notificationTypes
};
