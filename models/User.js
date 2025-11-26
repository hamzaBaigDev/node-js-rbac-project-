// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null
  },

  screens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
