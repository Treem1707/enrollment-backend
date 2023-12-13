const express = require("express");
const User = require("../models/User");
const router = express.Router();

// create account
// post request
router.post("/register", async (req, res, next) => {
  try {
    const {
      surname,
      name,
      national_id,
      nationality,
      gender,
      password,
      confirm_password,
      email,
      file,
    } = req.body;

    if (!surname) {
      res.status(400).send({ message: "Please enter surname " });
    }
    if (!name) {
      res.status(400).send({ message: "Please enter name " });
    }
    if (!national_id) {
      res.status(400).send({ message: "Please enter national id " });
    }
    if (!nationality) {
      res.status(400).send({ message: "Please enter nationality " });
    }
    if(!email){
      return res.status(400).send({message: 'Please provide an email'})
    }

    if (password !== confirm_password) {
      return res.status(401).send({ message: "Passwords do not match" });
    }
    if (password <= 6) {
      return res
        .status(401)
        .send({ message: "Passwords must be greater than 6 characters" });
    }

    const newUser = new User({
      surname,
      name,
      national_id,
      nationality,
      gender,
      password,
      email,
    });

    await newUser.save();

    return res.status(200).send({ message: "Applicaction sent!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
