const mongoose = require("mongoose");

async function connectMONGODB() {
  try {
    await mongoose.connect("mongodb://localhost/Product-manager");
    console.log("###########################################");
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("###########################################");
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = { connectMONGODB };
