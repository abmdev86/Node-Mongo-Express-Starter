const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  mongoose.set("strictQuery", false); // supresss DeprecationWarning for Mongoose 6 to 7
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas");
      console.error(error);
    });
}

module.exports = dbConnect;
