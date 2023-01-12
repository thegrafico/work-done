const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Projects = new Schema({
  owner: { type: String, require: true},
  title: { type: String, require: true },
  description: { type: String, default: '' },
  creationDate: { type: Date, default: new Date() },
  users: {type: Array, default: []}
});

module.exports = mongoose.model("Projects", Projects);
