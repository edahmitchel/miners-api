"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageAsAdmin = exports.allChats = exports.allUserChats = exports.createOrAddChat = void 0;
const admin_1 = __importDefault(require("../models/admin"));
const chat_1 = __importDefault(require("../models/chat"));
// Create a new chat or add a message to an existing chat
const createOrAddChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, content } = req.body;
    const adminUsername = 'admin'; // Replace 'admin' with the actual admin username
    try {
        // Find the admin by username
        const admin = yield admin_1.default.findOne({ username: adminUsername });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        // Check if a chat already exists for the user and admin
        let chat = yield chat_1.default.findOne({ user, admin: admin._id });
        if (!chat) {
            // Create a new chat if it doesn't exist
            chat = yield chat_1.default.create({ user, admin: admin._id, messages: [] });
        }
        // Add the new message to the chat
        const message = {
            sender: user,
            content,
            createdAt: new Date(),
        };
        chat.messages.push(message);
        yield chat.save();
        res.status(201).json(chat);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create or add message to chat' });
    }
});
exports.createOrAddChat = createOrAddChat;
// Get all chats for a user
const allUserChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const chats = yield chat_1.default.find({ user: userId });
        res.json(chats);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user chats' });
    }
});
exports.allUserChats = allUserChats;
const allChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield chat_1.default.find();
        res.status(200).json(chats);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user chats' });
    }
});
exports.allChats = allChats;
const sendMessageAsAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const { content } = req.body;
    const admin = 'admin'; // Replace 'admin' with the actual username of the admin
    try {
        // Find the chat by ID
        const chat = yield chat_1.default.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        // Check if the current user is the admin of the chat
        if (chat.admin !== admin) {
            return res.status(403).json({ error: 'You are not authorized to perform this action' });
        }
        // Add the new message as an admin
        const message = {
            sender: admin,
            content,
            createdAt: new Date(),
        };
        chat.messages.push(message);
        yield chat.save();
        res.status(201).json(chat);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add admin message to chat' });
    }
});
exports.sendMessageAsAdmin = sendMessageAsAdmin;
