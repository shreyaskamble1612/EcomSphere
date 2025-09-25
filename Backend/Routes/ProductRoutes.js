import express from "express";
import { body } from "express-validator";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    addProductReview
} from "../controllers/ProductController.js";
// You'll need to create this middleware
// import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected routes (uncomment when you have auth middleware)
// router.post(
//     "/",
//     authenticateToken,
//     [
//         body("name").notEmpty().withMessage("Product name is required"),
//         body("description").notEmpty().withMessage("Description is required"),
//         body("price").isNumeric().withMessage("Price must be a number"),
//         body("category").notEmpty().withMessage("Category is required"),
//         body("stock").isNumeric().withMessage("Stock must be a number"),
//         body("images").isArray({ min: 1 }).withMessage("At least one image is required")
//     ],
//     createProduct
// );

// router.put("/:id", authenticateToken, updateProduct);
// router.delete("/:id", authenticateToken, deleteProduct);
// router.post("/:id/reviews", authenticateToken, [
//     body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
//     body("comment").notEmpty().withMessage("Comment is required")
// ], addProductReview);

export default router;