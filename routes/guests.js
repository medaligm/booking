const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Guest, validate } = require("../models/guest");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const guests = await Guest.find().sort("firstName");
  res.send(guests);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let guest = new Guest({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  guest = await guest.save();

  res.send(guest);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const guest = await Guest.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      isGold: req.body.isGold,
      gender: req.body.gender,
      phone: req.body.phone
    },
    { new: true }
  );
  if (!guest)
    return res.status(404).send("the guest with the given id was not found.");

  res.send(guest);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const guest = await Guest.findByIdAndRemove(req.params.id);
  if (!guest)
    return res.status(404).send("The guest with the given ID was not found.");

  res.send(guest);
});

router.get("/:id", async (req, res) => {
  const guest = await Guest.findById(req.params.id);
  if (!guest)
    return res.status(404).send("The guest with the given ID was not found.");

  res.send(guest);
});

module.exports = router;
