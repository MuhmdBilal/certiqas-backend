const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    imageCid: String,
    imageUrl: String,

    fileCid: String,
    fileUrl: String,
    propertyTitle: { type: String, required: true },
    propertyType: { type: String, required: true },
    ownershipType: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },

    city: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    areaSize: { type: Number, required: true },

    visibility: {
      type: String,
      enum: ["show", "hide"],
    },
    brokerAsigned: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
