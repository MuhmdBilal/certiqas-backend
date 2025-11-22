const uploadToIPFS = require("../helpers/ipfsUpload");

const createProperty =async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    const result = await uploadToIPFS(fileBuffer, fileName);

    res.json({
      success: true,
    //   result: result
      cid: result.cid,
      url: result.url,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createProperty,
};