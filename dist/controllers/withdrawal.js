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
exports.rejectWithdrawal = exports.approveWithdrawal = exports.getAllWithdrawals = exports.getUserWithdrawals = exports.requestWithdrawal = void 0;
const withdrawal_1 = __importDefault(require("../models/withdrawal"));
// TODO: Implement withdrawal request logic
const requestWithdrawal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract necessary information from the request body
        const { userId, amount, destinationAddress } = req.body;
        const newWithdrawal = new withdrawal_1.default({
            userId, amount, destinationAddress
        });
        yield newWithdrawal.save();
        // TODO: Perform validation and business logic for withdrawal request
        // TODO: Save the withdrawal request to the database
        // Return success response
        res.status(200).json({ message: 'Withdrawal request submitted successfully' });
    }
    catch (error) {
        // Handle any errors that occur during withdrawal request
        console.error('Error requesting withdrawal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.requestWithdrawal = requestWithdrawal;
// TODO: Implement fetching user withdrawals logic
const getUserWithdrawals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract user ID from request parameters
        const userId = req.params.userId;
        // Fetch user withdrawals from the database
        const withdrawals = yield withdrawal_1.default.find({ userId });
        // Return user withdrawals
        res.status(200).json({ userId, withdrawals });
    }
    catch (error) {
        // Handle any errors that occur during fetching user withdrawals
        console.error('Error fetching user withdrawals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getUserWithdrawals = getUserWithdrawals;
// TODO: Implement fetching all withdrawals logic
const getAllWithdrawals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Fetch all withdrawals from the database
        // Return all withdrawals
        const withdrawals = yield withdrawal_1.default.find();
        res.status(200).json({ withdrawals }); // Replace [] with actual withdrawals
    }
    catch (error) {
        // Handle any errors that occur during fetching all withdrawals
        console.error('Error fetching all withdrawals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllWithdrawals = getAllWithdrawals;
//  TODO: Implement approving a withdrawal logic
const approveWithdrawal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract withdrawal ID from request parameters
        const withdrawalId = req.params.withdrawalId;
        // Find the withdrawal in the database by ID
        const withdrawal = yield withdrawal_1.default.findById(withdrawalId);
        if (!withdrawal) {
            return res.status(404).json({ error: 'Withdrawal not found' });
        }
        // TODO: Perform validation and business logic for approving a withdrawal
        // Update the withdrawal status in the database to 'approved'
        withdrawal.status = 'approved';
        yield withdrawal.save();
        // Return success response
        res.status(200).json({ message: 'Withdrawal approved successfully' });
    }
    catch (error) {
        // Handle any errors that occur during approving a withdrawal
        console.error('Error approving withdrawal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.approveWithdrawal = approveWithdrawal;
// TODO: Implement rejecting a withdrawal logic
const rejectWithdrawal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract withdrawal ID from request parameters
        const withdrawalId = req.params.withdrawalId;
        // Find the withdrawal in the database by ID
        const withdrawal = yield withdrawal_1.default.findById(withdrawalId);
        if (!withdrawal) {
            return res.status(404).json({ error: 'Withdrawal not found' });
        }
        // TODO: Perform validation and business logic for rejecting a withdrawal
        // Update the withdrawal status in the database to 'rejected'
        withdrawal.status = 'rejected';
        yield withdrawal.save();
        // Return success response
        res.status(200).json({ message: 'Withdrawal rejected successfully' });
    }
    catch (error) {
        // Handle any errors that occur during rejecting a withdrawal
        console.error('Error rejecting withdrawal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.rejectWithdrawal = rejectWithdrawal;
