const express = require("express");
const guests = require("../routes/guests");
const hotels = require("../routes/hotels")
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error")
module.exports = function(app) {
  app.use(express.json());
  app.use("/api/guests", guests);
  app.use("/api/hotels", hotels);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
