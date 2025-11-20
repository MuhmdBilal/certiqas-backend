const express = require("express");

const {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  loginUser,
} = require("../controllers/adminController");

const { verifyToken } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/roleMiddleware");

const {
  createAdminValidation,
  updateAdminValidation,
  deleteAdminValidation,
} = require("../validations/adminValidation");

const { handleValidation } = require("../middlewares/validationMiddleware");

const router = express.Router();

// Login
router.post("/login", loginUser);

// Create Admin
router.post(
  "/create",
  verifyToken,
  checkRole(["SuperAdmin"]),
  createAdminValidation,
  handleValidation,
  createAdmin
);

// Get All Admins
router.get("/", verifyToken, checkRole(["SuperAdmin"]), getAdmins);

// Update Admin
router.put(
  "/update/:id",
  verifyToken,
  checkRole(["SuperAdmin"]),
  updateAdminValidation,
  handleValidation,
  updateAdmin
);

// Delete Admin
router.delete(
  "/delete/:id",
  verifyToken,
  checkRole(["SuperAdmin"]),
  deleteAdminValidation,
  handleValidation,
  deleteAdmin
);

module.exports = router;
