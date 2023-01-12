const projectTitleRule = [
  (v) => !!v || "Name is required",
  (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
];

const projectDescriptionRule = [
  (v) => !!v || "Description is required",
  (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
];

module.exports = {
  projectTitleRule,
  projectDescriptionRule,
};
