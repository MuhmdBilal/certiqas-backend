const mongoose = require("mongoose");

const brokerSchema = new mongoose.Schema(
  {
    brokerName: {
      type: String,
      required: true,
      trim: true,
    },
    brokerEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Broker", brokerSchema);
