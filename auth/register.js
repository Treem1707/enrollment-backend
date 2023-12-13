const express = require("express");
const User = require("../models/User");
const router = express.Router();

// create account
// post request
router.post("/register", async (req, res, next) => {
  const {
    surname,
    name,
    national_id,
    nationality,
    gender,
    password,
    confirm_password,
    what_you_applying_for,
    file,
  } = req.body;
  if (password !== confirm_password) {
    return res.status(401).send({ message: "Passwords do not match" });
  }
  const newUser = new User({
    surname,
    name,
    national_id,
    nationality,
    gender,
    password,
    what_you_applying_for,
  });

  const savedUser = await newUser.save();

  return res.status(200).send({ message: "Applicaction sent!" });
  try {
    console.log("rregister new user");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
