const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    reraPermit: {
      type: String,
      required: true,
    },

    propertyId: {
      type: String,
      required: true,
    },

    developerName: {
      type: String,
      required: true,
    },

    projectName: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    unitType: {
      type: String,
      required: true,
    },

    brokerCompany: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // File Uploads
    imageCid: String,
    imageUrl: String,

    fileCid: String,
    fileUrl: String,

    verificationDate: String,
    verificationHash: String,
    tokenUri: String,
    expiresAt: String,
    mintTransactionHash : String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Properties", PropertySchema);
