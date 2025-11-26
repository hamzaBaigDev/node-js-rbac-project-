const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
  screenName: { type: String, required: true },

  permissions: [
    {
      type: String,
      enum: ["read", "edit", "delete"]
    }
  ]
});

module.exports = mongoose.model("Screen", screenSchema);
