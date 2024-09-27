

import express from 'express';
import { createMessage, getMessages } from '../controllers/chatMessageController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();


router.post('/',isAuthenticated,createMessage);               
router.get('/:receiverId', isAuthenticated,getMessages);        

export default router;
