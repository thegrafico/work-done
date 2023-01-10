const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connect() {

  const options = {
    // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  };

  mongoose.set("strictQuery", false);

  await mongoose.connect(process.env.DB_CONNECTION_STRING);

  const db = mongoose.connection;

  db.on('error',console.error.bind(console, 'connection error:'));
}


module.exports = { 
    connect
}
