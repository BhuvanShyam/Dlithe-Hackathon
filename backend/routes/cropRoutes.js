// cropRoutes.js

import express from "express";
import {
  createCrop,
  updateCrop,
  deleteCrop,
  getCrops,
  getCropById,
} from "../controllers/cropController.js";

const router = express.Router();

// Crop routes
router.post("/", createCrop); // Create a new crop
router.put("/:id", updateCrop); // Update a crop
router.delete("/:id", deleteCrop); // Delete a crop
router.get("/", getCrops); // Get all crops
router.get("/:id", getCropById); // Get a crop by ID

export default router;
