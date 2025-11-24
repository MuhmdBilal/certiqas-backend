const { default: ipfs } = require("../helpers/ipfs");
const uploadToIPFS = require("../helpers/ipfsUpload");
require("dotenv").config();

const { NFTStorage, File } = require('nft.storage');
const multer = require("multer");
const fs = require('fs');
console.log("process.env.NFT_STORAGE_KEY", process.env.NFT_STORAGE_KEY);

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });
const createProperty = async (req, res) => {
 try {
    const { originalname, mimetype, buffer } = req.file;

    const file = new File([buffer], originalname, {
      type: mimetype,
    });

    const cid = await client.storeBlob(file);

    res.json({
      success: true,
      cid,
      url: `https://ipfs.io/ipfs/${cid}`,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProperty,
};
