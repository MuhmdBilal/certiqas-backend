const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const { createProperty } = require("../controllers/propertyController");
const { checkRole } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/create-property",
  verifyToken,
  checkRole(["SuperAdmin"]),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createProperty
);

module.exports = router;
