const { Room, validate } = require("../models/room");
const { Hotel } = require("../models/hotel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rooms = await Room.find().sort("name");
  res.send(rooms);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const hotel = await Hotel.findById(req.body.hotelId);
  if (!hotel) return res.status(400).send("invalid hotel");

  const room = new Room({
    hotel: {
      _id: hotel._id,
      name: hotel.name,
      stars: hotel.stars
    },
    numberRoom: req.body.numberRoom,
    dailyBookingRate: req.body.dailyBookingRate
  });
  room = await room.save();
  res.send(room);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const hotel = await Hotel.findById(req.body.hotelId);
  if (!hotel) return res.status(400).send("invalid hotel");

  const room = await Room.findByIdAndUpdate(
    req.params.id,
    {
      hotel: {
        _id: hotel._id,
        name: hotel.name,
        stars: hotel.stars
      },
      numberRoom: req.body.numberRoom,
      dailyBookingRate: req.body.dailyBookingRate
    },
    { new: true }
  );
  if (!room) res.status(404).send("the room with the given id was not found.");
  res.send(room);
});

router.delete("/:id", async (req, res) => {
  const room = await Room.findByIdAndRemove(req.params.id);

  if (!room)
    return res.status(404).send("The room with the given ID was not found.");

  res.send(room);
});

router.get("/:id", async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room)
    return res.status(404).send("The room with the given ID was not found.");

  res.send(room);
});

module.exports = router;
