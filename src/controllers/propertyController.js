const uploadToIPFS = require("../helpers/ipfsUpload");
const ethers = require("ethers");
const uploadMetadataToIPFS = require("../helpers/uploadMetadata");
const { mintCertificate } = require("../helpers/blockchain");
const Properties = require("../models/Property");

const createProperty = async (req, res) => {
  try {
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
    const {
      reraPermit,
      propertyId,
      developerName,
      projectName,
      location,
      unitType,
      brokerCompany,
      description,
    } = req.body;
    const verificationDate = Math.floor(Date.now() / 1000) - 40;
    const verificationHash = ethers.keccak256(
      ethers.solidityPacked(
        [
          "string",
          "string",
          "string",
          "string",
          "string",
          "string",
          "string",
          "uint256",
        ],
        [
          reraPermit,
          propertyId,
          developerName,
          projectName,
          location,
          unitType,
          brokerCompany,
          verificationDate,
        ]
      )
    );

    const metadataTemplate = {
      name: "Certiqas",
      description: description,
      image: `ipfs://${uploadedImage.cid}`,
      file: `ipfs://${uploadedFile.cid}`,
      external_url: "",
      attributes: [
        {
          trait_type: "Property ID",
          value: propertyId,
        },
        {
          trait_type: "Developer Name",
          value: developerName,
        },
        {
          trait_type: "Project Name",
          value: projectName,
        },
        {
          trait_type: "Location",
          value: location,
        },
        {
          trait_type: "Broker Company",
          value: brokerCompany,
        },
        {
          trait_type: "Verification Date",
          display_type: "date",
          value: verificationDate,
        },
        {
          trait_type: "Verification Hash",
          value: verificationHash,
        },

        {
          trait_type: "RERA Permit",
          value: reraPermit,
        },
        {
          trait_type: "Description",
          value: description,
        },
        {
          trait_type: "Unit Type",
          value: unitType,
        },
      ],
      schema_version: "1.0.0",
    };
    const metadataUploadURL = await uploadMetadataToIPFS(metadataTemplate);
    const listingId = Math.random().toString(36).substring(2, 6).toUpperCase();
    const mintPayload = {
      reraPermit,
      propertyId,
      developerName,
      projectName,
      location,
      unitType,
      brokerCompany,
      listingId,
      verificationDate,
      verificationHash,
      tokenUri: metadataUploadURL,
      expiresAt: 0,
    };
    const receipt = await mintCertificate(mintPayload);
    // Save property in DB
    const property = await Properties.create({
      imageCid: uploadedImage.cid,
      imageUrl: uploadedImage.url,
      fileCid: uploadedFile.cid,
      fileUrl: uploadedFile.url,
      reraPermit,
      propertyId,
      developerName,
      projectName,
      location,
      unitType,
      brokerCompany,
      description,
      verificationDate,
      verificationHash,
      tokenUri: metadataUploadURL,
      expiresAt: 0,
      mintTransactionHash: receipt.hash,
    });

    res.json({
      success: true,
      message: "Property created and minted successfully!",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllProperties = async (req, res) => {
  try {
    const properties = await Properties.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Properties.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { createProperty,getAllProperties, getPropertyById };
