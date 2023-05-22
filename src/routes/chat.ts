import express from 'express';
import { allChats, allUserChats, createOrAddChat, sendMessageAsAdmin } from '../controllers/chatController';
const router = express.Router()
// Create a new chat or add a message to an existing chat
router.post('/', createOrAddChat)
// get all chats
router.get("/", allChats)
// Get all chats for a user
router.get('/:userId', allUserChats)

// Add a message to an existing chat as an admin
router.post('/:chatId/admin-message', sendMessageAsAdmin)

export default router