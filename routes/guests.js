const {Guest, validate} = require('../models/guest')
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async(req, res)=>{
    const guests = await Guest.find().sort('firstName')
    res.send(guests)
})

router.post("/", async (req, res) => {
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


module.exports = router;