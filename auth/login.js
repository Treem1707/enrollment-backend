const express = require("express");
const User = require("../models/User");
const router = express.Router();

//login user
// post requestt
router.post("/login", async (req, res, next) => {
  try {
    const { national_id, password } = req.body;

    const user = await User.findOne({ national_id: national_id });
    if (!user) {
      return res
        .status(404)
        .send({ message: "No such application found, Is your ID correct?" });
    }

    if (password !== user.password) {
      return res.status(403).send({ message: "Wrong ID or password" });
    }

    return res.status(200).send({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
