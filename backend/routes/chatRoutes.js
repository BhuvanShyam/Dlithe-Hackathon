

import express from 'express';
import { createMessage, getMessages } from '../controllers/chatMessageController.js';

const router = express.Router();


router.post('/', createMessage);               
router.get('/:receiverId', getMessages);        

export default router;
