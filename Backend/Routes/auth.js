import express from "express";
import {registerUser,LoginUser} from "../controllers/UserController.js";
import {body} from "express-validator";
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


export default router;