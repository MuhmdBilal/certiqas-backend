const multer = require("multer");

const storage = multer.memoryStorage(); // store file in buffer

module.exports = multer({ storage });