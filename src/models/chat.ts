import mongoose, { Schema, Document } from 'mongoose';
import { IChat, IMessage } from '../types';


const messageSchema: Schema = new Schema({
    sender: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const chatSchema: Schema = new Schema({
    user: { type: String, required: true },
    admin: { type: String, required: true },
    messages: [messageSchema],
    latestMessage: {
        message: messageSchema

    }
});

const ChatModel = mongoose.model<IChat>('Chat', chatSchema);
export const Message = mongoose.model<IMessage>('Message', messageSchema);
export default ChatModel;
