const express = require("express");
const guests = require("../routes/guests");
const error = require("../middleware/error")
module.exports = function(app) {
  app.use(express.json());
  app.use("/api/guests", guests);
  app.use(error);
};
