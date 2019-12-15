const Joi = require("joi");
const mongoose = require("mongoose");
const { hotelSchema } = require("./hotel");

const Room = mongoose.model(
  "Rooms",
  new mongoose.Schema({
    hotel: {
      type: hotelSchema,
      required: true
    },
    numberRoom: {
      type: Number,
      required: true,
      min: 0,
      max: 500
    },
    dailyBookingRate: {
      type: Number,
      required: true,
      min: 0,
      max: 3000
    }
  })
);

function validateRoom(room) {
  const schema = {
    hotelId: Joi.objectId().required(),
    numberRoom: Joi.number()
      .min(0)
      .max(500)
      .required(),
    dailyBookingRate: Joi.number
      .min(0)
      .max(3000)
      .required()
  };
  return Joi.validate(room, schema);
}

exports.Room = Room;
exports.validate = validateRoom;
