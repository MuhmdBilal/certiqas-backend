const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const {
  createProperty,
  getAllProperties,
  getPropertyById,
} = require("../controllers/propertyController");
const { checkRole } = require("../middlewares/roleMiddleware");

const router = express.Router();
const allowedRoles = ["SuperAdmin", "Admin"];
router.post(
  "/create-property",
  verifyToken,
  checkRole(allowedRoles),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createProperty
);

router.get("/all-property", verifyToken, checkRole(allowedRoles), getAllProperties);
router.get("/property/:id", verifyToken, checkRole(allowedRoles), getPropertyById);
module.exports = router;
