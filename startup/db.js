const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect("mongodb://localhost/myBooking", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => winston.info("Connected to MongoDB..."));
};