"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const withdrawalSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    destinationAddress: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});
const Withdrawal = (0, mongoose_1.model)('Withdrawal', withdrawalSchema);
exports.default = Withdrawal;
