const mongoose = require("mongoose");
const auth = require("../../utils/auth");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const User = new Schema(
  {
    name: { type: String, default: null },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    creationDate: { type: Date, default: Date.now },
    allowProjectInvitations: { type: Boolean, default: false },
  },
  { timestamps: true }
);

User.methods.authenticate = async function (password) {
  console.log(
    "Checking pass: ",
    this.password,
    password,
    this.password === password
  );
  return this.password === password;
};

User.statics.findUserByCredentials = async function (username, password) {
  const user = await this.findOne({
    username: username,
    password: password,
  }).lean();
  if (user) {
    user["accessToken"] = auth.generateAccessToken(user._id);
  }
  return user;
};

User.statics.findUserByUsername = async function (username) {
  const user = await this.findOne({ username: username });

  return user;
};

// TODO: finish this
User.statics.findUserByEmail = async function (username) {
  const user = await this.findOne({ username: username });

  return user;
};

// a setter
// User.path("name").set(function (v) {
//   return capitalize(v);
// });

module.exports = mongoose.model("User", User);
