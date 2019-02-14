module.exports = {
  connectDB: () => {
    return new Promise((resolve, reject) => {
      const mongoose = require("mongoose");
      const DB_URL = process.env.DB_URL;
      console.log("DB URL : " + DB_URL);
      mongoose.connect(DB_URL, { useNewUrlParser: true });
      mongoose.connection.on("connected", function() {
        resolve();
        console.log("Connected to MongoDB");
      });
      mongoose.connection.on("error", function() {
        reject();
        console.log("Error Connecting Mongo");
      });
      mongoose.connection.on("disconnected", function() {
        console.log("Disconnected from mongoDB");
      });
      process.on("SIGINT", function() {
        mongoose.connection.close(function() {
          console.log("Mongo Connection Closed");
          process.exit(0);
        });
      });
    });
  }
};
