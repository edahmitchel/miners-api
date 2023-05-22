"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
const router = express_1.default.Router();
// Create a new chat or add a message to an existing chat
router.post('/', chatController_1.createOrAddChat);
// get all chats
router.get("/", chatController_1.allChats);
// Get all chats for a user
router.get('/:userId', chatController_1.allUserChats);
// Add a message to an existing chat as an admin
router.post('/:chatId/admin-message', chatController_1.sendMessageAsAdmin);
exports.default = router;
