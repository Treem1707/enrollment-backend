const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    surname: {
      type: String,
      default: "",
    },
    national_id: {
      type: String,
      default: "",
    },
    nationality: {
      type: String,
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    docs: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
