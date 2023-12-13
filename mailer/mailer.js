const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// regular express to verify email format
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

router.post("/send-mail", async (req, res, next) => {
  try {
    const { to, text, from, name } = req.body;

    if (!from) {
      return res.status(401).send({ message: "Please enter an email" });
    }

    if (!name) {
      return res.status(401).send({ message: "Please enter a name" });
    }

    if (!text) {
      return res.status(401).send({ message: "Please enter a valid message" });
    }

    if (!emailRegexp.test(from)) {
      return res.status(401).send({ message: "Please enter a valid email" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tanakarnld@gmail.com",
        pass: "sppg araf lsjc mvjc",
      },
    });

    const mailOptions = {
      from: "tanakarnld@gmail.com",
      to: "tanakarnld@gmail.com",
      subject: from + " with name " + name,
      text: from + " with name " + name + " said " + text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send("Email sent: " + info.response);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
