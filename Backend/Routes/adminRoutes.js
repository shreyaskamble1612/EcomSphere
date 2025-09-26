import express from "express";
import { body } from "express-validator";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById
} from "../controllers/ProductController.js";
import { requireAuth, requireAdmin } from "../middleware/Auth.js";

const router = express.Router();

// Get all products (admin view with all details)
router.get("/products", requireAuth, getProducts);

// Get single product
router.get("/products/:id", requireAuth, getProductById);

// Create new product (Admin only)
router.post(
    "/products",
    requireAdmin,
    [
        body("name").notEmpty().withMessage("Product name is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("price").isNumeric().withMessage("Price must be a number"),
        body("category").notEmpty().withMessage("Category is required"),
        body("stock").isNumeric().withMessage("Stock must be a number"),
        body("images").isArray({ min: 1 }).withMessage("At least one image is required")
    ],
    createProduct
);

// Update product (Admin only)
router.put("/products/:id", requireAdmin, updateProduct);

// Delete product (Admin only)
router.delete("/products/:id", requireAdmin, deleteProduct);

export default router;