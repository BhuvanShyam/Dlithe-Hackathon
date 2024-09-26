

import express from 'express';
import { getBuyerDashboard, requestContract } from '../controllers/buyerDashboardController.js';

const router = express.Router();


router.get('/', getBuyerDashboard);             
router.post('/contracts', requestContract);     

export default router;
