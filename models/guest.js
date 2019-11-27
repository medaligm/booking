const Joi = require("joi");
const mongoose = require("mongoose");

const Guest = mongoose.model(
  "Guest",
  new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 5, maxlength: 50 },
    lastName: { type: String, required: true, minlength: 5, maxlength: 50 },
    gender: { type: String, enum: ["male", "female"], required: true },
    birthDate: { type: Date, required: true },
    phone: { type: String, required: true, minlength: 5, maxlength: 50 },
    isGold: { type: Boolean, default: false }
  })
);

function validateGuest(guest) {
  const schema = {
    firstName: Joi.string()
      .min(5)
      .max(50)
      .required(),
    lastName: Joi.string()
      .min(5)
      .max(50)
      .required(),
    gender: Joi.string()
      .valid("male", "female")
      .required(),
    birthDate: Joi.date().required(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(guest, schema);
}
exports.Guest = Guest;
exports.validate = validateGuest;
