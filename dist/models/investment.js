"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const investmentPlanSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    minAmount: { type: Number, required: true },
    returnPercentage: { type: Number, required: true },
});
const InvestmentPlan = (0, mongoose_1.model)('InvestmentPlan', investmentPlanSchema);
exports.default = InvestmentPlan;
