const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer')

router.post("/send-mail", async (req, res, next) => {
  try {
    const { to, text, from, name } = req.body;

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
