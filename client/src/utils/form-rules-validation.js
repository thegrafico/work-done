const projectTitleRule = [
  (v) => !!v || "Name is required",
  (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
];

const projectDescriptionRule = [
  (v) => !!v || "Description is required",
  (v) => (v && v.length <= 30) || "Description must be less than 30 characters",
];

const taskRules = {
  name: [
    (v) => !!v || "Name is required",
    (v) => (v && v.length <= 25) || "Name must be less than 25 characters",
  ],
  points: [
    (v) => !!v || "Points are required",
    (v) => isNumeric(v) || "Only numbers allowed",
  ],
  description: [],
};

function isNumeric(str) {
  if (typeof str === "number") return true;

  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

module.exports = {
  projectTitleRule,
  projectDescriptionRule,
  taskRules,
};
