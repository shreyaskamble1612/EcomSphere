import express from "express";
import {registerUser, LoginUser, getMe, updateProfile, updateNotificationSettings, updatePrivacySettings, changePassword} from "../controllers/UserController.js";
import {body} from "express-validator";
import {requireAuth} from "../middleware/Auth.js";
const router = express.Router();

router.post(
  "/register",
  [
    body("name").isString().isLength({ min: 2, max: 100 }).withMessage("Name must be required"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
  ],
  LoginUser
);

// Get current user profile
router.get("/me", requireAuth, getMe);

// Update user profile
router.put(
  "/profile",
  [
    body("name").optional().isString().isLength({ min: 2, max: 100 }).withMessage("Name must be between 2-100 characters"),
    body("email").optional().isEmail().withMessage("Email must be valid")
  ],
  requireAuth,
  updateProfile
);

// Update notification settings
router.put("/notifications", requireAuth, updateNotificationSettings);

// Update privacy settings
router.put("/privacy", requireAuth, updatePrivacySettings);

// Change password
router.put(
  "/change-password",
  [
    body("currentPassword").notEmpty().withMessage("Current password is required"),
    body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters long")
  ],
  requireAuth,
  changePassword
);


export default router;