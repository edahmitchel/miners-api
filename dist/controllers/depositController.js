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
exports.approveDeposit = exports.getAllDeposits = exports.getUserDeposits = exports.deposit = void 0;
const deposit_1 = __importDefault(require("../models/deposit"));
const investment_1 = __importDefault(require("../models/investment"));
const user_1 = require("../models/user");
// TODO: Implement deposit handling logic
const deposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract deposit details from the request body
        const { userId, investmentId, amount } = req.body;
        // Find the investment plan in the database by ID
        const investmentPlan = yield investment_1.default.findById(investmentId);
        if (!investmentPlan) {
            return res.status(404).json({ error: 'Investment plan not found' });
        }
        // Check if the deposit amount meets the minimum requirement of the investment plan
        if (amount < investmentPlan.minAmount) {
            return res.status(400).json({ error: 'Deposit amount is below the minimum requirement' });
        }
        // TODO: Perform additional validation and business logic for deposit handling
        // Create a new deposit in the database
        const newDeposit = new deposit_1.default({
            userId,
            investmentId,
            amount,
            status: 'pending',
            timestamp: new Date(),
        });
        yield newDeposit.save();
        // Return success response
        res.status(200).json({ message: 'Deposit request submitted successfully' });
    }
    catch (error) {
        // Handle any errors that occur during deposit handling
        console.error('Error handling deposit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deposit = deposit;
// TODO: Implement fetching user deposits logic
const getUserDeposits = (req, res) => {
    // TODO: Implement fetching user deposits
};
exports.getUserDeposits = getUserDeposits;
// TODO: Implement fetching all deposits logic
const getAllDeposits = (req, res) => {
    // TODO: Implement fetching all deposits
};
exports.getAllDeposits = getAllDeposits;
// / TODO: Implement approving a deposit logic
const approveDeposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract deposit ID from request parameters
        const { depositId } = req.params;
        // Find the deposit in the database by ID
        const deposit = yield deposit_1.default.findById(depositId);
        if (!deposit) {
            return res.status(404).json({ error: 'Deposit not found' });
        }
        // Check if the deposit has already been approved
        if (deposit.status === 'approved') {
            return res.status(400).json({ error: 'Deposit has already been approved' });
        }
        // Update the deposit status to 'approved'
        deposit.status = 'approved';
        yield deposit.save();
        // Find the user in the database by ID
        const user = yield user_1.UserModel.findById(deposit.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Create a new investment for the user
        const newInvestment = new investment_1.default({
            userId: user._id,
            investmentPlanId: deposit.investmentId,
            amount: deposit.amount,
            date: new Date(),
        });
        // Add the new investment to the user's investments array
        user.investments.push({
            investmentPlanId: newInvestment._id, amount: deposit.amount,
            date: new Date(),
        });
        yield user.save();
        // Return success response
        res.status(200).json({ message: 'Deposit approved successfully' });
    }
    catch (error) {
        // Handle any errors that occur during deposit approval
        console.error('Error approving deposit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.approveDeposit = approveDeposit;
