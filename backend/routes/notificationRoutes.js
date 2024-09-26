// notificationRoutes.js

import express from 'express';
import { getNotifications, markNotificationAsRead } from '../controllers/notificationController.js';

const router = express.Router();

// Notification routes
router.get('/', getNotifications);                    
router.patch('/:notificationId/read', markNotificationAsRead); 

export default router;
