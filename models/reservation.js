const Joi = require("joi");
const mongoose = require("mongoose");

const Reservation = mongoose.model(
  "Reservation",
  new mongoose.Schema({
    guest: {
      type: new mongoose.Schema({
        firstName: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        },
        lastName: { type: String, required: true, minlength: 5, maxlength: 50 },
        gender: { type: String, enum: ["male", "female"], required: true },
        birthDate: { type: Date, required: true },
        phone: { type: String, required: true, minlength: 5, maxlength: 50 },
        isGold: { type: Boolean, default: false }
      }),
      required: true
    },
    room: {
      type: new mongoose.Schema({
        dailyBookingRate: {
          type: Number,
          required: true,
          min: 0,
          max: 3000
        }
      }),
      required: true
    },
    checkOut: {
      type: Date,
      required: true,
      default: Date.now
    },
    checkIn: {
      type: Date
    },
    Price: {
      type: Number,
      min: 0
    }
  })
);

function validateReservation(reservation) {
  const Schema = {
    guestId: Joi.objectId().required(),
    roomId: Joi.objectId().required()
  };
  return Joi.validate(reservation, Schema);
}

exports.Reservation = Reservation;
exports.validate = validateReservation; 
