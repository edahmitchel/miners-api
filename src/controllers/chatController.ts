import { Request, Response } from "express";
import AdminModel from "../models/admin";
import ChatModel from "../models/chat";
import { IChat, IMessage } from "../types";

// Create a new chat or add a message to an existing chat
export const createOrAddChat = async (req: Request, res: Response) => {
    const { user, content } = req.body;
    const adminUsername = 'admin'; // Replace 'admin' with the actual admin username

    try {
        // Find the admin by username
        const admin = await AdminModel.findOne({ username: adminUsername });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Check if a chat already exists for the user and admin
        let chat: IChat | null = await ChatModel.findOne({ user, admin: admin._id });

        if (!chat) {
            // Create a new chat if it doesn't exist
            chat = await ChatModel.create({ user, admin: admin._id, messages: [] });
        }

        // Add the new message to the chat
        const message: IMessage = {
            sender: user,
            content,
            createdAt: new Date(),
        };

        chat.messages.push(message);
        await chat.save();

        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create or add message to chat' });
    }
}

// Get all chats for a user
export const allUserChats = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const chats = await ChatModel.find({ user: userId });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user chats' });
    }
}
export const allChats = async (req: Request, res: Response) => {


    try {
        const chats = await ChatModel.find();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user chats' });
    }
}

export const sendMessageAsAdmin = async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { content } = req.body;
    const admin = 'admin'; // Replace 'admin' with the actual username of the admin

    try {
        // Find the chat by ID
        const chat: IChat | null = await ChatModel.findById(chatId);

        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        // Check if the current user is the admin of the chat
        if (chat.admin !== admin) {
            return res.status(403).json({ error: 'You are not authorized to perform this action' });
        }

        // Add the new message as an admin
        const message: IMessage = {
            sender: admin,
            content,
            createdAt: new Date(),
        };

        chat.messages.push(message);
        await chat.save();

        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add admin message to chat' });
    }
}