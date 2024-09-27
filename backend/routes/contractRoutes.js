// contractRoutes.js

import express from 'express';
import {
  createContract,
  getContracts,
  getContractById,
  updateContract,
  deleteContract,
} from '../controllers/contractController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();


router.post('/',isAuthenticated, createContract);                // Create a new contract
router.get('/', isAuthenticated,getContracts);                    // Get all contracts for the logged-in user
router.get('/:contractId',isAuthenticated, getContractById);     // Get a specific contract by ID
router.put('/:contractId',isAuthenticated, updateContract);       // Update a contract by ID
router.delete('/:contractId',isAuthenticated, deleteContract);    // Delete a contract by ID

export default router;
