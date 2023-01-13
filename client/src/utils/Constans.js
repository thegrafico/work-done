

const dashboardSideBarOptions = [
  ["mdi-inbox-arrow-down", "Projects"],
  ["mdi-send", "Messages"],
  ["mdi-delete", "Trash"],
  ["mdi-cog-outline", "Config"],
];

const projectSideBarOptions = [
  ["mdi-calendar-check-outline", "Task", '/task'],
  ["mdi-chart-bell-curve", "Analytics", '/analytics'],
  ["mdi-account-group", "Collabs", '/collab'],
  ["mdi-cellphone-cog", "Config", '/config'],
];

const sideOptions = {
    "dashboard": dashboardSideBarOptions,
    "project": projectSideBarOptions,
}

module.exports = {
  dashboardSideBarOptions,
  projectSideBarOptions,
  sideOptions
};
