const mongoose = require("mongoose");
const auth = require("../../utils/auth");


const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: { type: String, require: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  creationDate: { type: Date, default: Date.now },
});

User.statics.findUserByCredentials = async function (username, password) {
  const user = await this.findOne({ username: username, password: password }).lean();
  
  if (user) { 
    user['accessToken'] = auth.generateAccessToken(user.username);
  }
  return user;
};

// a setter
// User.path("name").set(function (v) {
//   return capitalize(v);
// });

module.exports = mongoose.model("User", User);
