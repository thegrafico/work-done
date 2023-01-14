

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

module.exports = {
  dashboardSideBarOptions,
  projectSideBarOptions,
  headerBarOptions,
  sideOptions
};
