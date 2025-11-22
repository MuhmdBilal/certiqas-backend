const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const { createProperty } = require("../controllers/propertyController");
const { checkRole } = require("../middlewares/roleMiddleware");

const router = express.Router();

// POST /upload
router.post(
  "/create-property",
  verifyToken,
  checkRole(["SuperAdmin"]),
  upload.single("file"),
  createProperty
);

module.exports = router;
