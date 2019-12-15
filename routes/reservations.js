const { Reservation, validate } = require("../models/reservation")
const { Room } = require("../models/room")
const { Guest } = require("../models/guest")
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", async (req, res) => {
    const reservations = await Reservation.find().sort("-checkOut");
    res.send(reservations);
  });

  router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const guest = await Guest.findById(req.body.guestId);
    if (!guest) return res.status(400).send("Invalid guest.");
  
    const room = await Room.findById(req.body.roomId);
    if (!room) return res.status(400).send("Invalid room.");
  
    if (room.numberRoom === 0)
      return res.status(400).send("Room not in stock.");
  
    let reservation = new Reservation({
      guest: {
        _id: guest._id,
        firstName: guest.firstName,
        lastName: guest.lastName,
        gender: guest.gender,
        birthDate: guest. birthDate,
        phone: guest.phone,
        isGold: guest.isGold
      },
      room: {
        _id: room._id,
        dailyBookingRate: room.dailyBookingRate
      }
    });
  
    try {
      new Fawn.Task()
        .save("reservations", reservation)
        .update(
          "rooms",
          { _id: room._id },
          {
            $inc: { numberRoom: -1 }
          }
        )
        .run();
  
      res.send(reservation);
    } catch (ex) {
      res.status(500).send("Something failed.");
    }
  });
  
  router.get("/:id", async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);
  
    if (!reservation)
      return res.status(404).send("The reservation with the given ID was not found.");
  
    res.send(reservation);
  });
  
  module.exports = router;