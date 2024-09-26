// cropRoutes.js

import express from "express";
import {
  createCrop,
  updateCrop,
  deleteCrop,
  getCrops,
  getCropById,
} from "../controllers/cropController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Crop routes
router.post("/", isAuthenticated, createCrop); // Create a new crop
router.put("/:id", isAuthenticated, updateCrop); // Update a crop
router.delete("/:id", isAuthenticated, deleteCrop); // Delete a crop
router.get("/", isAuthenticated, getCrops); // Get all crops
router.get("/:id", isAuthenticated, getCropById); // Get a crop by ID

export default router;
