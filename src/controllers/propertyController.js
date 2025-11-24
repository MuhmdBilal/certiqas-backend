const Property = require("../models/Property");
const uploadToIPFS = require("../helpers/ipfsUpload");

const createProperty = async (req, res) => {
  try {
    // Check both fields
    const imageFile = req.files?.image?.[0];
    const otherFile = req.files?.file?.[0];

    if (!imageFile || !otherFile) {
      return res.status(400).json({
        message: "Image and File both are required",
      });
    }

    // Upload Image to IPFS
    const uploadedImage = await uploadToIPFS(
      imageFile.buffer,
      imageFile.originalname
    );

    // Upload Document/File to IPFS
    const uploadedFile = await uploadToIPFS(
      otherFile.buffer,
      otherFile.originalname
    );

    // Get all fields
    const {
      propertyTitle,
      propertyType,
      ownershipType,
      price,
      description,
      city,
      country,
      address,
      areaSize,
      visibility,
    } = req.body;

    // Save property in DB
    const property = await Property.create({
      imageCid: uploadedImage.cid,
      imageUrl: uploadedImage.url,

      fileCid: uploadedFile.cid,
      fileUrl: uploadedFile.url,
      propertyTitle,
      propertyType,
      ownershipType,
      price,
      description,
      city,
      country,
      address,
      areaSize,
      visibility,
      createdBy: req.user.id,
    });

    res.json({
      success: true,
      message: "Property created successfully!",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createProperty };
