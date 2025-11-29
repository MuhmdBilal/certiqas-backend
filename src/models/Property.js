import mongoose from "mongoose";

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

    Description: {
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
  },
  { timestamps: true }
);

export default mongoose.model("Property", PropertySchema);
