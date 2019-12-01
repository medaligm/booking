const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Hotel, validate } = require("../models/hotel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const hotels = await Hotel.find().sort("name");
  res.send(hotels);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let hotel = new Hotel({ name: req.body.name, stars: req.body.stars });
  hotel = await hotel.save();
  res.send(hotel);
});


router.put("/:id", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, stars: req.body.stars },
      { new: true }
    );
    if (!hotel)
      return res.status(404).send("The hotel with the given id was not found.");
    res.send(hotel);
  });
  
  router.delete("/:id", [auth, admin], async (req, res) => {
    const hotel = await Hotel.findByIdAndRemove(req.params.id);
    if (!hotel)
      return res.status(404).send("The hotel with the given id was not found.");
    res.send(hotel);
  });
  
  router.get("/:id", async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel)
      return res.status(404).send("The hotel with the given id was not found.");
    res.send(hotel);
  });
  
  module.exports = router;