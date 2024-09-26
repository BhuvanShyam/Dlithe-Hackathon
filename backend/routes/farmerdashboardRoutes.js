// farmerDashboardRoutes.js

import express from 'express';
import { getFarmerDashboard, postCrop } from '../controllers/farmerDashboardController.js';

const router = express.Router();

// Farmer dashboard routes
router.get('/', getFarmerDashboard); // Get the farmer's dashboard
router.post('/crops', postCrop);      // Post a new crop

export default router;
