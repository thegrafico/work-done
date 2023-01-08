const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: { type: String, require: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  creationDate: { type: Date, default: Date.now },
});

User.statics.login = async function (user, password) {
  return this.findOne({ username: user, password: password });
};

// a setter
// User.path("name").set(function (v) {
//   return capitalize(v);
// });

module.exports = mongoose.model("User", User);
