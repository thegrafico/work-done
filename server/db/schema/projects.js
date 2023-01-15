const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Projects = new Schema(
  {
    owner: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    users: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true }
);

/**
 * Check if a user is allow into the project
 */
Projects.methods.userIsAllow = function(userId) { 
  const isOwner = this.owner.toString() === userId;
  const isCollab = this.users.find(uId => uId == userId);
  return !isOwner || isCollab;
}

module.exports = mongoose.model("Projects", Projects);
