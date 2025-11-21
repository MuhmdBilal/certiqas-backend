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

router.post("/login", loginUser);

router.post(
  "/create",
  verifyToken,
  checkRole(["SuperAdmin"]),
  createAdminValidation,
  handleValidation,
  createAdmin
);
router.get("/", verifyToken, checkRole(["SuperAdmin"]), getAdmins);
router.put("/update/:id", verifyToken, checkRole(["SuperAdmin"]), updateAdmin);
router.delete(
  "/delete/:id",
  verifyToken,
  checkRole(["SuperAdmin"]),
  deleteAdminValidation,
  handleValidation,
  deleteAdmin
);

module.exports = router;
