const { default: ipfs } = require("../helpers/ipfs");
const uploadToIPFS = require("../helpers/ipfsUpload");

const createProperty = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const added = await ipfs.add(req.file.buffer);
   console.log("added", added);
   
    const url = `https://ipfs.io/ipfs/${added.path}`;

    return res.json({
      success: true,
      hash: added.path,
      url,
    });

    // const fileBuffer = req.file.buffer;
    // const fileName = req.file.originalname;

    // const result = await uploadToIPFS(fileBuffer, fileName);

    // res.json({
    //   success: true,
    // //   result: result
    //   cid: result.cid,
    //   url: result.url,
    // });
  } catch (err) {
    console.log("err", err);
    
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createProperty,
};
