// requestRoutes.js

import express from 'express';
import { createRequest, updateRequestStatus, getFarmerRequests, getBuyerRequests } from '../controllers/requestController.js';

const router = express.Router();

// Request routes
router.post('/', createRequest);                          // Create a new contract request
router.put('/:requestId/status', updateRequestStatus);   // Update the status of a request (accept/reject)
router.get('/farmer', getFarmerRequests);                // Get all requests for the authenticated farmer
router.get('/buyer', getBuyerRequests);                  // Get all requests from the authenticated buyer

export default router;
