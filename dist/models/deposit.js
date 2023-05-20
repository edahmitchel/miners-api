"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const depositSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    investmentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'InvestmentPlan', required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    txHash: { type: String, required: true },
    upload: { type: String },
});
const Deposit = (0, mongoose_1.model)('Deposit', depositSchema);
exports.default = Deposit;
