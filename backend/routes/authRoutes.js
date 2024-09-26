import express from 'express';
import { register, login, getProfile, logout, updateProfile } from '../controllers/authController.js';
import isAuthenticated from '../middleware/isAuthenticated.js'; // Default import here

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', isAuthenticated, getProfile);
router.post('/logout', logout);
router.put('/profile', isAuthenticated, updateProfile);

export default router;
