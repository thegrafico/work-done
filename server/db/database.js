const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connect() {
  const options = {
    // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  };

  mongoose.set("strictQuery", false);
  console.log("Connecting to mongodb...");

  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  // await mongoose.connect("mongodb://mongo:27017/workd-done");

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  //TODO: [DELETE THIS] delete all databse information for now
  // const collections = await db.db.listCollections().toArray();
  // // Loop through all collection names and delete them
  // collections.forEach((collection) => {
  //   db.dropCollection(collection.name, (err) => {
  //     if (err) console.log(err);
  //     else console.log(`Deleted collection: ${collection.name}`);
  //   });
  // });
  return db;
}

module.exports = {
  connect,
};
