import express from 'express';
import { register, login, getProfile, logout, updateProfile } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);
router.post('/logout', logout); 
router.put('/profile', authenticate, updateProfile);  

export default router;
