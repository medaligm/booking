const Joi = require("joi");
const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

const Hotel = mongoose.model("Hotel", hotelSchema);

function validateHotel(hotel) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    stars: Joi.number()
      .min(1)
      .max(5)
      .required()
  };
  return Joi.validate(hotel, schema);
}

exports.hotelSchema = hotelSchema;
exports.Hotel = Hotel;
exports.validate = validateHotel;
