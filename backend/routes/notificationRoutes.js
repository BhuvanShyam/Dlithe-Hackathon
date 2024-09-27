// notificationRoutes.js

import express from 'express';
import { getNotifications, markNotificationAsRead } from '../controllers/notificationController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

// Notification routes
router.get('/', isAuthenticated, getNotifications);                    
router.patch('/:notificationId/read',isAuthenticated, markNotificationAsRead); 

export default router;
