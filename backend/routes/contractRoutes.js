// contractRoutes.js

import express from 'express';
import {
  createContract,
  getContracts,
  getContractById,
  updateContract,
  deleteContract,
} from '../controllers/contractController.js';

const router = express.Router();


router.post('/', createContract);                // Create a new contract
router.get('/', getContracts);                    // Get all contracts for the logged-in user
router.get('/:contractId', getContractById);     // Get a specific contract by ID
router.put('/:contractId', updateContract);       // Update a contract by ID
router.delete('/:contractId', deleteContract);    // Delete a contract by ID

export default router;
